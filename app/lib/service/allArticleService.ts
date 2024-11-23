import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { getMdxFileNamesInDirectory } from "../getMdxFileNamesInDirectory";

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

        const parentCategoryFilePath = path.join(
          process.cwd(),
          "mdx-files",
          "category",
          `${categoryFolderInArticle}.mdx`
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

        //第2階層の各記事をarticleに含める
        await Promise.all(
          mdxFileNamesInParentCategory.map(
            async (mdxFileNameInParentCategory) => {
              const filePath = path.join(
                parentCategoryPath,
                mdxFileNameInParentCategory
              );

              let fileContents: string;
              try {
                fileContents = await fs.promises.readFile(filePath, "utf8");
              } catch (err) {
                console.error(
                  `親カテゴリディレクトリ「${filePath}」の読み込みに失敗しました:`,
                  err
                );
                return;
              }

              const { data } = matter(fileContents);

              articles.push({
                slug: mdxFileNameInParentCategory.replace(".mdx", ""),
                parentCategoryName: parentCategoryData.categoryName,
                parentCategorySlug: categoryFolderInArticle,
                frontmatter: {
                  title: data.title,
                  date: data.date,
                  description: data.description,
                  eyeCatchName: data.eyeCatchName,
                  eyeCatchAlt: data.eyeCatchAlt,
                },
              });
            }
          )
        );

        //下記で第3階層の各記事をarticleに含める
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
                categoryFolderInArticle,
                `${parentCategoryFolderInArticle}.mdx`
              );

              let childCategoryContents: string;
              try {
                childCategoryContents = await fs.promises.readFile(
                  childCategoryFilePath,
                  "utf8"
                );
              } catch (err) {
                console.error(
                  `子カテゴリのファイル「${childCategoryFilePath}」の読み込みに失敗しました:`,
                  err
                );
                return;
              }

              const { data: childCategoryData } = matter(childCategoryContents);

              await Promise.all(
                mdxFileNamesInChildCategory.map(
                  async (mdxFileNameInChildCategory) => {
                    const filePath = path.join(
                      childCategoryPath,
                      mdxFileNameInChildCategory
                    );

                    let fileContents: string;
                    try {
                      fileContents = await fs.promises.readFile(
                        filePath,
                        "utf8"
                      );
                    } catch (err) {
                      console.error(
                        `子カテゴリファイル${filePath}の読み込みに失敗しました:`,
                        err
                      );
                      return;
                    }

                    const { data } = matter(fileContents);

                    articles.push({
                      slug: mdxFileNameInChildCategory.replace(".mdx", ""),
                      parentCategoryName: parentCategoryData.categoryName,
                      parentCategorySlug: categoryFolderInArticle,
                      childCategoryName: childCategoryData.categoryName,
                      childCategorySlug: parentCategoryFolderInArticle,
                      frontmatter: {
                        title: data.title,
                        date: data.date,
                        description: data.description,
                        eyeCatchName: data.eyeCatchName,
                        eyeCatchAlt: data.eyeCatchAlt,
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
