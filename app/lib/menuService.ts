import path from "path";
import fs from "fs";
import matter from "gray-matter";

export async function getMenuFileContents(fileName: string) {
  try {
    const menuFileDirectory = path.join(process.cwd(), "mdx-files", "menu");
    const menuFile = path.join(menuFileDirectory, `${fileName}.mdx`);

    let menuFileContents: string;
    try {
      menuFileContents = await fs.promises.readFile(menuFile, "utf8");
    } catch (err) {
      console.error(`${menuFile}の読み込みに失敗しました:`, err);
      return;
    }

    const { data } = matter(menuFileContents);

    return {
      frontmatter: data,
    };
  } catch (err) {
    console.error("メニューファイルのデータの取得に失敗しました", err);
    return;
  }
}

export async function getGlobalMenu() {
  try {
    const globalMenuData = await getMenuFileContents("globalMenu");

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

export async function getRecommendArticles() {
  try {
    const recommendArticleData = await getMenuFileContents("recommendArticle");

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

export async function getLinks() {
  try {
    const linkData = await getMenuFileContents("link");

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
    const sideImageTopData = await getMenuFileContents("sideImageTop");

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
    const sideImageBottomData = await getMenuFileContents("sideImageBottom");

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
    const sideCategoriesData = await getMenuFileContents("sideCategories");

    if (!sideCategoriesData) {
      console.error("サイドバーの書き換えるカテゴリデータが取得できませんでした");
      return;
    }

    return sideCategoriesData;
  } catch (err) {
    console.error("サイドバーの書き換えるカテゴリデータの取得に失敗しました", err);
    return;
  }
}
