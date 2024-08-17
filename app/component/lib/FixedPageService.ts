import path from "path";
import fs from "fs";
import matter from "gray-matter";

export async function getFixedPages() {
  const fixedPageDirectory = path.join(process.cwd(), "mdFile", "article");
  const fixedPageNames = fs.readdirSync(fixedPageDirectory);
  const mdxFixedPageNames = fixedPageNames.filter((fixedPageName) =>
    fixedPageName.endsWith(".mdx")
  );

  const fixedPages = await Promise.all(
    mdxFixedPageNames.map(async (mdxFixedPageName) => {
      const filePath = path.join(fixedPageDirectory, `${mdxFixedPageName}`);
      try {
        const fileContents = await fs.promises.readFile(filePath, "utf8");
        const { data } = matter(fileContents);

        return {
          slug: mdxFixedPageName.replace(".mdx", ""),
          frontmatter: data,
        };
      } catch (error) {
        console.error(
          `${mdxFixedPageName}のファイルを読み取れませんでした`,
          error
        );
        return null;
      }
    })
  );

  return fixedPages;
}
