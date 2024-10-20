import type { Metadata } from "next";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import remarkToc from "remark-toc";
import { useMDXComponents } from "@/mdx-components";
import {
  getSecondLevelArticle,
  getSecondLevelArticles,
} from "@/app/component/lib/SecondLevelArticleService";
import LeftColumn from "@/app/component/layouts/LeftColumn";
import Breadcrumbs from "@/app/component/contentArea/Breadcrumbs";
import ArticleInArticleList from "@/app/component/contentArea/ArticleInArticleList";
import CategoryInArticlesList2Images from "@/app/component/contentArea/CategoryInArticlesList2Images";
import NotFound from "@/app/not-found";
import SideMenu from "@/app/component/SideMenu";

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
        <div className="content-style p-4">
          <Breadcrumbs
            categorySlug={params.firstLevelArticle_slug}
            categoryName={article.categoryName}
            pageTitle={article.frontmatter.title}
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
            parentCategorySlug={params.firstLevelArticle_slug}
            childCategorySlug={params.secondLevelArticle_slug}
            categoryName={article.frontmatter.categoryName}
          />
        ) : (
          <ArticleInArticleList
            parentCategorySlug={params.firstLevelArticle_slug}
            articleSlug={params.secondLevelArticle_slug}
          />
        )}
      </LeftColumn>
      {article.categoryName ? (
        <SideMenu
          firstLevelArticle_slug={params.firstLevelArticle_slug}
          categoryName={article.categoryName}
        />
      ) : (
        <SideMenu />
      )}
    </>
  );
};

export default Page;
