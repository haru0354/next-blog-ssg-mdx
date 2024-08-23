import path from "path";
import fs from "fs";
import matter from "gray-matter";

export async function getGlobalMenu() {
  const globalMenuDirectory = path.join(process.cwd(), "mdFile", "menu");
  const globalMenuFilePath = path.join(globalMenuDirectory, "globalMenu.mdx");

  let globalMenuFileContents: string;
  try {
     globalMenuFileContents = await fs.promises.readFile(globalMenuFilePath, "utf8");
  } catch (err) {
    console.error(
      `親カテゴリファイル「${globalMenuFilePath}」の読み込みに失敗しました:`,
      err
    );
    return;
  }

  const { data } = matter(globalMenuFileContents);

  return {
    frontmatter: data,
  };
}

export async function getRecommendArticles() {
  const globalMenuDirectory = path.join(process.cwd(), "mdFile", "menu");
  const recommendArticleFilePath = path.join(globalMenuDirectory, "recommendArticle.mdx");

  let recommendArticleFileContents: string;
  try {
    recommendArticleFileContents = await fs.promises.readFile(recommendArticleFilePath, "utf8");
  } catch (err) {
    console.error(
      `親カテゴリファイル「${recommendArticleFilePath}」の読み込みに失敗しました:`,
      err
    );
    return;
  }

  const { data } = matter(recommendArticleFileContents);

  return {
    frontmatter: data,
  };
}

export async function getLinks() {
  const globalMenuDirectory = path.join(process.cwd(), "mdFile", "menu");

  const linkFilePath = path.join(globalMenuDirectory, "link.mdx");

  let linkFileContents: string;
  try {
    linkFileContents = await fs.promises.readFile(linkFilePath, "utf8");
  } catch (err) {
    console.error(
      `親カテゴリファイル「${linkFilePath}」の読み込みに失敗しました:`,
      err
    );
    return;
  }

  const { data } = matter(linkFileContents);

  return {
    frontmatter: data,
  };
}

export async function getSideImage() {
  const globalMenuDirectory = path.join(process.cwd(), "mdFile", "menu");
  const sideImageFilePath = path.join(globalMenuDirectory, "sideImage.mdx");

  let sideImageFileContents: string;
  try {
    sideImageFileContents = await fs.promises.readFile(sideImageFilePath, "utf8");
  } catch (err) {
    console.error(
      `親カテゴリファイル「${sideImageFilePath}」の読み込みに失敗しました:`,
      err
    );
    return;
  }

  const { data } = matter(sideImageFileContents);

  return {
    frontmatter: data,
  };
}

export async function getSideImageBottom() {
  const globalMenuDirectory = path.join(process.cwd(), "mdFile", "menu");
  const sideImageFilePath = path.join(globalMenuDirectory, "sideImageBottom.mdx");

  let sideImageFileContents: string;
  try {
    sideImageFileContents = await fs.promises.readFile(sideImageFilePath, "utf8");
  } catch (err) {
    console.error(
      `親カテゴリファイル「${sideImageFilePath}」の読み込みに失敗しました:`,
      err
    );
    return;
  }

  const { data } = matter(sideImageFileContents);

  return {
    frontmatter: data,
  };
}




