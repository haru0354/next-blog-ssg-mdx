import path from "path";
import fs from "fs";
import matter from "gray-matter";

export async function getFirstLevelArticles() {
  const articleDirectory = path.join(process.cwd(), "mdFile", "article");
  const articleFileNames = fs.readdirSync(articleDirectory);
  const mdxArticleFileNames = articleFileNames.filter((fileName) =>
    fileName.endsWith(".mdx")
  );

  const categoryDirectory = path.join(process.cwd(), "mdFile", "category");
  const categoryFileNames = fs.readdirSync(categoryDirectory);
  const mdxCategoryFileNames = categoryFileNames.filter((fileName) =>
    fileName.endsWith(".mdx")
  );

  if (!mdxCategoryFileNames || !mdxArticleFileNames) {
    return null;
  }

  const articles = await Promise.all(
    mdxArticleFileNames.map(async (mdxArticleFileName) => {
      const filePath = path.join(articleDirectory, `${mdxArticleFileName}`);
      try {
        const fileContents = await fs.promises.readFile(filePath, "utf8");
        const { data } = matter(fileContents);

        return {
          slug: mdxArticleFileName.replace(".mdx", ""),
          frontmatter: data,
        };
      } catch (error) {
        console.error(`${mdxArticleFileName}のファイルを読み取れませんでした`, error);
        return null;
      }
    })
  );

  const categories = await Promise.all(
    mdxCategoryFileNames.map(async (mdxCategoryFileName) => {
      const filePath = path.join(categoryDirectory, `${mdxCategoryFileName}`);
      try {
        const fileContents = await fs.promises.readFile(filePath, "utf8");
        const { data } = matter(fileContents);

        return {
          slug: mdxCategoryFileName.replace(".mdx", ""),
          frontmatter: data,
        };
      } catch (error) {
        console.error(`${mdxCategoryFileName}のファイルを読み取れませんでした`, error);
        return null;
      }
    })
  );

  const FirstLevelArticles = [...articles, ...categories];

  return FirstLevelArticles;
}

export async function getFirstLevelArticle(firstLevelArticle_slug: string) {
  const articleFilePath = path.join(
    process.cwd(),
    "mdFile",
    "article",
    `${firstLevelArticle_slug}.mdx`
  );

  const categoryFilePath = path.join(
    process.cwd(),
    "mdFile",
    "category",
    `${firstLevelArticle_slug}.mdx`
  );

  let fileContents = null;

  try {
    if (fs.existsSync(articleFilePath)) {
      fileContents = fs.readFileSync(articleFilePath, "utf8");
    } else if (fs.existsSync(categoryFilePath)) {
      fileContents = fs.readFileSync(categoryFilePath, "utf8");
    }

    if (!fileContents) {
      return null;
    }

    const { data, content } = matter(fileContents);

    return {
      frontmatter: data,
      content,
    };
  } catch (error) {
    console.error(
      `${firstLevelArticle_slug}.mdxのファイルを読み取れませんでした`,
      error
    );
    return null;
  }
}
