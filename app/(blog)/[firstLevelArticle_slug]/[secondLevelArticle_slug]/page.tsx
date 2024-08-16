import type { Metadata } from "next";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import remarkToc from "remark-toc";
import { useMDXComponents } from "@/mdx-components";
import { getArticle, getArticles } from "@/app/component/lib/ArticleService";
import ArticleInArticleList from "@/app/component/contentArea/ArticleInArticleList";
import Breadcrumbs from "@/app/component/contentArea/Breadcrumbs";
import {
  getSecondLevelArticle,
  getSecondLevelArticles,
} from "@/app/component/lib/SecondLevelArticleService";
import CategoryInArticlesList2Images from "@/app/component/contentArea/CategoryInArticlesList2Images";


export const generateMetadata = async ({
  params,
}: {
  params: { article_slug: string; category_slug: string };
}): Promise<Metadata> => {
  const article = await getArticle(params.category_slug, params.article_slug);

  return {
    title: article.frontmatter.title,
    description: article.frontmatter.description,
    openGraph: {
      title: article.frontmatter.title,
      description: article.frontmatter.description,
    },
  };
};

export async function generateStaticParams() {
  const articles = await getSecondLevelArticles();

  return articles.map((article) => ({
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
  const components = useMDXComponents();

  return (
    <>
      <div className="content-style p-4 bg-white border border-gray-200">
        <Breadcrumbs
          categorySlug={params.firstLevelArticle_slug}
          categoryName={article.categoryName}
        />
        <h1 className="text-2xl font-semibold mx-2 my-4">
          {article.frontmatter.title}
        </h1>
        {article.frontmatter.eyeCatchAlt &&
          article.frontmatter.eyeCatchName && (
            <Image
              src={`/image_webp/${article.frontmatter.eyeCatchName}.webp`}
              alt={`${article.frontmatter.eyeCatchAlt}`}
              width={750}
              height={493}
              className="mx-auto mb-6"
            />
          )}
        {article.frontmatter.date && (
          <p className="mx-2 mb-6 text-gray-600 font-sm">
            投稿日：{article.frontmatter.date}
          </p>
        )}
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
      </div>
      {article.frontmatter.categoryName ? (
        <CategoryInArticlesList2Images
          params={params.firstLevelArticle_slug}
          categoryName={article.frontmatter.categoryName}
        />
      ) : (
        <ArticleInArticleList
          categorySlug={params.firstLevelArticle_slug}
          articleSlug={params.secondLevelArticle_slug}
        />
      )}
    </>
  );
};

export default Page;
