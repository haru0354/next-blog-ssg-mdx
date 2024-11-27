import path from "path";
import fs from "fs";
import { getMdxFileNamesInDirectory } from "../getMdxFileNamesInDirectory";
import { getFileContents } from "../getFileContents";
import { getSubdirectories } from "../getSubdirectories";

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
    const parentCategoryDirectories = getSubdirectories(categoryDirectory);

    let childCategories: ChildCategories[] = [];

    await Promise.all(
      parentCategoryDirectories.map(async (parentCategoryDirectory) => {
        const childCategoryDirectory = path.join(
          process.cwd(),
          "mdx-files",
          "category",
          parentCategoryDirectory
        );

        const childCategoryMdxFileNames = getMdxFileNamesInDirectory(
          childCategoryDirectory
        );

        if (childCategoryMdxFileNames === null) {
          return null;
        }

        await Promise.all(
          childCategoryMdxFileNames.map(async (childCategoryMdxFileName) => {
            const childCategoryFileNames = childCategoryMdxFileName.replace(
              /\.mdx$/,
              ""
            );

            const childCategoryContents = await getFileContents(
              childCategoryDirectory,
              childCategoryFileNames
            );

            if (childCategoryContents === null) {
              return null;
            }

            childCategories.push({
              slug: childCategoryMdxFileName.replace(".mdx", ""),
              parentCategorySlug: parentCategoryDirectory,
              frontmatter: childCategoryContents.frontmatter as Frontmatter,
            });
          })
        );
      })
    );

    const allCategories = [
      ...(parentCategories || []),
      ...(childCategories || []),
    ];

    return allCategories;
  } catch (err) {
    console.error("全てのカテゴリ一覧の取得に失敗しました", err);
    return;
  }
}

export async function getParentCategories() {
  const categoriesDirectory = path.join(process.cwd(), "mdx-files", "category");

  const mdxFileNames = getMdxFileNamesInDirectory(categoriesDirectory);

  if (mdxFileNames === null) {
    return null;
  }

  const parentCategories = await Promise.all(
    mdxFileNames.map(async (mdxFileName) => {
      const fileName = mdxFileName.replace(/\.mdx$/, "");

      const parentCategoryContents = await getFileContents(
        categoriesDirectory,
        fileName
      );

      if (parentCategoryContents === null) {
        return null;
      }

      return {
        slug: mdxFileName.replace(".mdx", ""),
        frontmatter: parentCategoryContents.frontmatter,
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

    const mdxFileNames = getMdxFileNamesInDirectory(childCategoriesDirectory);

    if (mdxFileNames === null) {
      return null;
    }

    const childCategories = await Promise.all(
      mdxFileNames.map(async (mdxFileName) => {
        const fileNames = mdxFileName.replace(/\.mdx$/, "");

        const childCategoryContents = await getFileContents(
          childCategoriesDirectory,
          fileNames
        );

        if (childCategoryContents === null) {
          return null;
        }

        return {
          slug: mdxFileName.replace(".mdx", ""),
          frontmatter: childCategoryContents.frontmatter,
        };
      })
    );

    return childCategories;
  } catch (err) {
    console.error("子カテゴリ一覧の取得に失敗しました", err);
    return;
  }
}
