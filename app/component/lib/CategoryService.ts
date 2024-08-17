import path from "path";
import fs from "fs";
import matter from "gray-matter";

export async function getMainCategories() {
  const categoriesDirectory = path.join(
    process.cwd(),
    "mdFile",
    "category",
  );

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
    firstLevelArticle_slug,
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

export async function getCategory(params: string) {
  const slug = params;
  const filePath = path.join(
    process.cwd(),
    "mdFile",
    "category",
    `${slug}.mdx`
  );

  const fileContents = await fs.promises.readFile(filePath, "utf8");

  const { data, content } = matter(fileContents);

  return {
    frontmatter: data,
    content,
  };
}
