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

  let categoryFoldersInArticles: string[] = [];
  try {
    categoryFoldersInArticles = fs
      .readdirSync(articlesDirectory)
      .filter((name) => {
        return fs.statSync(path.join(articlesDirectory, name)).isDirectory();
      });
  } catch (err) {
    console.error(
      `カテゴリディレクトリ「${articlesDirectory}」の読み込みに失敗しました:`,
      err
    );
    return [];
  }

  const articles: Article[] = [];

  await Promise.all(
    categoryFoldersInArticles.map(async (categoryFoldersInArticle) => {
      const categoryPath = path.join(
        articlesDirectory,
        categoryFoldersInArticle
      );

      let fileNames: string[] = [];
      try {
        fileNames = fs.readdirSync(categoryPath);
      } catch (err) {
        console.error(
          `ディレクトリ「${categoryPath}」の読み込みに失敗しました:`,
          err
        );
        return [];
      }

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
          const articleFilePath = path.join(categoryPath, mdxFileName);

          let articleContents: string;
          try {
            articleContents = await fs.promises.readFile(
              articleFilePath,
              "utf8"
            );
          } catch (err) {
            console.error(
              `記事ファイル${articleFilePath}の読み込みに失敗しました:`,
              err
            );
            return;
          }

          const { data } = matter(articleContents);

          let categoryContents: string;
          try {
            categoryContents = await fs.promises.readFile(categoryFile, "utf8");
          } catch (err) {
            console.error(
              `カテゴリファイル「${categoryFile}」の読み込みに失敗しました:`,
              err
            );
            return;
          }

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

  let categoryFolders: string[] = [];
  try {
    categoryFolders = fs.readdirSync(categoriesDirectory).filter((name) => {
      return fs.statSync(path.join(categoriesDirectory, name)).isDirectory();
    });
  } catch (err) {
    console.error(
      `カテゴリディレクトリ「${categoriesDirectory}」の読み込みに失敗しました:`,
      err
    );
    return [];
  }

  const categories: Category[] = [];

  await Promise.all(
    categoryFolders.map(async (categoryFolder) => {
      const parentCategoryPath = path.join(categoriesDirectory, categoryFolder);

      let parentCategoryFileNames: string[] = [];
      try {
        parentCategoryFileNames = fs.readdirSync(parentCategoryPath);
      } catch (err) {
        console.error(
          `親カテゴリディレクトリ「${parentCategoryPath}」の読み込みに失敗しました:`,
          err
        );
        return [];
      }

      const mdxFileNames = parentCategoryFileNames.filter(
        (parentCategoryFileName) => parentCategoryFileName.endsWith(".mdx")
      );

      await Promise.all(
        mdxFileNames.map(async (mdxFileName) => {
          const childCategoryFilePath = path.join(
            parentCategoryPath,
            mdxFileName
          );

          let childCategoryFileContents: string;
          try {
            childCategoryFileContents = await fs.promises.readFile(
              childCategoryFilePath,
              "utf8"
            );
          } catch (err) {
            console.error(
              `子カテゴリファイル「${childCategoryFilePath}」の読み込みに失敗しました:`,
              err
            );
            return;
          }

          const { data } = matter(childCategoryFileContents);

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

  let parentCategoryContents: string;
  try {
    parentCategoryContents = await fs.promises.readFile(
      parentCategoryFilePath,
      "utf8"
    );
  } catch (err) {
    console.error(
      `親カテゴリファイル「${parentCategoryFilePath}」の読み込みに失敗しました:`,
      err
    );
    return;
  }

  const { data: parentCategoryData } = matter(parentCategoryContents);

  let fileContents = null;

  if (fs.existsSync(articleFilePath)) {
    try {
      fileContents = fs.readFileSync(articleFilePath, "utf8");
    } catch (error) {
      console.error(
        `記事の${secondLevelArticle_slug}.mdxを読み取れませんでした。`,
        error
      );
      return null;
    }

    const { data, content } = matter(fileContents);

    return {
      frontmatter: data,
      content,
      categoryName: parentCategoryData.categoryName,
    };
  } else if (fs.existsSync(childCategoryFilePath)) {
    try {
      fileContents = fs.readFileSync(childCategoryFilePath, "utf8");
    } catch (error) {
      console.error(
        `カテゴリの${secondLevelArticle_slug}.mdxを読み取れませんでした。`,
        error
      );
      return null;
    }

    const { data, content } = matter(fileContents);

    return {
      frontmatter: data,
      content,
      categoryName: parentCategoryData.categoryName,
    };
  } else {
    console.log("記事もカテゴリも見つかりませんでした。");
    return null;
  }
}
