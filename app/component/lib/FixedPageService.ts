import path from "path";
import fs from "fs";
import matter from "gray-matter";

export async function getFixedPages() {
  const fixedPageDirectory = path.join(process.cwd(), "mdFile", "article");

  let fixedPageNames: string[] = [];
  try {
    fixedPageNames = fs.readdirSync(fixedPageDirectory);
  } catch (err) {
    console.error(
      `固定ページディレクトリ「${fixedPageDirectory}」の読み込みに失敗しました:`,
      err
    );
    return [];
  }

  const mdxFixedPageNames = fixedPageNames.filter((fixedPageName) =>
    fixedPageName.endsWith(".mdx")
  );

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
