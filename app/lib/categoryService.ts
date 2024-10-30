import path from "path";
import fs from "fs";
import matter from "gray-matter";

type ChildCategories = {
  slug: string;
  parentCategorySlug: string;
  frontmatter: Frontmatter;
};

type Frontmatter = {
  categoryName: string;
  title: string;
  description: string;
  date: string;
  eyeCatchName: string;
  eyeCatchAlt: string;
};

export async function getAllCategories() {
  try {
    const parentCategories = await getParentCategories();

    const categoryDirectory = path.join(process.cwd(), "mdx-files", "category");

    let parentCategoryFolders: string[] = [];
    try {
      parentCategoryFolders = fs
        .readdirSync(categoryDirectory)
        .filter((name) => {
          return fs.statSync(path.join(categoryDirectory, name)).isDirectory();
        });
    } catch (err) {
      console.error(
        `親カテゴリディレクトリ「${categoryDirectory}」の読み込みに失敗しました:`,
        err
      );
      return [];
    }

    let childCategories: ChildCategories[] = [];

    await Promise.all(
      parentCategoryFolders.map(async (parentCategoryFolder) => {
        const childCategoryDirectory = path.join(
          process.cwd(),
          "mdx-files",
          "category",
          parentCategoryFolder
        );

        let FileNamesInChildCategory: string[] = [];
        try {
          FileNamesInChildCategory = fs.readdirSync(childCategoryDirectory);
        } catch (err) {
          console.error(
            `子カテゴリディレクトリ「${childCategoryDirectory}」の読み込みに失敗しました:`,
            err
          );
          return [];
        }

        const childCategoryMdxFileNames = FileNamesInChildCategory.filter(
          (FileNameInChildCategory) => FileNameInChildCategory.endsWith(".mdx")
        );

        await Promise.all(
          childCategoryMdxFileNames.map(async (childCategoryMdxFileName) => {
            const filePath = path.join(
              childCategoryDirectory,
              `${childCategoryMdxFileName}`
            );

            let childCategoryFileContents: string;
            try {
              childCategoryFileContents = await fs.promises.readFile(
                filePath,
                "utf8"
              );
            } catch (err) {
              console.error(
                `子カテゴリファイル「${filePath}」の読み込みに失敗しました:`,
                err
              );
              return;
            }

            const { data } = matter(childCategoryFileContents);

            childCategories.push({
              slug: childCategoryMdxFileName.replace(".mdx", ""),
              parentCategorySlug: parentCategoryFolder,
              frontmatter: data as Frontmatter,
            });
          })
        );
      })
    );

    const allCategories = [...parentCategories, ...childCategories];

    return allCategories;
  } catch (err) {
    console.error("全てのカテゴリ一覧の取得に失敗しました", err);
    return;
  }
}

export async function getParentCategories() {
  const categoriesDirectory = path.join(process.cwd(), "mdx-files", "category");

  let fileNamesInCategoryDirectory: string[] = [];
  try {
    fileNamesInCategoryDirectory = fs.readdirSync(categoriesDirectory);
  } catch (err) {
    console.error(
      `カテゴリディレクトリ「${categoriesDirectory}」の読み込みに失敗しました:`,
      err
    );
    return [];
  }

  const mdxFileNames = fileNamesInCategoryDirectory.filter(
    (fileNameInCategoryDirectory) =>
      fileNameInCategoryDirectory.endsWith(".mdx")
  );

  const parentCategories = await Promise.all(
    mdxFileNames.map(async (mdxFileName) => {
      const parentCategoryFilePath = path.join(
        categoriesDirectory,
        `${mdxFileName}`
      );

      let parentCategoryFileContents: string;
      try {
        parentCategoryFileContents = await fs.promises.readFile(
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

      const { data } = matter(parentCategoryFileContents);

      return {
        slug: mdxFileName.replace(".mdx", ""),
        frontmatter: data,
      };
    })
  );

  return parentCategories;
}

export async function getChildCategories(firstLevelArticle_slug: string) {
  try {
    const childCategoriesDirectory = path.join(
      process.cwd(),
      "mdx-files",
      "category",
      firstLevelArticle_slug
    );

    if (!fs.existsSync(childCategoriesDirectory)) {
      return null;
    }

    let fileNamesInChildCategory: string[] = [];
    try {
      fileNamesInChildCategory = fs.readdirSync(childCategoriesDirectory);
    } catch (err) {
      console.error(
        `子カテゴリディレクトリ「${childCategoriesDirectory}」の読み込みに失敗しました:`,
        err
      );
      return [];
    }

    const mdxFileNames = fileNamesInChildCategory.filter(
      (fileNameInChildCategory) => fileNameInChildCategory.endsWith(".mdx")
    );

    const childCategories = await Promise.all(
      mdxFileNames.map(async (mdxFileName) => {
        const childCategoryFilePath = path.join(
          childCategoriesDirectory,
          `${mdxFileName}`
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

        return {
          slug: mdxFileName.replace(".mdx", ""),
          frontmatter: data,
        };
      })
    );

    return childCategories;
  } catch (err) {
    console.error("子カテゴリ一覧の取得に失敗しました", err);
    return;
  }
}
