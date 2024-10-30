import { Metadata } from "next";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import remarkToc from "remark-toc";
import { useMDXComponents } from "@/mdx-components";
import {
  getThirdLevelArticle,
  getThirdLevelArticles,
} from "@/app/lib/thirdLevelArticleService";
import LeftColumn from "@/app/component/layouts/LeftColumn";
import Breadcrumbs from "@/app/component/content-area/Breadcrumbs";
import ArticleInArticleList from "@/app/component/content-area/ArticleInArticleList";
import CategoryInArticlesList2Images from "@/app/component/content-area/CategoryInArticlesList2Images";
import NotFound from "@/app/not-found";
import SideMenu from "@/app/component/SideMenu";

export const generateMetadata = async ({
  params,
}: {
  params: {
    firstLevelArticle_slug: string;
    secondLevelArticle_slug: string;
    thirdLevelArticle_slug: string;
  };
}): Promise<Metadata> => {
  const article = await getThirdLevelArticle(
    params.firstLevelArticle_slug,
    params.secondLevelArticle_slug,
    params.thirdLevelArticle_slug
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
  const articles = await getThirdLevelArticles();

  return articles?.map((article) => ({
    firstLevelArticle_slug: article.parentCategorySlug,
    secondLevelArticle_slug: article.childCategorySlug,
    thirdLevelArticle_slug: article.slug,
  }));
}

const Page = async ({
  params,
}: {
  params: {
    firstLevelArticle_slug: string;
    secondLevelArticle_slug: string;
    thirdLevelArticle_slug: string;
  };
}) => {
  const article = await getThirdLevelArticle(
    params.firstLevelArticle_slug,
    params.secondLevelArticle_slug,
    params.thirdLevelArticle_slug
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
            categoryName={article.parentCategoryName}
            childCategorySlug={params.secondLevelArticle_slug}
            childCategoryName={article.childCategoryName}
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
            categoryName={article.frontmatter.categoryName}
          />
        ) : (
          <ArticleInArticleList
            parentCategorySlug={params.firstLevelArticle_slug}
            childCategorySlug={params.secondLevelArticle_slug}
            articleSlug={params.thirdLevelArticle_slug}
          />
        )}
      </LeftColumn>
      <SideMenu
        firstLevelArticle_slug={params.firstLevelArticle_slug}
        categoryName={article.parentCategoryName}
      />
    </>
  );
};

export default Page;
