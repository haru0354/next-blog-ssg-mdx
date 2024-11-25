import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { getFixedPages } from "./fixedPageService";
import { getParentCategories } from "./categoryService";

export async function getFirstLevelArticles() {
  try {
    const fixedPages = await getFixedPages();
    const categories = await getParentCategories();

    const FirstLevelArticles = [...(fixedPages || []), ...(categories || [])];

    return FirstLevelArticles;
  } catch (err) {
    console.error("第1階層の記事一覧の取得に失敗しました", err);
    return;
  }
}

export async function getFirstLevelArticle(firstLevelArticle_slug: string) {
  try {
    const articleFilePath = path.join(
      process.cwd(),
      "mdx-files",
      "article",
      `${firstLevelArticle_slug}.mdx`
    );

    const categoryFilePath = path.join(
      process.cwd(),
      "mdx-files",
      "category",
      `${firstLevelArticle_slug}.mdx`
    );

    let firstLevelArticleFileContents = null;

    if (fs.existsSync(articleFilePath)) {
      try {
        firstLevelArticleFileContents = fs.readFileSync(
          articleFilePath,
          "utf8"
        );
      } catch (err) {
        console.error(`${articleFilePath}の読み込みに失敗しました:`, err);
        return;
      }
    } else if (fs.existsSync(categoryFilePath)) {
      try {
        firstLevelArticleFileContents = fs.readFileSync(
          categoryFilePath,
          "utf8"
        );
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
  } catch (err) {
    console.error("第1階層の記事の取得に失敗しました", err);
    return;
  }
}
