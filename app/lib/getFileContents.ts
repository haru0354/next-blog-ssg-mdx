import path from "path";
import fs from "fs";
import matter from "gray-matter";

export async function getFileContents(
  directoryPath: string,
  fileName: string,
  isContent: boolean = false
) {
  try {
    const filePath = path.join(directoryPath, `${fileName}.mdx`);

    let fileContents: string;
    try {
      fileContents = await fs.promises.readFile(filePath, "utf8");
    } catch (err) {
      console.error(`${filePath}の読み込みに失敗しました:`, err);
      return null;
    }

    const { data, content } = matter(fileContents);

    return {
      frontmatter: data,
      ...(isContent && { content }),
    };
  } catch (err) {
    console.error("ファイルのデータの取得に失敗しました", err);
    return null;
  }
}
