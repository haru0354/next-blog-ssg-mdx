import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { getFixedPages } from "./FixedPageService";
import { getParentCategories } from "./CategoryService";

export async function getFirstLevelArticles() {
  const fixedPages = await getFixedPages();
  const categories = await getParentCategories();

  const FirstLevelArticles = [...fixedPages, ...categories];

  return FirstLevelArticles;
}

export async function getFirstLevelArticle(firstLevelArticle_slug: string) {
  const articleFilePath = path.join(
    process.cwd(),
    "mdFile",
    "article",
    `${firstLevelArticle_slug}.mdx`
  );

  const categoryFilePath = path.join(
    process.cwd(),
    "mdFile",
    "category",
    `${firstLevelArticle_slug}.mdx`
  );

  let firstLevelArticleFileContents = null;

  if (fs.existsSync(articleFilePath)) {
    try {
      firstLevelArticleFileContents = fs.readFileSync(articleFilePath, "utf8");
    } catch (err) {
      console.error(`${articleFilePath}の読み込みに失敗しました:`, err);
      return;
    }
  } else if (fs.existsSync(categoryFilePath)) {
    try {
      firstLevelArticleFileContents = fs.readFileSync(categoryFilePath, "utf8");
    } catch (err) {
      console.error(`${categoryFilePath}の読み込みに失敗しました:`, err);
      return;
    }
  } else {
    console.error("ファイルが見つかりませんでした。");
    return;
  }

  if (firstLevelArticleFileContents !== null) {
    const { data, content } = matter(firstLevelArticleFileContents);

    return {
      frontmatter: data,
      content,
    };
  } else {
    console.error("ファイルが読み取れませんでした。");
    return;
  }
}
