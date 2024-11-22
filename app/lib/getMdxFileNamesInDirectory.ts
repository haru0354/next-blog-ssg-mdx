import fs from "fs";
import path from "path";

export function getMdxFileNamesInDirectory(directoryName: string) {
  const directoryPath = path.join(process.cwd(), "mdx-files", directoryName);

  let fileNames: string[] = [];
  try {
    fileNames = fs.readdirSync(directoryPath);
  } catch (err) {
    console.error(
      `ディレクトリ「${directoryPath}」の読み込みに失敗しました:`,
      err
    );
    return [];
  }

  return fileNames.filter((fileName) => fileName.endsWith(".mdx"));
}
