import path from "path";
import fs from "fs";
import matter from "gray-matter";

export async function getThirdLevelArticle(
  firstLevelArticle_slug: string,
  secondLevelArticle_slug: string,
  thirdLevelArticle_slug: string
) {
  const filePath = path.join(
    process.cwd(),
    "mdFile",
    "article",
    firstLevelArticle_slug,
    secondLevelArticle_slug,
    `${thirdLevelArticle_slug}.mdx`
  );

  const fileContents = await fs.promises.readFile(filePath, "utf8");
  const { data, content } = matter(fileContents);

  const categoryPath = path.join(
    process.cwd(),
    "mdFile",
    "category",
    firstLevelArticle_slug,
    `${secondLevelArticle_slug}.mdx`
  );

  const categoryContents = await fs.promises.readFile(categoryPath, "utf8");
  const { data: categoryData } = matter(categoryContents);

  return {
    frontmatter: data,
    content,
    categoryName: categoryData.categoryName,
  };
}
