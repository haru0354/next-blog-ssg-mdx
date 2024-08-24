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
  try {
    const articlesDirectory = path.join(process.cwd(), "mdFile", "article");

    let parentCategoryFolders: string[] = [];
    try {
      parentCategoryFolders = fs
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
      parentCategoryFolders.map(async (parentCategoryFolder) => {
        const parentCategoryDirectory = path.join(
          process.cwd(),
          "mdFile",
          "article",
          parentCategoryFolder
        );

        let childCategoryFolders: string[] = [];
        try {
          childCategoryFolders = fs
            .readdirSync(parentCategoryDirectory)
            .filter((name) => {
              return fs
                .statSync(path.join(parentCategoryDirectory, name))
                .isDirectory();
            });
        } catch (err) {
          console.error(
            `親カテゴリディレクトリ「${parentCategoryDirectory}」の読み込みに失敗しました:`,
            err
          );
          return [];
        }

        await Promise.all(
          childCategoryFolders.map(async (childCategoryFolder) => {
            const childCategoryPath = path.join(
              articlesDirectory,
              parentCategoryFolder,
              childCategoryFolder
            );

            let thirdLevelArticleFileNames: string[] = [];
            try {
              thirdLevelArticleFileNames = fs.readdirSync(childCategoryPath);
            } catch (err) {
              console.error(
                `子カテゴリディレクトリ「${childCategoryPath}」の読み込みに失敗しました:`,
                err
              );
              return [];
            }

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
                const articleFilePath = path.join(
                  "mdFile",
                  "article",
                  parentCategoryFolder,
                  childCategoryFolder,
                  mdxFileName
                );

                let articleFileContents: string;
                try {
                  articleFileContents = await fs.promises.readFile(
                    articleFilePath,
                    "utf8"
                  );
                } catch (err) {
                  console.error(
                    `記事ファイル「${articleFilePath}」の読み込みに失敗しました:`,
                    err
                  );
                  return;
                }

                const { data: articleData } = matter(articleFileContents);

                let parentCategoryContents: string;
                try {
                  parentCategoryContents = await fs.promises.readFile(
                    parentCategoryFile,
                    "utf8"
                  );
                } catch (err) {
                  console.error(
                    `親カテゴリファイル「${parentCategoryFile}」の読み込みに失敗しました:`,
                    err
                  );
                  return;
                }

                const { data: parentCategoryData } = matter(
                  parentCategoryContents
                );

                let childCategoryContents: string;
                try {
                  childCategoryContents = await fs.promises.readFile(
                    childCategoryFile,
                    "utf8"
                  );
                } catch (err) {
                  console.error(
                    `子カテゴリファイル「${childCategoryFile}」の読み込みに失敗しました:`,
                    err
                  );
                  return;
                }

                const { data: childCategoryData } = matter(
                  childCategoryContents
                );

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
    const articleFilePath = path.join(
      process.cwd(),
      "mdFile",
      "article",
      firstLevelArticle_slug,
      secondLevelArticle_slug,
      `${thirdLevelArticle_slug}.mdx`
    );

    let articleFileContents: string;
    try {
      articleFileContents = await fs.promises.readFile(articleFilePath, "utf8");
    } catch (err) {
      console.error(
        `記事ファイル「${articleFilePath}」の読み込みに失敗しました:`,
        err
      );
      return;
    }

    const { data, content } = matter(articleFileContents);

    const parentCategoryPath = path.join(
      process.cwd(),
      "mdFile",
      "category",
      `${firstLevelArticle_slug}.mdx`
    );

    let parentCategoryContents: string;
    try {
      parentCategoryContents = await fs.promises.readFile(
        parentCategoryPath,
        "utf8"
      );
    } catch (err) {
      console.error(
        `親カテゴリファイル「${parentCategoryPath}」の読み込みに失敗しました:`,
        err
      );
      return;
    }

    const { data: parentCategoryData } = matter(parentCategoryContents);

    const childCategoryPath = path.join(
      process.cwd(),
      "mdFile",
      "category",
      firstLevelArticle_slug,
      `${secondLevelArticle_slug}.mdx`
    );

    let childCategoryContents: string;
    try {
      childCategoryContents = await fs.promises.readFile(
        childCategoryPath,
        "utf8"
      );
    } catch (err) {
      console.error(
        `子カテゴリファイル「${childCategoryPath}」の読み込みに失敗しました:`,
        err
      );
      return;
    }

    const { data: childCategoryData } = matter(childCategoryContents);

    return {
      frontmatter: data,
      content,
      parentCategoryName: parentCategoryData.categoryName,
      childCategoryName: childCategoryData.categoryName,
    };
  } catch (error) {
    console.error("第3階層のデータの取得に失敗しました。", error);
    return;
  }
}
