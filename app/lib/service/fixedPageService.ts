import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { getMdxFileNamesInDirectory } from "../getMdxFileNamesInDirectory";

export async function getFixedPages() {
  const fixedPageDirectory = path.join(process.cwd(), "mdx-files", "article");

  const mdxFixedPageNames = getMdxFileNamesInDirectory(fixedPageDirectory);

  if (mdxFixedPageNames === null) {
    return null;
  }

  const fixedPages = await Promise.all(
    mdxFixedPageNames.map(async (mdxFixedPageName) => {
      const fixedFilePath = path.join(
        fixedPageDirectory,
        `${mdxFixedPageName}`
      );

      let fixedFileContents: string;
      try {
        fixedFileContents = await fs.promises.readFile(fixedFilePath, "utf8");
      } catch (err) {
        console.error(
          `固定ページ「${fixedFilePath}」の読み込みに失敗しました:`,
          err
        );
        return;
      }

      const { data } = matter(fixedFileContents);

      return {
        slug: mdxFixedPageName.replace(".mdx", ""),
        frontmatter: data,
      };
    })
  );

  return fixedPages;
}
