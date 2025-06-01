import path from "path";

import { getMdxFileNamesInDirectory } from "../getMdxFileNamesInDirectory";
import { getFileContents } from "../getFileContents";
import { getSubdirectories } from "../getSubdirectories";

type Article = {
  slug: string;
  parentCategoryName: string;
  parentCategorySlug: string;
  childCategoryName?: string;
  childCategorySlug?: string;
  frontmatter: Frontmatter;
};

type Frontmatter = {
  title: string;
  date: string;
  description: string;
  eyeCatchName: string;
  eyeCatchAlt: string;
};

export async function getAllArticles() {
  try {
    const articlesDirectory = path.join(process.cwd(), "mdx-files", "article");
    const parentCategoryDirectories = getSubdirectories(articlesDirectory);

    if (parentCategoryDirectories.length === 0) {
      return null;
    }

    const articles: Article[] = [];

    await Promise.all(
      parentCategoryDirectories.map(async (parentCategoryDirectory) => {
        const parentCategoryPath = path.join(
          articlesDirectory,
          parentCategoryDirectory
        );

        const mdxFileNamesInParentCategory =
          getMdxFileNamesInDirectory(parentCategoryPath);

        if (mdxFileNamesInParentCategory === null) {
          return null;
        }

        const categoriesDirectory = path.join(
          process.cwd(),
          "mdx-files",
          "category"
        );

        const parentCategoryContents = await getFileContents(
          categoriesDirectory,
          parentCategoryDirectory
        );

        if (parentCategoryContents === null) {
          return null;
        }

        //下記で第2階層の各記事をarticlesに含める
        await Promise.all(
          mdxFileNamesInParentCategory.map(
            async (mdxFileNameInParentCategory) => {
              const secondLevelArticleFileNames =
                mdxFileNameInParentCategory.replace(/\.mdx$/, "");

              const secondLevelArticlesFiles = await getFileContents(
                parentCategoryPath,
                secondLevelArticleFileNames
              );

              if (secondLevelArticlesFiles === null) {
                return null;
              }

              articles.push({
                slug: mdxFileNameInParentCategory.replace(".mdx", ""),
                parentCategoryName:
                  parentCategoryContents?.frontmatter.categoryName,
                parentCategorySlug: parentCategoryDirectory,
                frontmatter: {
                  title: secondLevelArticlesFiles.frontmatter.title,
                  date: secondLevelArticlesFiles.frontmatter.date,
                  description: secondLevelArticlesFiles.frontmatter.description,
                  eyeCatchName:
                    secondLevelArticlesFiles.frontmatter.eyeCatchName,
                  eyeCatchAlt: secondLevelArticlesFiles.frontmatter.eyeCatchAlt,
                },
              });
            }
          )
        );

        const childCategoryDirectories = getSubdirectories(parentCategoryPath);

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

            const mdxFileNamesInChildCategory =
              getMdxFileNamesInDirectory(childCategoryPath);

            if (mdxFileNamesInChildCategory === null) {
              return null;
            }

            const childCategoryFilePath = path.join(
              process.cwd(),
              "mdx-files",
              "category",
              parentCategoryDirectory
            );

            const childCategoryContents = await getFileContents(
              childCategoryFilePath,
              childCategoryDirectory
            );

            if (childCategoryContents === null) {
              return null;
            }

            await Promise.all(
              mdxFileNamesInChildCategory.map(
                async (mdxFileNameInChildCategory) => {
                  const thirdLevelArticlesFileNames =
                    mdxFileNameInChildCategory.replace(/\.mdx$/, "");

                  const thirdLevelArticlesContents = await getFileContents(
                    childCategoryPath,
                    thirdLevelArticlesFileNames
                  );

                  if (thirdLevelArticlesContents === null) {
                    return null;
                  }

                  articles.push({
                    slug: thirdLevelArticlesFileNames,
                    parentCategoryName:
                      parentCategoryContents?.frontmatter.categoryName,
                    parentCategorySlug: parentCategoryDirectory,
                    childCategoryName:
                      childCategoryContents?.frontmatter.categoryName,
                    childCategorySlug: childCategoryDirectory,
                    frontmatter: {
                      title: thirdLevelArticlesContents.frontmatter.title,
                      date: thirdLevelArticlesContents.frontmatter.date,
                      description:
                        thirdLevelArticlesContents.frontmatter.description,
                      eyeCatchName:
                        thirdLevelArticlesContents.frontmatter.eyeCatchName,
                      eyeCatchAlt:
                        thirdLevelArticlesContents.frontmatter.eyeCatchAlt,
                    },
                  });
                }
              )
            );
          })
        );
      })
    );

    return articles;
  } catch (err) {
    console.error("全ての記事一覧の取得に失敗しました", err);
    return;
  }
}
