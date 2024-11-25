import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { getMdxFileNamesInDirectory } from "../getMdxFileNamesInDirectory";
import { getFileContents } from "../getFileContents";
import { getSubdirectories } from "../getSubdirectories";

type Article = {
  slug: string;
  categorySlug: string;
  categoryName: string;
  frontmatter: Frontmatter;
};

type Category = {
  slug: string;
  categorySlug: string;
  frontmatter: Frontmatter;
};

type Frontmatter = {
  title: string;
  date: string;
  description: string;
  eyeCatchName: string;
  eyeCatchAlt: string;
};

export async function getSecondLevelArticles() {
  try {
    const articlesDirectory = path.join(process.cwd(), "mdx-files", "article");
    const parentCategoryDirectories = getSubdirectories(articlesDirectory);

    if (parentCategoryDirectories.length === 0) {
      return null;
    }

    const articles: Article[] = [];

    await Promise.all(
      parentCategoryDirectories.map(async (parentCategoryDirectory) => {
        const categoryPath = path.join(
          articlesDirectory,
          parentCategoryDirectory
        );

        const mdxFileNames = getMdxFileNamesInDirectory(categoryPath);

        if (mdxFileNames === null) {
          return null;
        }

        await Promise.all(
          mdxFileNames.map(async (mdxFileName) => {
            const fileName = mdxFileName.replace(/\.mdx$/, "");

            const secondLevelArticleContents = await getFileContents(
              categoryPath,
              fileName
            );

            if (secondLevelArticleContents === null) {
              return null;
            }

            const categoriesFilesDirectory = path.join(
              process.cwd(),
              "mdx-files",
              "category"
            );

            const categoryContents = await getFileContents(
              categoriesFilesDirectory,
              parentCategoryDirectory
            );

            if (categoryContents === null) {
              return null;
            }

            articles.push({
              slug: mdxFileName.replace(".mdx", ""),
              categorySlug: parentCategoryDirectory,
              categoryName: categoryContents.frontmatter.categoryName,
              frontmatter: {
                title: secondLevelArticleContents.frontmatter.title,
                date: secondLevelArticleContents.frontmatter.date,
                description: secondLevelArticleContents.frontmatter.description,
                eyeCatchName:
                  secondLevelArticleContents.frontmatter.eyeCatchName,
                eyeCatchAlt: secondLevelArticleContents.frontmatter.eyeCatchAlt,
              },
            });
          })
        );
      })
    );

    const categoriesDirectory = path.join(
      process.cwd(),
      "mdx-files",
      "category"
    );

    const childCategoryDirectories = getSubdirectories(categoriesDirectory);

    if (childCategoryDirectories.length === 0) {
      return null;
    }


    const categories: Category[] = [];

    await Promise.all(
      childCategoryDirectories.map(async (childCategoryDirectory) => {
        const parentCategoryPath = path.join(
          categoriesDirectory,
          childCategoryDirectory
        );

        const mdxFileNames = getMdxFileNamesInDirectory(parentCategoryPath);

        if (mdxFileNames === null) {
          return null;
        }

        await Promise.all(
          mdxFileNames.map(async (mdxFileName) => {
            const fileName = mdxFileName.replace(/\.mdx$/, "")

            const childCategoryContents = await getFileContents(
              parentCategoryPath,
              fileName
            );
    
            if (childCategoryContents === null) {
              return null;
            }

            categories.push({
              slug: mdxFileName.replace(".mdx", ""),
              categorySlug: childCategoryDirectory,
              frontmatter: {
                title: childCategoryContents.frontmatter.title,
                date: childCategoryContents.frontmatter.date,
                description: childCategoryContents.frontmatter.description,
                eyeCatchName: childCategoryContents.frontmatter.eyeCatchName,
                eyeCatchAlt: childCategoryContents.frontmatter.eyeCatchAlt,
              },
            });
          })
        );
      })
    );

    const secondLevelArticles = [...articles, ...categories];

    return secondLevelArticles;
  } catch (err) {
    console.error("第2階層の記事一覧の取得に失敗しました", err);
    return;
  }
}

export async function getSecondLevelArticle(
  firstLevelArticle_slug: string,
  secondLevelArticle_slug: string
) {
  try {
    const articleFilePath = path.join(
      process.cwd(),
      "mdx-files",
      "article",
      firstLevelArticle_slug,
      `${secondLevelArticle_slug}.mdx`
    );

    const parentCategoryPath = path.join(
      process.cwd(),
      "mdx-files",
      "category",
    );

    const childCategoryFilePath = path.join(
      process.cwd(),
      "mdx-files",
      "category",
      firstLevelArticle_slug,
      `${secondLevelArticle_slug}.mdx`
    );

    const parentCategoryContents = await getFileContents(
      parentCategoryPath,
      firstLevelArticle_slug
    );

    if (parentCategoryContents === null) {
      return null;
    }

    let fileContents = null;

    if (fs.existsSync(articleFilePath)) {
      try {
        fileContents = fs.readFileSync(articleFilePath, "utf8");
      } catch (error) {
        console.error(
          `記事の${secondLevelArticle_slug}.mdxを読み取れませんでした。`,
          error
        );
        return null;
      }

      const { data, content } = matter(fileContents);

      return {
        frontmatter: data,
        content,
        categoryName: parentCategoryContents.frontmatter.categoryName,
      };
    } else if (fs.existsSync(childCategoryFilePath)) {
      try {
        fileContents = fs.readFileSync(childCategoryFilePath, "utf8");
      } catch (error) {
        console.error(
          `カテゴリの${secondLevelArticle_slug}.mdxを読み取れませんでした。`,
          error
        );
        return null;
      }

      const { data, content } = matter(fileContents);

      return {
        frontmatter: data,
        content,
        categoryName: parentCategoryContents.frontmatter.categoryName,
      };
    } else {
      console.log("記事もカテゴリも見つかりませんでした。");
      return;
    }
  } catch (err) {
    console.error("第2階層のデータ取得に失敗しました", err);
    return;
  }
}
