import path from "path";

import { getFileContents } from "../getFileContents";
import { getArticlesFromSlugs } from "../getArticlesFromSlugs";

export async function getTopPageArticle() {
  try {
    const directoryPath = path.join(process.cwd(), "mdx-files", "top-page");

    const topPageFileData = await getFileContents(
      directoryPath,
      "topPageArticle",
      true
    );

    if (!topPageFileData) {
      console.error("トップページの記事が取得できませんでした");
      return;
    }

    return topPageFileData;
  } catch (err) {
    console.error("TOPページのコンテンツファイルの取得に失敗しました", err);
    return;
  }
}

export async function getTwoColumnRecommendArticles() {
  try {
    const directoryPath = path.join(process.cwd(), "mdx-files", "top-page");

    const topPageRecommendArticles = await getArticlesFromSlugs(
      directoryPath,
      "twoColumnRecommendArticles"
    );

    if (!topPageRecommendArticles) {
      return null;
    }

    return topPageRecommendArticles;
  } catch (err) {
    console.error(
      "TOPページの2カラムのおすすめ記事データの取得に失敗しました",
      err
    );
    return;
  }
}

export async function getTopPageRecommendArticles() {
  try {
    const directoryPath = path.join(process.cwd(), "mdx-files", "top-page");

    const topPageRecommendArticles = await getArticlesFromSlugs(
      directoryPath,
      "topPageRecommendArticles"
    );

    if (!topPageRecommendArticles) {
      return null;
    }

    return topPageRecommendArticles;
  } catch (err) {
    console.error("TOPページのおすすめ記事データの取得に失敗しました", err);
    return;
  }
}
