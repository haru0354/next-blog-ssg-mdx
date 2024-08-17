import { MetadataRoute } from "next";
import { getFirstLevelArticles } from "./component/lib/FirstLevelArticleService";
import { getSecondLevelArticles } from "./component/lib/SecondLevelArticleService";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseURL = "サイトのURL";
  const _lastModified = new Date();

  const secondLevelArticles = await getSecondLevelArticles();
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
  ];

  const dynamicPathsSecondLevelArticle = secondLevelArticles.map((secondLevelArticle) => {
    return {
      url: `${baseURL}/${secondLevelArticle.categorySlug}/${secondLevelArticle.slug}`,
      lastModified: new Date(secondLevelArticle.frontmatter.date),
    };
  });

  const dynamicPathsFirstLevelArticles = firstLevelArticles.map((firstLevelArticle) => {
    return {
      url: `${baseURL}/${firstLevelArticle?.slug}`,
      lastModified: new Date(firstLevelArticle?.frontmatter.date),
    };
  });

  return [...staticPaths, ...dynamicPathsSecondLevelArticle, ...dynamicPathsFirstLevelArticles];
}
