import path from "path";
import fs from "fs";
import matter from "gray-matter";

export async function getTopPageArticle() {
  try {
    const topPageFileDirectory = path.join(process.cwd(), "mdFile", "topPage");
    const topPageFile = path.join(topPageFileDirectory, "topPageArticle.mdx");

    let topPageContents: string;
    try {
      topPageContents = await fs.promises.readFile(topPageFile, "utf8");
    } catch (err) {
      console.error(`${topPageFile}の読み込みに失敗しました:`, err);
      return;
    }

    const { data, content } = matter(topPageContents);

    return {
      content: content,
      frontmatter: data,
    };
  } catch (err) {
    console.error("TOPページのコンテンツファイルの取得に失敗しました", err);
    return;
  }
}

export async function getTwoColumnRecommendArticles() {
  try {
    const TopPageRecommendArticles = getTopPageArticles(
      "twoColumnRecommendArticles"
    );
    return TopPageRecommendArticles;
  } catch (err) {
    console.error("TOPページの2カラムのおすすめ記事データの取得に失敗しました", err);
    return;
  }
}

export async function getTopPageRecommendArticles() {
  try {
    const TopPageRecommendArticles = getTopPageArticles(
      "topPageRecommendArticles"
    );
    return TopPageRecommendArticles;
  } catch (err) {
    console.error("TOPページのおすすめ記事データの取得に失敗しました", err);
    return;
  }
}



export async function getTopPageArticles(fileName: string) {
  try {
    const topPageFileDirectory = path.join(process.cwd(), "mdFile", "topPage");
    const topPagesFile = path.join(
      topPageFileDirectory,
      `${fileName}.mdx`
    );

    let topPageArticlesContents: string;
    try {
      topPageArticlesContents = await fs.promises.readFile(
        topPagesFile,
        "utf8"
      );
    } catch (err) {
      console.error(
        `${topPagesFile}の読み込みに失敗しました:`,
        err
      );
      return;
    }

    const { data } = matter(topPageArticlesContents);
    const slugs: string[] = data.slug;
    const display: boolean = data.display;

    const articlesDirectory = path.join(process.cwd(), "mdFile", "article");

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
          console.error("各slugに対応する記事の取得に失敗しました", err);
          return null;
        }
      })
      .filter((article) => article !== null); // 存在する記事のみをフィルタリング

    return {
      display,
      articles,
    };
  } catch (err) {
    console.error("TOPページのおすすめ記事データの取得に失敗しました", err);
    return;
  }
}

