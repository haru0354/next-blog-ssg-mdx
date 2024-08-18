import path from "path";
import fs from "fs";
import matter from "gray-matter";

type Article = {
  slug: string;
  parentCategorySlug: string;
  childCategorySlug: string;
  parentCategoryName: string;
  childCategoryName: string;
  frontmatter: Frontmatter;
};

type Frontmatter = {
  title: string;
  date: string;
  description: string;
  eyeCatchName: string;
  eyeCatchAlt: string;
};

export async function getThirdLevelArticles() {
  const articlesDirectory = path.join(process.cwd(), "mdFile", "article");
  const parentCategoryFolders = fs
    .readdirSync(articlesDirectory)
    .filter((name) => {
      return fs.statSync(path.join(articlesDirectory, name)).isDirectory();
    });

  const articles: Article[] = [];

  await Promise.all(
    parentCategoryFolders.map(async (parentCategoryFolder) => {
      const parentCategoryDirectory = path.join(
        process.cwd(),
        "mdFile",
        "article",
        parentCategoryFolder
      );

      const childCategoryFolders = fs
        .readdirSync(parentCategoryDirectory)
        .filter((name) => {
          return fs
            .statSync(path.join(parentCategoryDirectory, name))
            .isDirectory();
        });

      await Promise.all(
        childCategoryFolders.map(async (childCategoryFolder) => {
          const childCategoryPath = path.join(
            articlesDirectory,
            parentCategoryFolder,
            childCategoryFolder
          );
          const thirdLevelArticleFileNames = fs.readdirSync(childCategoryPath);

          const mdxFileNames = thirdLevelArticleFileNames.filter(
            (thirdLevelArticleFileName) =>
              thirdLevelArticleFileName.endsWith(".mdx")
          );
          const parentCategoryFile = path.join(
            process.cwd(),
            "mdFile",
            "category",
            `${parentCategoryFolder}.mdx`
          );

          const childCategoryFile = path.join(
            process.cwd(),
            "mdFile",
            "category",
            parentCategoryFolder,
            `${childCategoryFolder}.mdx`
          );

          await Promise.all(
            mdxFileNames.map(async (mdxFileName) => {
              const filePath = path.join(
                "mdFile",
                "article",
                parentCategoryFolder,
                childCategoryFolder,
                mdxFileName
              );

              const fileContents = await fs.promises.readFile(filePath, "utf8");
              const { data: articleData } = matter(fileContents);

              const parentCategoryContents = await fs.promises.readFile(
                parentCategoryFile,
                "utf8"
              );
              const { data: parentCategoryData } = matter(
                parentCategoryContents
              );

              const childCategoryContents = await fs.promises.readFile(
                childCategoryFile,
                "utf8"
              );
              const { data: childCategoryData } = matter(childCategoryContents);

              articles.push({
                slug: mdxFileName.replace(".mdx", ""),
                parentCategorySlug: parentCategoryFolder,
                childCategorySlug: childCategoryFolder,
                parentCategoryName: parentCategoryData.categoryName,
                childCategoryName: childCategoryData.categoryName,
                frontmatter: {
                  title: articleData.title,
                  date: articleData.date,
                  description: articleData.description,
                  eyeCatchName: articleData.eyeCatchName,
                  eyeCatchAlt: articleData.eyeCatchAlt,
                },
              });
            })
          );
        })
      );
    })
  );

  return articles;
}

export async function getThirdLevelArticle(
  firstLevelArticle_slug: string,
  secondLevelArticle_slug: string,
  thirdLevelArticle_slug: string
) {
  const filePath = path.join(
    process.cwd(),
    "mdFile",
    "article",
    firstLevelArticle_slug,
    secondLevelArticle_slug,
    `${thirdLevelArticle_slug}.mdx`
  );

  const fileContents = await fs.promises.readFile(filePath, "utf8");
  const { data, content } = matter(fileContents);

  const categoryPath = path.join(
    process.cwd(),
    "mdFile",
    "category",
    firstLevelArticle_slug,
    `${secondLevelArticle_slug}.mdx`
  );

  const categoryContents = await fs.promises.readFile(categoryPath, "utf8");
  const { data: categoryData } = matter(categoryContents);

  return {
    frontmatter: data,
    content,
    categoryName: categoryData.categoryName,
  };
}
