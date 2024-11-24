import fs from "fs";

export function getMdxFileNamesInDirectory(directoryPath: string) {
  let fileNames: string[] = [];
  try {
    fileNames = fs.readdirSync(directoryPath);
  } catch (err) {
    console.error(
      `ディレクトリ「${directoryPath}」の読み込みに失敗しました:`,
      err
    );
    return null;
  }

  return fileNames.filter((fileName) => fileName.endsWith(".mdx"));
}
