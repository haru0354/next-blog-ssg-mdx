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
    
    return linkData
  } catch (err) {
    console.error("サイドバーのリンクデータの取得に失敗しました", err);
    return;
  }
}

export async function getSideImage() {
  try {
    const globalMenuDirectory = path.join(process.cwd(), "mdx-files", "menu");
    const sideImageFilePath = path.join(globalMenuDirectory, "sideImage.mdx");

    let sideImageFileContents: string;
    try {
      sideImageFileContents = await fs.promises.readFile(
        sideImageFilePath,
        "utf8"
      );
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
  } catch (err) {
    console.error("サイドバーの画像データの取得に失敗しました", err);
    return;
  }
}

export async function getSideImageBottom() {
  try {
    const globalMenuDirectory = path.join(process.cwd(), "mdx-files", "menu");
    const sideImageFilePath = path.join(
      globalMenuDirectory,
      "sideImageBottom.mdx"
    );

    let sideImageFileContents: string;
    try {
      sideImageFileContents = await fs.promises.readFile(
        sideImageFilePath,
        "utf8"
      );
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
  } catch (err) {
    console.error("サイドバー下記の画像データの取得に失敗しました", err);
    return;
  }
}

export async function getSideCategoriesMenu() {
  try {
    const sideCategoriesFilePath = path.join(
      process.cwd(),
      "mdx-files",
      "menu",
      "sideCategoriesMenu.mdx"
    );

    let sideCategoryFileContents: string;
    try {
      sideCategoryFileContents = await fs.promises.readFile(
        sideCategoriesFilePath,
        "utf8"
      );
    } catch (err) {
      console.error(
        `カテゴリファイル「${sideCategoriesFilePath}」の読み込みに失敗しました:`,
        err
      );
      return;
    }

    const { data } = matter(sideCategoryFileContents);

    return {
      display: data.display,
      items: data.items,
    };
  } catch (err) {
    console.error("子カテゴリ一覧の取得に失敗しました", err);
    return;
  }
}
