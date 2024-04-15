import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkHtml from "remark-html";

export async function getArticles() {
  const ArticlesDirectory = path.join(process.cwd(), "mdFile", "article");
  const fileNames = fs.readdirSync(ArticlesDirectory);

  const Articles = await Promise.all(
    fileNames.map(async (fileName) => {
      const filePath = path.join(ArticlesDirectory, `${fileName}`);
      const fileContents = await fs.promises.readFile(filePath, "utf8");
      const { data } = matter(fileContents);

      return {
        slug: fileName.replace(".md", ""),
        frontmatter: data,
      };
    })
  );

  return Articles;
}

export async function getArticle(params: string) {
  const slug = params;
  const filePath = path.join(process.cwd(), "mdFile", "article", `${slug}.md`);

  const fileContents = await fs.promises.readFile(filePath, "utf8");

  const { data, content } = matter(fileContents);
  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkHtml)
    .process(content);
  const contentHtml = processedContent.toString();

  return {
    frontmatter: data,
    contentHtml,
  };
}
