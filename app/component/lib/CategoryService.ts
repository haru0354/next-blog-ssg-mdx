import path from "path";
import fs from "fs";
import matter from "gray-matter";

export async function getCategories() {
  const categoriesDirectory = path.join(
    process.cwd(),
    "mdFile",
    "category",
  );
  const fileNames = fs.readdirSync(categoriesDirectory);

  const categories = await Promise.all(
    fileNames.map(async (fileName) => {
      const filePath = path.join(categoriesDirectory, `${fileName}`);
      const fileContents = await fs.promises.readFile(filePath, "utf8");
      const { data } = matter(fileContents);

      return {
        slug: fileName.replace(".mdx", ""),
        frontmatter: data,
      };
    })
  );

  return categories;
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
