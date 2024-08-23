import path from "path";
import fs from "fs";
import matter from "gray-matter";

type Article = {
  slug: string;
  categorySlug: string;
  categoryName: string;
  frontmatter: Frontmatter;
};

type Category = {
  slug: string;
  categorySlug: string;
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
  const categoryFoldersInArticles = fs
    .readdirSync(articlesDirectory)
    .filter((name) => {
      return fs.statSync(path.join(articlesDirectory, name)).isDirectory();
    });

  const articles: Article[] = [];

  await Promise.all(
    categoryFoldersInArticles.map(async (categoryFoldersInArticle) => {
      const categoryPath = path.join(
        articlesDirectory,
        categoryFoldersInArticle
      );
      const fileNames = fs.readdirSync(categoryPath);

      const mdxFileNames = fileNames.filter((fileName) =>
        fileName.endsWith(".mdx")
      );

      const categoryFile = path.join(
        process.cwd(),
        "mdFile",
        "category",
        `${categoryFoldersInArticle}.mdx`
      );

      await Promise.all(
        mdxFileNames.map(async (mdxFileName) => {
          const filePath = path.join(categoryPath, mdxFileName);
          const fileContents = await fs.promises.readFile(filePath, "utf8");
          const { data } = matter(fileContents);

          const categoryContents = await fs.promises.readFile(
            categoryFile,
            "utf8"
          );
          const { data: categoryData } = matter(categoryContents);

          articles.push({
            slug: mdxFileName.replace(".mdx", ""),
            categorySlug: categoryFoldersInArticle,
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

  const categoriesDirectory = path.join(process.cwd(), "mdFile", "category");
  const categoryFolders = fs.readdirSync(categoriesDirectory).filter((name) => {
    return fs.statSync(path.join(categoriesDirectory, name)).isDirectory();
  });

  const categories: Category[] = [];

  await Promise.all(
    categoryFolders.map(async (categoryFolder) => {
      const categoryPath = path.join(categoriesDirectory, categoryFolder);
      const fileNames = fs.readdirSync(categoryPath);

      const mdxFileNames = fileNames.filter((fileName) =>
        fileName.endsWith(".mdx")
      );

      await Promise.all(
        mdxFileNames.map(async (mdxFileName) => {
          const filePath = path.join(categoryPath, mdxFileName);
          const fileContents = await fs.promises.readFile(filePath, "utf8");
          const { data } = matter(fileContents);

          categories.push({
            slug: mdxFileName.replace(".mdx", ""),
            categorySlug: categoryFolder,
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

  const secondLevelArticles = [...articles, ...categories];

  return secondLevelArticles;
}

export async function getSecondLevelArticle(
  firstLevelArticle_slug: string,
  secondLevelArticle_slug: string
) {
  const articleFilePath = path.join(
    process.cwd(),
    "mdFile",
    "article",
    firstLevelArticle_slug,
    `${secondLevelArticle_slug}.mdx`
  );

  const parentCategoryFilePath = path.join(
    process.cwd(),
    "mdFile",
    "category",
    `${firstLevelArticle_slug}.mdx`
  );

  const childCategoryFilePath = path.join(
    process.cwd(),
    "mdFile",
    "category",
    firstLevelArticle_slug,
    `${secondLevelArticle_slug}.mdx`
  );

  const parentCategoryContents = await fs.promises.readFile(
    parentCategoryFilePath,
    "utf8"
  );

  const { data: parentCategoryData } = matter(parentCategoryContents);

  let fileContents = null;

  if (fs.existsSync(articleFilePath)) {
    try {
      fileContents = fs.readFileSync(articleFilePath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        frontmatter: data,
        content,
        categoryName: parentCategoryData.categoryName,
      };
    } catch (error) {
      console.error(
        `記事の${secondLevelArticle_slug}.mdxを読み取れませんでした。`,
        error
      );
      return null;
    }
  } else if (fs.existsSync(childCategoryFilePath)) {
    try {
      fileContents = fs.readFileSync(childCategoryFilePath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        frontmatter: data,
        content,
        categoryName: parentCategoryData.categoryName,
      };
    } catch (error) {
      console.error(
        `カテゴリの${secondLevelArticle_slug}.mdxを読み取れませんでした。`,
        error
      );
      return null;
    }
  } else {
    console.log("記事もカテゴリも見つかりませんでした。");
    return null;
  }
}
