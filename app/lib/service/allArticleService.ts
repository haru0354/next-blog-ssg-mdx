import path from "path";
import fs from "fs";
import { getMdxFileNamesInDirectory } from "../getMdxFileNamesInDirectory";
import { getFileContents } from "../getFileContents";

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

    let categoryFoldersInArticle: string[] = [];
    try {
      categoryFoldersInArticle = fs
        .readdirSync(articlesDirectory)
        .filter((name) => {
          return fs.statSync(path.join(articlesDirectory, name)).isDirectory();
        });
    } catch (err) {
      console.error(
        `${articlesDirectory}のディレクトリの読み込みに失敗しました:`,
        err
      );
      return [];
    }

    const articles: Article[] = [];

    await Promise.all(
      categoryFoldersInArticle.map(async (categoryFolderInArticle) => {
        const parentCategoryPath = path.join(
          articlesDirectory,
          categoryFolderInArticle
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
          categoryFolderInArticle
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
                parentCategorySlug: categoryFolderInArticle,
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

        //下記で第3階層の各記事をarticlesに含める
        let parentCategoryFoldersInArticle: string[] = [];
        try {
          parentCategoryFoldersInArticle = fs
            .readdirSync(parentCategoryPath)
            .filter((name) => {
              return fs
                .statSync(path.join(parentCategoryPath, name))
                .isDirectory();
            });
        } catch (err) {
          console.error(
            `子カテゴリディレクトリ「${parentCategoryPath}」の読み込みに失敗しました:`,
            err
          );
          return [];
        }

        await Promise.all(
          parentCategoryFoldersInArticle.map(
            async (parentCategoryFolderInArticle) => {
              const childCategoryPath = path.join(
                articlesDirectory,
                categoryFolderInArticle,
                parentCategoryFolderInArticle
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
                categoryFolderInArticle
              );

              const childCategoryContents = await getFileContents(
                childCategoryFilePath,
                parentCategoryFolderInArticle
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
                      parentCategorySlug: categoryFolderInArticle,
                      childCategoryName:
                        childCategoryContents?.frontmatter.categoryName,
                      childCategorySlug: parentCategoryFolderInArticle,
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
            }
          )
        );
      })
    );

    return articles;
  } catch (err) {
    console.error("全ての記事一覧の取得に失敗しました", err);
    return;
  }
}
