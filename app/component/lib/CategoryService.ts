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
  const mainCategories = await getMainCategories();

  const categoryDirectory = path.join(process.cwd(), "mdFile", "category");

  const parentCategoryFolders = fs
    .readdirSync(categoryDirectory)
    .filter((name) => {
      return fs.statSync(path.join(categoryDirectory, name)).isDirectory();
    });

  let childCategories: ChildCategories[] = [];

  await Promise.all(
    parentCategoryFolders.map(async (parentCategoryFolder) => {
      const childCategoryDirectory = path.join(
        process.cwd(),
        "mdFile",
        "category",
        parentCategoryFolder
      );

      const FileNamesInChildCategory = fs.readdirSync(childCategoryDirectory);
      const childCategoryMdxFileNames = FileNamesInChildCategory.filter(
        (FileNameInChildCategory) => FileNameInChildCategory.endsWith(".mdx")
      );

      await Promise.all(
        childCategoryMdxFileNames.map(async (childCategoryMdxFileName) => {
          const filePath = path.join(
            childCategoryDirectory,
            `${childCategoryMdxFileName}`
          );
          const fileContents = await fs.promises.readFile(filePath, "utf8");
          const { data } = matter(fileContents);

          childCategories.push({
            slug: childCategoryMdxFileName.replace(".mdx", ""),
            parentCategorySlug: parentCategoryFolder,
            frontmatter: data as Frontmatter,
          });
        })
      );
    })
  );

  const allCategories = [...mainCategories, ...childCategories];

  return allCategories;
}

export async function getMainCategories() {
  const categoriesDirectory = path.join(process.cwd(), "mdFile", "category");

  const fileNames = fs.readdirSync(categoriesDirectory);

  const mdxFileNames = fileNames.filter((fileName) =>
    fileName.endsWith(".mdx")
  );

  const mainCategories = await Promise.all(
    mdxFileNames.map(async (mdxFileName) => {
      const filePath = path.join(categoriesDirectory, `${mdxFileName}`);
      const fileContents = await fs.promises.readFile(filePath, "utf8");
      const { data } = matter(fileContents);

      return {
        slug: mdxFileName.replace(".mdx", ""),
        frontmatter: data,
      };
    })
  );

  return mainCategories;
}

export async function getSecondCategories(firstLevelArticle_slug: string) {
  const secondCategoriesDirectory = path.join(
    process.cwd(),
    "mdFile",
    "category",
    firstLevelArticle_slug
  );

  const fileNames = fs.readdirSync(secondCategoriesDirectory);

  const mdxFileNames = fileNames.filter((fileName) =>
    fileName.endsWith(".mdx")
  );

  const secondCategories = await Promise.all(
    mdxFileNames.map(async (mdxFileName) => {
      const filePath = path.join(secondCategoriesDirectory, `${mdxFileName}`);
      const fileContents = await fs.promises.readFile(filePath, "utf8");
      const { data } = matter(fileContents);

      return {
        slug: mdxFileName.replace(".mdx", ""),
        frontmatter: data,
      };
    })
  );

  return secondCategories;
}
