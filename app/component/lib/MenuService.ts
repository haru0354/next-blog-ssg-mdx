import path from "path";
import fs from "fs";
import matter from "gray-matter";

export async function getGlobalMenu() {
  try {
  const globalMenuDirectory = path.join(process.cwd(), "mdFile", "menu");
  const globalMenuFilePath = path.join(globalMenuDirectory, "globalMenu.mdx");

  let globalMenuFileContents: string;
  try {
    globalMenuFileContents = await fs.promises.readFile(
      globalMenuFilePath,
      "utf8"
    );
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
  
} catch (err) {
  console.error("グローバルメニューデータの取得に失敗しました", err);
  return;
}
}

export async function getRecommendArticles() {
  try {
  const globalMenuDirectory = path.join(process.cwd(), "mdFile", "menu");
  const recommendArticleFilePath = path.join(
    globalMenuDirectory,
    "recommendArticle.mdx"
  );

  let recommendArticleFileContents: string;
  try {
    recommendArticleFileContents = await fs.promises.readFile(
      recommendArticleFilePath,
      "utf8"
    );
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
} catch (err) {
  console.error("サイドバーのおすすめ記事データの取得に失敗しました", err);
  return;
}
}

export async function getLinks() {
  try {
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
  } catch (err) {
    console.error("サイドバーのリンクデータの取得に失敗しました", err);
    return;
  }
}

export async function getSideImage() {
  try {
    const globalMenuDirectory = path.join(process.cwd(), "mdFile", "menu");
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
    const globalMenuDirectory = path.join(process.cwd(), "mdFile", "menu");
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
      "mdFile",
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



