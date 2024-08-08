import path from "path";
import fs from "fs";
import matter from "gray-matter";

type Article = {
  slug: string;
  categorySlug: string;
  frontmatter: Frontmatter;
};

type Frontmatter = {
    title: string;
    date: string;
    description: string;
    categoryName: string;
    eyeCatchName: string;
    eyeCatchAlt: string;
};

export async function getArticles() {
  const articlesDirectory = path.join(process.cwd(), "mdFile", "article");
  const categories = fs.readdirSync(articlesDirectory);
  const articles: Article[] = [];

  await Promise.all(
    categories.map(async (category) => {
      const categoryPath = path.join(articlesDirectory, category);
      const fileNames = fs.readdirSync(categoryPath);

      await Promise.all(
        fileNames.map(async (fileName) => {
          const filePath = path.join(categoryPath, fileName);
          const fileContents = await fs.promises.readFile(filePath, "utf8");
          const { data } = matter(fileContents);

          articles.push({
            slug: fileName.replace(".mdx", ""),
            categorySlug:category,
            frontmatter: {
              title: data.title,
              date: data.date,
              description: data.description,
              categoryName: data.categoryName,
              eyeCatchName: data.eyeCatchName,
              eyeCatchAlt: data.eyeCatchAlt,
            },
          });
        })
      );
    })
  );

  return articles;
}

export async function getArticle(params: string) {
  const slug = params;
  const filePath = path.join(process.cwd(), "mdFile", "article", `${slug}.mdx`);

  const fileContents = await fs.promises.readFile(filePath, "utf8");

  const { data, content } = matter(fileContents);

  return {
    frontmatter: data,
    content,
  };
}
