import path from "path";
import fs from "fs";
import matter from "gray-matter";

export async function getFirstLevelArticles() {
  const directory = path.join(process.cwd(), "mdFile", "article");

  const fileNames = fs.readdirSync(directory);
  const mdxFileNames = fileNames.filter(fileName => fileName.endsWith(".mdx"));

  if (!mdxFileNames) {
    return null;
  }

  const firstLevelArticles = await Promise.all(
    mdxFileNames.map(async (fileName) => {
      const filePath = path.join(directory, `${fileName}`);
      try {
        const fileContents = await fs.promises.readFile(filePath, "utf8");
        const { data } = matter(fileContents);

        return {
          slug: fileName.replace(".mdx", ""),
          frontmatter: data,
        };
      } catch (error) {
        console.error(`${fileName}のファイルを読み取れませんでした`, error);
        return null;
      }
    })
  );

  return firstLevelArticles;
}