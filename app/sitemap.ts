import { MetadataRoute } from "next";
import { getFirstLevelArticles } from "./component/lib/FirstLevelArticleService";
import { getSecondLevelArticles } from "./component/lib/SecondLevelArticleService";
import { getFixedPages } from "./component/lib/FixedPageService";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseURL = "サイトのURL";
  const _lastModified = new Date();

  const fixedPages = await getFixedPages();
  const secondLevelArticles = await getSecondLevelArticles();
  const firstLevelArticles = await getFirstLevelArticles();

  const staticPaths = [
    {
      url: `${baseURL}`,
      lastModified: _lastModified,
    },
    {
      url: `${baseURL}/sitemaps`,
      lastModified: _lastModified,
    },
  ];

  const dynamicPathsFixedArticle = fixedPages.map((fixedPage) => {
    return {
      url: `${baseURL}/${fixedPage?.slug}`,
      lastModified: new Date(fixedPage?.frontmatter.date),
    };
  });

  const dynamicPathsSecondLevelArticle = secondLevelArticles.map(
    (secondLevelArticle) => {
      return {
        url: `${baseURL}/${secondLevelArticle.categorySlug}/${secondLevelArticle.slug}`,
        lastModified: new Date(secondLevelArticle.frontmatter.date),
      };
    }
  );

  const dynamicPathsFirstLevelArticles = firstLevelArticles.map(
    (firstLevelArticle) => {
      return {
        url: `${baseURL}/${firstLevelArticle?.slug}`,
        lastModified: new Date(firstLevelArticle?.frontmatter.date),
      };
    }
  );

  return [
    ...staticPaths,
    ...dynamicPathsFixedArticle,
    ...dynamicPathsSecondLevelArticle,
    ...dynamicPathsFirstLevelArticles,
  ];
}
