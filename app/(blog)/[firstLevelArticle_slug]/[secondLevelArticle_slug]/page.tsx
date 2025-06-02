import { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { useMDXComponents } from "@/mdx-components";
import rehypeSlug from "rehype-slug";
import remarkToc from "remark-toc";

import {
  getSecondLevelArticle,
  getSecondLevelArticles,
} from "@/app/lib/service/secondLevelArticleService";
import LeftColumn from "@/app/components/layouts/LeftColumn";
import ContentsArea from "@/app/components/layouts/ContentsArea";
import SideMenu from "@/app/components/side-menu/SideMenu";
import CategoryInArticlesList from "@/app/components/content-area/related-articles/CategoryInArticlesList";
import ArticleInArticleList from "@/app/components/content-area/related-articles/ArticleInArticleList";
import NotFound from "@/app/not-found";

export const generateMetadata = async ({
  params,
}: {
  params: { firstLevelArticle_slug: string; secondLevelArticle_slug: string };
}): Promise<Metadata> => {
  const article = await getSecondLevelArticle(
    params.firstLevelArticle_slug,
    params.secondLevelArticle_slug
  );

  if (!article) {
    return {
      title: "記事がありません",
      description: "記事がありません",
    };
  }

  return {
    title: article.frontmatter.title
      ? article.frontmatter.title
      : article.frontmatter.categoryName,
    description: article.frontmatter.description,
    openGraph: {
      title: article.frontmatter.title,
      description: article.frontmatter.description,
    },
  };
};

export async function generateStaticParams() {
  const articles = await getSecondLevelArticles();

  return articles?.map((article) => ({
    firstLevelArticle_slug: article.categorySlug,
    secondLevelArticle_slug: article.slug,
  }));
}

const Page = async ({
  params,
}: {
  params: { firstLevelArticle_slug: string; secondLevelArticle_slug: string };
}) => {
  const article = await getSecondLevelArticle(
    params.firstLevelArticle_slug,
    params.secondLevelArticle_slug
  );

  if (!article) {
    return <NotFound />;
  }

  const components = useMDXComponents();

  return (
    <>
      <LeftColumn>
        <ContentsArea
          article={article}
          params={params}
          isSecondLevelPage={true}
        />
        {article.content && (
          <MDXRemote
            source={article.content}
            components={components}
            options={{
              mdxOptions: {
                remarkPlugins: [[remarkToc, { maxDepth: 3, heading: "目次" }]],
                rehypePlugins: [rehypeSlug],
              },
            }}
          />
        )}
        {article.frontmatter.categoryName ? (
          <CategoryInArticlesList
            parentCategorySlug={params.firstLevelArticle_slug}
            childCategorySlug={params.secondLevelArticle_slug}
            categoryName={article.frontmatter.categoryName}
            categoryContents={!!article.content}
          />
        ) : (
          <ArticleInArticleList
            parentCategorySlug={params.firstLevelArticle_slug}
            articleSlug={params.secondLevelArticle_slug}
          />
        )}
      </LeftColumn>
      <SideMenu firstLevelArticle_slug={params.firstLevelArticle_slug} />
    </>
  );
};

export default Page;
