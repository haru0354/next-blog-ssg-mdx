import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { getFileContents } from "./getFileContents";

export async function getArticlesFromSlugs(
  fileName: string,
  directoryName: string
) {
  try {
    const fileContents = await getFileContents(directoryName, fileName);

    if (!fileContents) {
      console.error("ファイルデータが取得できませんでした");
      return;
    }

    const { frontmatter } = fileContents;

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
