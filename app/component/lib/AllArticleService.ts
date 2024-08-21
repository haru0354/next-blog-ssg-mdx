import path from "path";
import fs from "fs";
import matter from "gray-matter";

type Article = {
  slug: string;
  parentCategorySlug: string;
  childCategorySlug?: string;
  frontmatter: Frontmatter;
};

type Frontmatter = {
  title: string;
  date: string;
  description: string;
  eyeCatchName: string;
  eyeCatchAlt: string;
};

export async function getAllArticles() {
  const articlesDirectory = path.join(process.cwd(), "mdFile", "article");

  const categoryFoldersInArticle = fs
    .readdirSync(articlesDirectory)
    .filter((name) => {
      return fs.statSync(path.join(articlesDirectory, name)).isDirectory();
    });

  const articles: Article[] = [];

  await Promise.all(
    categoryFoldersInArticle.map(async (categoryFolderInArticle) => {
      const parentCategoryPath = path.join(
        articlesDirectory,
        categoryFolderInArticle
      );

      const fileNamesInParentCategory = fs.readdirSync(parentCategoryPath);

      const mdxFileNamesInParentCategory = fileNamesInParentCategory.filter(
        (fileNameInParentCategory) => fileNameInParentCategory.endsWith(".mdx")
      );

      //第2階層の各記事をarticleに含める
      await Promise.all(
        mdxFileNamesInParentCategory.map(
          async (mdxFileNameInParentCategory) => {
            const filePath = path.join(
              parentCategoryPath,
              mdxFileNameInParentCategory
            );
            const fileContents = await fs.promises.readFile(filePath, "utf8");
            const { data } = matter(fileContents);

            articles.push({
              slug: mdxFileNameInParentCategory.replace(".mdx", ""),
              parentCategorySlug: categoryFolderInArticle,
              frontmatter: {
                title: data.title,
                date: data.date,
                description: data.description,
                eyeCatchName: data.eyeCatchName,
                eyeCatchAlt: data.eyeCatchAlt,
              },
            });
          }
        )
      );

      //ここから下記で第3階層の各記事をarticleに含める
      const parentCategoryFoldersInArticle = fs
        .readdirSync(parentCategoryPath)
        .filter((name) => {
          return fs.statSync(path.join(parentCategoryPath, name)).isDirectory();
        });        

      await Promise.all(
        parentCategoryFoldersInArticle.map(
          async (parentCategoryFolderInArticle) => {
            const childCategoryPath = path.join(
              articlesDirectory,
              categoryFolderInArticle,
              parentCategoryFolderInArticle
            );

            const fileNamesInChildCategory = fs.readdirSync(childCategoryPath);

            const mdxFileNamesInChildCategory = fileNamesInChildCategory.filter(
              (fileNameInChildCategory) =>
                fileNameInChildCategory.endsWith(".mdx")
            );

            await Promise.all(
              mdxFileNamesInChildCategory.map(
                async (mdxFileNameInChildCategory) => {
                  const filePath = path.join(
                    childCategoryPath,
                    mdxFileNameInChildCategory
                  );
                  const fileContents = await fs.promises.readFile(
                    filePath,
                    "utf8"
                  );
                  const { data } = matter(fileContents);

                  articles.push({
                    slug: mdxFileNameInChildCategory.replace(".mdx", ""),
                    parentCategorySlug: categoryFolderInArticle,
                    childCategorySlug: parentCategoryFolderInArticle,
                    frontmatter: {
                      title: data.title,
                      date: data.date,
                      description: data.description,
                      eyeCatchName: data.eyeCatchName,
                      eyeCatchAlt: data.eyeCatchAlt,
                    },
                  });
                }
              )
            );
          }
        )
      );
    })
  );

  return articles;
}
