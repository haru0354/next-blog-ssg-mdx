import path from "path";

import { getMdxFileNamesInDirectory } from "../getMdxFileNamesInDirectory";
import { getFileContents } from "../getFileContents";
import { getSubdirectories } from "../getSubdirectories";

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
  try {
    const articlesDirectory = path.join(process.cwd(), "mdx-files", "article");
    const categoriesDirectory = path.join(
      process.cwd(),
      "mdx-files",
      "category"
    );

    const parentCategoryDirectories = getSubdirectories(articlesDirectory);

    if (parentCategoryDirectories.length === 0) {
      return null;
    }

    const articles: Article[] = [];

    await Promise.all(
      parentCategoryDirectories.map(async (parentCategoryDirectory) => {
        const parentCategoryDirectoryPath = path.join(
          articlesDirectory,
          parentCategoryDirectory
        );

        const childCategoryDirectories = getSubdirectories(
          parentCategoryDirectoryPath
        );

        if (childCategoryDirectories.length === 0) {
          return null;
        }

        await Promise.all(
          childCategoryDirectories.map(async (childCategoryDirectory) => {
            const childCategoryPath = path.join(
              articlesDirectory,
              parentCategoryDirectory,
              childCategoryDirectory
            );

            const mdxFileNames = getMdxFileNamesInDirectory(childCategoryPath);

            if (mdxFileNames === null) {
              return null;
            }

            const childCategoryFileDirectory = path.join(
              categoriesDirectory,
              parentCategoryDirectory
            );

            await Promise.all(
              mdxFileNames.map(async (mdxFileName) => {
                const fileName = mdxFileName.replace(/\.mdx$/, "");

                const thirdLevelArticleContents = await getFileContents(
                  childCategoryPath,
                  fileName
                );

                if (thirdLevelArticleContents === null) {
                  return null;
                }

                const parentCategoryContents = await getFileContents(
                  categoriesDirectory,
                  parentCategoryDirectory
                );

                if (parentCategoryContents === null) {
                  return null;
                }

                const childCategoryContents = await getFileContents(
                  childCategoryFileDirectory,
                  childCategoryDirectory
                );

                if (childCategoryContents === null) {
                  return null;
                }

                articles.push({
                  slug: mdxFileName.replace(".mdx", ""),
                  parentCategorySlug: parentCategoryDirectory,
                  childCategorySlug: childCategoryDirectory,
                  parentCategoryName:
                    parentCategoryContents.frontmatter.categoryName,
                  childCategoryName:
                    childCategoryContents.frontmatter.categoryName,
                  frontmatter: {
                    title: thirdLevelArticleContents.frontmatter.title,
                    date: thirdLevelArticleContents.frontmatter.date,
                    description:
                      thirdLevelArticleContents.frontmatter.description,
                    eyeCatchName:
                      thirdLevelArticleContents.frontmatter.eyeCatchName,
                    eyeCatchAlt:
                      thirdLevelArticleContents.frontmatter.eyeCatchAlt,
                  },
                });
              })
            );
          })
        );
      })
    );

    return articles;
  } catch (err) {
    console.error("第3階層の記事一覧の取得に失敗しました", err);
    return;
  }
}

export async function getThirdLevelArticle(
  firstLevelArticle_slug: string,
  secondLevelArticle_slug: string,
  thirdLevelArticle_slug: string
) {
  try {
    const thirdLevelArticleDirectory = path.join(
      process.cwd(),
      "mdx-files",
      "article",
      firstLevelArticle_slug,
      secondLevelArticle_slug
    );

    const thirdLevelArticleContents = await getFileContents(
      thirdLevelArticleDirectory,
      thirdLevelArticle_slug,
      true
    );

    if (thirdLevelArticleContents === null) {
      return null;
    }

    const categoryDirectory = path.join(process.cwd(), "mdx-files", "category");

    const parentCategoryContents = await getFileContents(
      categoryDirectory,
      firstLevelArticle_slug
    );

    if (parentCategoryContents === null) {
      return null;
    }

    const childCategoryDirectory = path.join(
      process.cwd(),
      "mdx-files",
      "category",
      firstLevelArticle_slug
    );

    const childCategoryContents = await getFileContents(
      childCategoryDirectory,
      secondLevelArticle_slug
    );

    if (childCategoryContents === null) {
      return null;
    }

    return {
      frontmatter: thirdLevelArticleContents.frontmatter,
      content: thirdLevelArticleContents.content,
      parentCategoryName: parentCategoryContents.frontmatter.categoryName,
      childCategoryName: childCategoryContents.frontmatter.categoryName,
    };
  } catch (error) {
    console.error("第3階層のデータの取得に失敗しました。", error);
    return;
  }
}
