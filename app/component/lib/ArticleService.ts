import path from "path";
import fs from "fs";
import matter from "gray-matter";

type Article = {
  slug: string;
  categorySlug: string;
  categoryName: string;
  frontmatter: Frontmatter;
};

type Frontmatter = {
  title: string;
  date: string;
  description: string;
  eyeCatchName: string;
  eyeCatchAlt: string;
};

export async function getArticles() {
  const articlesDirectory = path.join(process.cwd(), "mdFile", "article");
  const categoryDirectory = path.join(process.cwd(), "mdFile", "category");
  const categories = fs.readdirSync(articlesDirectory);
  const articles: Article[] = [];

  await Promise.all(
    categories.map(async (category) => {
      const categoryPath = path.join(articlesDirectory, category);
      const fileNames = fs.readdirSync(categoryPath);

      const cate = path.join(
        process.cwd(),
        "mdFile",
        "category",
        `${category}.mdx`
      );

      await Promise.all(
        fileNames.map(async (fileName) => {
          const filePath = path.join(categoryPath, fileName);
          const fileContents = await fs.promises.readFile(filePath, "utf8");
          const { data } = matter(fileContents);

          const categoryContents = await fs.promises.readFile(cate, "utf8");
          const { data: categoryData } = matter(categoryContents);
          console.log(categoryData.categoryName);

          articles.push({
            slug: fileName.replace(".mdx", ""),
            categorySlug: category,
            categoryName: categoryData.categoryName,
            frontmatter: {
              title: data.title,
              date: data.date,
              description: data.description,
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

export async function getArticle(category_slug: string, article_slug: string) {
  const filePath = path.join(
    process.cwd(),
    "mdFile",
    "article",
    category_slug,
    `${article_slug}.mdx`
  );

  const fileContents = await fs.promises.readFile(filePath, "utf8");
  const { data, content } = matter(fileContents);

  const categoryPath = path.join(
    process.cwd(),
    "mdFile",
    "category",
    `${category_slug}.mdx`
  );
  const categoryContents = await fs.promises.readFile(categoryPath, "utf8");
  const { data: categoryData } = matter(categoryContents);

  return {
    frontmatter: data,
    content,
    categoryName: categoryData.categoryName,
  };
}
