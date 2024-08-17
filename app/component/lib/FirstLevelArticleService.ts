import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { getFixedPages } from "./FixedPageService";
import { getMainCategories } from "./CategoryService";

export async function getFirstLevelArticles() {
  const fixedPages = await getFixedPages()
  const categories = await getMainCategories()

  const FirstLevelArticles = [...fixedPages, ...categories];

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
