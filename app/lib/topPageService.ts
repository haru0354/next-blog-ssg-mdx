import { getFileContents } from "./getFileContents";
import { getArticlesFromSlugs } from "./getArticlesFromSlugs";

export async function getTopPageArticle() {
  try {
    const topPageFileData = await getFileContents("top-page", "topPageArticle", true);

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
    const TopPageRecommendArticles = await getArticlesFromSlugs(
      "top-page",
      "twoColumnRecommendArticles"
    );

    if (!TopPageRecommendArticles) {
      console.error("TOPページの2カラムのおすすめ記事データが取得できませんでした");
      return;
    }

    return TopPageRecommendArticles;
  } catch (err) {
    console.error("TOPページの2カラムのおすすめ記事データの取得に失敗しました", err);
    return;
  }
}

export async function getTopPageRecommendArticles() {
  try {
    const TopPageRecommendArticles = await getArticlesFromSlugs(
      "top-page",
      "topPageRecommendArticles"
    );

    if (!TopPageRecommendArticles) {
      console.error("TOPページのおすすめ記事データが取得できませんでした");
      return;
    }

    return TopPageRecommendArticles;
  } catch (err) {
    console.error("TOPページのおすすめ記事データの取得に失敗しました", err);
    return;
  }
}


