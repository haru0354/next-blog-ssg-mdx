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

    const { content } = matter(topPageContents);

    return content;
  } catch (err) {
    console.error("TOPページのコンテンツファイルの取得に失敗しました", err);
    return;
  }
}
