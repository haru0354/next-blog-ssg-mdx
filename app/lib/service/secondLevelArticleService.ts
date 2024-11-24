import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { getMdxFileNamesInDirectory } from "../getMdxFileNamesInDirectory";
import { getFileContents } from "../getFileContents";

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
  try {
    const articlesDirectory = path.join(process.cwd(), "mdx-files", "article");

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

        const mdxFileNames = getMdxFileNamesInDirectory(categoryPath);

        if (mdxFileNames === null) {
          return null;
        }

        await Promise.all(
          mdxFileNames.map(async (mdxFileName) => {
            const fileName = mdxFileName.replace(/\.mdx$/, "");

            const secondLevelArticleContents = await getFileContents(
              categoryPath,
              fileName
            );

            if (secondLevelArticleContents === null) {
              return null;
            }

            const categoriesFilesDirectory = path.join(
              process.cwd(),
              "mdx-files",
              "category"
            );

            const categoryContents = await getFileContents(
              categoriesFilesDirectory,
              categoryFoldersInArticle
            );

            if (categoryContents === null) {
              return null;
            }

            articles.push({
              slug: mdxFileName.replace(".mdx", ""),
              categorySlug: categoryFoldersInArticle,
              categoryName: categoryContents.frontmatter.categoryName,
              frontmatter: {
                title: secondLevelArticleContents.frontmatter.title,
                date: secondLevelArticleContents.frontmatter.date,
                description: secondLevelArticleContents.frontmatter.description,
                eyeCatchName:
                  secondLevelArticleContents.frontmatter.eyeCatchName,
                eyeCatchAlt: secondLevelArticleContents.frontmatter.eyeCatchAlt,
              },
            });
          })
        );
      })
    );

    const categoriesDirectory = path.join(
      process.cwd(),
      "mdx-files",
      "category"
    );

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
        const parentCategoryPath = path.join(
          categoriesDirectory,
          categoryFolder
        );

        const mdxFileNames = getMdxFileNamesInDirectory(parentCategoryPath);

        if (mdxFileNames === null) {
          return null;
        }

        await Promise.all(
          mdxFileNames.map(async (mdxFileName) => {
            const fileName = mdxFileName.replace(/\.mdx$/, "")

            const childCategoryContents = await getFileContents(
              parentCategoryPath,
              fileName
            );
    
            if (childCategoryContents === null) {
              return null;
            }

            categories.push({
              slug: mdxFileName.replace(".mdx", ""),
              categorySlug: categoryFolder,
              frontmatter: {
                title: childCategoryContents.frontmatter.title,
                date: childCategoryContents.frontmatter.date,
                description: childCategoryContents.frontmatter.description,
                eyeCatchName: childCategoryContents.frontmatter.eyeCatchName,
                eyeCatchAlt: childCategoryContents.frontmatter.eyeCatchAlt,
              },
            });
          })
        );
      })
    );

    const secondLevelArticles = [...articles, ...categories];

    return secondLevelArticles;
  } catch (err) {
    console.error("第2階層の記事一覧の取得に失敗しました", err);
    return;
  }
}

export async function getSecondLevelArticle(
  firstLevelArticle_slug: string,
  secondLevelArticle_slug: string
) {
  try {
    const articleFilePath = path.join(
      process.cwd(),
      "mdx-files",
      "article",
      firstLevelArticle_slug,
      `${secondLevelArticle_slug}.mdx`
    );

    const parentCategoryPath = path.join(
      process.cwd(),
      "mdx-files",
      "category",
    );

    const childCategoryFilePath = path.join(
      process.cwd(),
      "mdx-files",
      "category",
      firstLevelArticle_slug,
      `${secondLevelArticle_slug}.mdx`
    );

    const parentCategoryContents = await getFileContents(
      parentCategoryPath,
      firstLevelArticle_slug
    );

    if (parentCategoryContents === null) {
      return null;
    }

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
        categoryName: parentCategoryContents.frontmatter.categoryName,
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
        categoryName: parentCategoryContents.frontmatter.categoryName,
      };
    } else {
      console.log("記事もカテゴリも見つかりませんでした。");
      return;
    }
  } catch (err) {
    console.error("第2階層のデータ取得に失敗しました", err);
    return;
  }
}
