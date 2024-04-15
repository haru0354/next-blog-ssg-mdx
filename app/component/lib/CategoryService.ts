import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkHtml from "remark-html";

export async function getCategories() {
  const categoriesDirectory = path.join(
    process.cwd(),
    "mdFile",
    "category",
  );
  const fileNames = fs.readdirSync(categoriesDirectory);

  const categories = await Promise.all(
    fileNames.map(async (fileName) => {
      const filePath = path.join(categoriesDirectory, `${fileName}`);
      const fileContents = await fs.promises.readFile(filePath, "utf8");
      const { data } = matter(fileContents);

      return {
        slug: fileName.replace(".md", ""),
        frontmatter: data,
      };
    })
  );

  return categories;
}

export async function getCategory(params: string) {
  const slug = params;
  const filePath = path.join(
    process.cwd(),
    "mdFile",
    "category",
    `${slug}.md`
  );

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
