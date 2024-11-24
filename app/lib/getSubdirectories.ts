import fs from "fs";

export function getSubdirectories(directoryPath: string) {
  try {
    return fs
      .readdirSync(directoryPath, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name);
  } catch (err) {
    console.error(
      `${directoryPath}のディレクトリの読み込みに失敗しました:`,
      err
    );
    return [];
  }
}
