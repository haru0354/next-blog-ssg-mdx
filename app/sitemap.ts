import { MetadataRoute } from "next";
import { getFixedPages } from "./component/lib/FixedPageService";
import { getAllArticles } from "./component/lib/AQllArticleService";
import { getAllCategories } from "./component/lib/CategoryService";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseURL = process.env.WEBSITE_TITLE;
  const _lastModified = new Date();

  const fixedPages = await getFixedPages();
  const allArticles = (await getAllArticles()) ?? [];
  const allCategories = (await getAllCategories()) ?? [];

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

  const dynamicPathsAllArticle = allArticles.map((allArticle) => {
    if (!("childCategorySlug" in allArticle)) {
      return {
        url: `${baseURL}/${allArticle.parentCategorySlug}/${allArticle.slug}`,
        lastModified: new Date(allArticle.frontmatter.date),
      };
    }

    return {
      url: `${baseURL}/${allArticle.parentCategorySlug}/${allArticle.childCategorySlug}/${allArticle.slug}`,
      lastModified: new Date(allArticle.frontmatter.date),
    };
  });

  const dynamicPathsAllCategories = allCategories
    .filter((allCategory) => allCategory !== undefined && allCategory !== null)
    .map((allCategory) => {
      if (!("parentCategorySlug" in allCategory)) {
        return {
          url: `${baseURL}/${allCategory.slug}`,
          lastModified: new Date(allCategory.frontmatter.date),
        };
      }

      return {
        url: `${baseURL}/${allCategory.slug}/${allCategory.parentCategorySlug}`,
        lastModified: new Date(allCategory.frontmatter.date),
      };
    });

  return [
    ...staticPaths,
    ...dynamicPathsFixedArticle,
    ...dynamicPathsAllArticle,
    ...dynamicPathsAllCategories,
  ];
}
