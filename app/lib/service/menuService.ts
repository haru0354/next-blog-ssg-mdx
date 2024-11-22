import { getArticlesFromSlugs } from "../getArticlesFromSlugs";
import { getFileContents } from "../getFileContents";

export async function getGlobalMenu() {
  try {
    const globalMenuData = await getFileContents("menu", "globalMenu");

    if (!globalMenuData) {
      console.error("サイドバーのおすすめ記事が取得できませんでした");
      return;
    }

    return globalMenuData;
  } catch (err) {
    console.error("グローバルメニューデータの取得に失敗しました", err);
    return;
  }
}

export async function getLinks() {
  try {
    const linkData = await getFileContents("menu", "link");

    if (!linkData) {
      console.error("サイドバーのリンクデータが取得できませんでした");
      return;
    }

    return linkData;
  } catch (err) {
    console.error("サイドバーのリンクデータの取得に失敗しました", err);
    return;
  }
}

export async function getSideImageTop() {
  try {
    const sideImageTopData = await getFileContents("menu", "sideImageTop");

    if (!sideImageTopData) {
      console.error("サイドバーの上部画像データが取得できませんでした");
      return;
    }

    return sideImageTopData;
  } catch (err) {
    console.error("サイドバーの上部画像データの取得に失敗しました", err);
    return;
  }
}

export async function getSideImageBottom() {
  try {
    const sideImageBottomData = await getFileContents(
      "menu",
      "sideImageBottom"
    );

    if (!sideImageBottomData) {
      console.error("サイドバー下記の画像データが取得できませんでした");
      return;
    }

    return sideImageBottomData;
  } catch (err) {
    console.error("サイドバー下記の画像データの取得に失敗しました", err);
    return;
  }
}

export async function getSideCategoriesMenu() {
  try {
    const sideCategoriesData = await getFileContents("menu", "sideCategories");

    if (!sideCategoriesData) {
      console.error(
        "サイドバーの書き換えるカテゴリデータが取得できませんでした"
      );
      return;
    }

    return sideCategoriesData;
  } catch (err) {
    console.error(
      "サイドバーの書き換えるカテゴリデータの取得に失敗しました",
      err
    );
    return;
  }
}

export async function getRecommendArticles() {
  try {
    const recommendArticleData = await getArticlesFromSlugs(
      "menu",
      "recommendArticle"
    );

    if (!recommendArticleData) {
      console.error("サイドバーのおすすめ記事が取得できませんでした");
      return;
    }

    return recommendArticleData;
  } catch (err) {
    console.error("サイドバーのおすすめ記事データの取得に失敗しました", err);
    return;
  }
}
