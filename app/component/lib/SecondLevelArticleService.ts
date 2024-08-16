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

export async function getSecondLevelArticles() {
  const articlesDirectory = path.join(process.cwd(), "mdFile", "article");
  const categoryFolders = fs.readdirSync(articlesDirectory).filter((name) => {
    return fs.statSync(path.join(articlesDirectory, name)).isDirectory();
  });

  const articles: Article[] = [];

  await Promise.all(
    categoryFolders.map(async (categoryFolder) => {
      const categoryPath = path.join(articlesDirectory, categoryFolder);
      const fileNames = fs.readdirSync(categoryPath);

      const cate = path.join(
        process.cwd(),
        "mdFile",
        "category",
        `${categoryFolder}.mdx`
      );

      await Promise.all(
        fileNames.map(async (fileName) => {
          const filePath = path.join(categoryPath, fileName);
          const fileContents = await fs.promises.readFile(filePath, "utf8");
          const { data } = matter(fileContents);

          const categoryContents = await fs.promises.readFile(cate, "utf8");
          const { data: categoryData } = matter(categoryContents);

          articles.push({
            slug: fileName.replace(".mdx", ""),
            categorySlug: categoryFolder,
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

export async function getSecondLevelArticle(firstLevelArticle_slug: string, secondLevelArticle_slug: string) {
  const filePath = path.join(
    process.cwd(),
    "mdFile",
    "article",
    firstLevelArticle_slug,
    `${secondLevelArticle_slug}.mdx`
  );

  const fileContents = await fs.promises.readFile(filePath, "utf8");
  const { data, content } = matter(fileContents);

  const categoryPath = path.join(
    process.cwd(),
    "mdFile",
    "category",
    `${firstLevelArticle_slug}.mdx`
  );
  
  const categoryContents = await fs.promises.readFile(categoryPath, "utf8");
  const { data: categoryData } = matter(categoryContents);

  return {
    frontmatter: data,
    content,
    categoryName: categoryData.categoryName,
  };
}
