import path from "path";
import fs from "fs";
import matter from "gray-matter";

export async function getGlobalMenu() {
  const globalMenuDirectory = path.join(process.cwd(), "mdFile", "menu");
  const filePath = path.join(globalMenuDirectory, "globalMenu.mdx");
  const fileContents = await fs.promises.readFile(filePath, "utf8");
  const { data } = matter(fileContents);

  return {
    frontmatter: data,
  };
}

export async function getRecommendArticles() {
  const globalMenuDirectory = path.join(process.cwd(), "mdFile", "menu");
  const filePath = path.join(globalMenuDirectory, "recommendArticle.mdx");
  const fileContents = await fs.promises.readFile(filePath, "utf8");
  const { data } = matter(fileContents);

  return {
    frontmatter: data,
  };
}

export async function getLinks() {
  const globalMenuDirectory = path.join(process.cwd(), "mdFile", "menu");
  const filePath = path.join(globalMenuDirectory, "link.mdx");
  const fileContents = await fs.promises.readFile(filePath, "utf8");
  const { data } = matter(fileContents);

  return {
    frontmatter: data,
  };
}

export async function getSideImage() {
  const globalMenuDirectory = path.join(process.cwd(), "mdFile", "menu");
  const filePath = path.join(globalMenuDirectory, "sideImage.mdx");
  const fileContents = await fs.promises.readFile(filePath, "utf8");
  const { data } = matter(fileContents);

  return {
    frontmatter: data,
  };
}