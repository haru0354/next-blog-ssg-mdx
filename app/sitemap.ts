import { MetadataRoute } from "next";
import { getCategories } from "./component/lib/CategoryService";
import { getArticles } from "./component/lib/ArticleService";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseURL = "サイトのURL";
  const _lastModified = new Date();

  const Articles = await getArticles();
  const categories = await getCategories();

  const staticPaths = [
    {
      url: `${baseURL}`,
      lastModified: _lastModified,
    },
    {
      url: `${baseURL}/privacypolicy`,
      lastModified: _lastModified,
    },
    {
      url: `${baseURL}/memorybook`,
      lastModified: _lastModified,
    },
  ];

  const dynamicPathsArticles = Articles.map((article) => {
    return {
      url: `${baseURL}/${article.frontmatter.categorySlug}/${article.slug}`,
      lastModified: new Date(article.frontmatter.date),
    };
  });

  const dynamicPathsCategories = categories.map((category) => {
    return {
      url: `${baseURL}/${category.slug}`,
      lastModified: new Date(category.frontmatter.date),
    };
  });

  
  return [...staticPaths, ...dynamicPathsArticles, ...dynamicPathsCategories];
}
