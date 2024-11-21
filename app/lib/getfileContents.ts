import path from "path";
import fs from "fs";
import matter from "gray-matter";

export async function getFileContents(
  directoryName: string,
  fileName: string,
  isContent: boolean = false
) {
  try {
    const menuFileDirectory = path.join(
      process.cwd(),
      "mdx-files",
      directoryName
    );
    const menuFile = path.join(menuFileDirectory, `${fileName}.mdx`);

    let menuFileContents: string;
    try {
      menuFileContents = await fs.promises.readFile(menuFile, "utf8");
    } catch (err) {
      console.error(`${menuFile}の読み込みに失敗しました:`, err);
      return;
    }

    const { data, content } = matter(menuFileContents);

    return {
      frontmatter: data,
      ...(isContent && { content }),
    };
  } catch (err) {
    console.error("メニューファイルのデータの取得に失敗しました", err);
    return;
  }
}
