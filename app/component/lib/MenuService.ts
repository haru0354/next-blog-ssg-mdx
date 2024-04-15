import path from "path";
import fs from "fs";
import matter from "gray-matter";

export async function getGlobalMenu() {
  const globalMenuDirectory = path.join(process.cwd(), "mdFile", "menu");
  const filePath = path.join(globalMenuDirectory, "globalMenu.md");
  const fileContents = await fs.promises.readFile(filePath, "utf8");
  const { data } = matter(fileContents);

  return {
    frontmatter: data,
  };
}

export async function getRecommendArticles() {
  const globalMenuDirectory = path.join(process.cwd(), "mdFile", "menu");
  const filePath = path.join(globalMenuDirectory, "recommendArticle.md");
  const fileContents = await fs.promises.readFile(filePath, "utf8");
  const { data } = matter(fileContents);

  return {
    frontmatter: data,
  };
}

export async function getLinks() {
  const globalMenuDirectory = path.join(process.cwd(), "mdFile", "menu");
  const filePath = path.join(globalMenuDirectory, "link.md");
  const fileContents = await fs.promises.readFile(filePath, "utf8");
  const { data } = matter(fileContents);

  return {
    frontmatter: data,
  };
}
  