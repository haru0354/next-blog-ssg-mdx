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

export async function getTopPageRecommendArticles() {
  try {
    const topPageFileDirectory = path.join(process.cwd(), "mdFile", "topPage");
    const topPageRecommendArticlesFile = path.join(
      topPageFileDirectory,
      "topPageRecommendArticles.mdx"
    );

    let topPageRecommendArticlesContents: string;
    try {
      topPageRecommendArticlesContents = await fs.promises.readFile(
        topPageRecommendArticlesFile,
        "utf8"
      );
    } catch (err) {
      console.error(
        `${topPageRecommendArticlesFile}の読み込みに失敗しました:`,
        err
      );
      return;
    }

    const { data } = matter(topPageRecommendArticlesContents);
    const slugs: string[] = data.slug;

    const articlesDirectory = path.join(process.cwd(), "mdFile", "article");

    const topPageRecommendArticles = slugs
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
            }
          } else {
            console.error(`ファイルの読み込みに失敗しました: ${slug}`);
            return null;
          }
        } catch (err) {
          console.error("各slugに対応する記事の取得に失敗しました", err);
          return null;
        }
      })
      .filter((topPageRecommendArticle) => topPageRecommendArticle !== null); // 存在する記事のみをフィルタリング

    return topPageRecommendArticles;
  } catch (err) {
    console.error("TOPページのおすすめ記事データの取得に失敗しました", err);
    return;
  }
}
