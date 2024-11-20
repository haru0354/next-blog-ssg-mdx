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

export async function getArticlesFromSlugsInMenu(fileName: string) {
  try {
    const menuFileContents  = await getMenuFileContents(fileName);

    if (!menuFileContents ) {
      console.error("ファイルデータが取得できませんでした");
      return;
    }

    const { frontmatter } = menuFileContents;

    const slugs: string[] = frontmatter.slug;
    const display: boolean = frontmatter.display;

    const articlesDirectory = path.join(process.cwd(), "mdx-files", "article");

    const articles = slugs
      .map((slug) => {
        try {
          let deleteSlashSlug = slug.startsWith("/") ? slug.slice(1) : slug;
          deleteSlashSlug = deleteSlashSlug.endsWith("/")
            ? deleteSlashSlug.slice(0, -1)
            : deleteSlashSlug;

          const slugParts = deleteSlashSlug.split("/");

          const articleFileName = slugParts.pop() + ".mdx";
          const articleFileDirectory = path.join(
            articlesDirectory,
            ...slugParts
          );

          const filePath = path.join(articleFileDirectory, articleFileName);

          if (fs.existsSync(filePath)) {
            const fileContents = fs.readFileSync(filePath, "utf8");
            const { data } = matter(fileContents);
            return {
              frontmatter: data,
              slug: deleteSlashSlug,
            };
          } else {
            console.error(`ファイルの読み込みに失敗しました: ${slug}`);
            return null;
          }
        } catch (err) {
          console.error("各slugに対応する記事を読み込めませんでした", err);
          return null;
        }
      })
      .filter((article) => article !== null); 

    return {
      display,
      articles,
    };
  } catch (err) {
    console.error("slugから記事の取得に失敗しました", err);
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
