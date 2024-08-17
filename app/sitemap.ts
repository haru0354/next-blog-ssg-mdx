import { MetadataRoute } from "next";
import { getArticles } from "./component/lib/ArticleService";
import { getFirstLevelArticles } from "./component/lib/FirstLevelArticleService";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseURL = "サイトのURL";
  const _lastModified = new Date();

  const Articles = await getArticles();
  const firstLevelArticles = await getFirstLevelArticles();

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
      url: `${baseURL}/${article.categorySlug}/${article.slug}`,
      lastModified: new Date(article.frontmatter.date),
    };
  });

  const dynamicPathsFirstLevelArticles = firstLevelArticles.map((firstLevelArticle) => {
    return {
      url: `${baseURL}/${firstLevelArticle?.slug}`,
      lastModified: new Date(firstLevelArticle?.frontmatter.date),
    };
  });

  return [...staticPaths, ...dynamicPathsArticles, ...dynamicPathsFirstLevelArticles];
}
