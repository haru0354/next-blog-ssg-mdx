import { MetadataRoute } from "next";
import { getFixedPages } from "./component/lib/FixedPageService";
import { getAllArticles } from "./component/lib/AllArticleService";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseURL = "サイトのURL";
  const _lastModified = new Date();

  const fixedPages = await getFixedPages();
  const allArticles = await getAllArticles();


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

  const dynamicPathsAllArticle = allArticles
    .map((allArticle) => {
      if (allArticle.childCategorySlug) {
        return {
          url: `${baseURL}/${allArticle.parentCategorySlug}/${allArticle.childCategorySlug}/${allArticle.slug}`,
          lastModified: new Date(allArticle.frontmatter.date),
        };
      }

      if (!allArticle.childCategorySlug) {
        return {
          url: `${baseURL}/${allArticle.parentCategorySlug}/${allArticle.slug}`,
          lastModified: new Date(allArticle.frontmatter.date),
        };
      }
      return undefined;
    })
    .filter((article) => article !== undefined);

  return [
    ...staticPaths,
    ...dynamicPathsFixedArticle,
    ...dynamicPathsAllArticle,
  ];
}
