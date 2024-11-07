import type { Metadata } from "next";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import remarkToc from "remark-toc";
import { useMDXComponents } from "@/mdx-components";
import {
  getFirstLevelArticle,
  getFirstLevelArticles,
} from "@/app/lib/firstLevelArticleService";
import LeftColumn from "@/app/components/layouts/LeftColumn";
import Breadcrumbs from "@/app/components/content-area/Breadcrumbs";
import NotFound from "@/app/not-found";
import SideMenu from "@/app/components/SideMenu";
import CategoryInArticlesList from "@/app/components/content-area/CategoryInArticlesList";

export const generateMetadata = async ({
  params,
}: {
  params: { firstLevelArticle_slug: string };
}): Promise<Metadata> => {
  const article = await getFirstLevelArticle(params.firstLevelArticle_slug);

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
  const firstLevelArticles = await getFirstLevelArticles();

  if (!firstLevelArticles) {
    return [];
  }

  return firstLevelArticles
    .filter(
      (firstLevelArticle) =>
        firstLevelArticle !== null && firstLevelArticle !== undefined
    )
    .map((firstLevelArticle) => ({
      firstLevelArticle_slug: firstLevelArticle.slug,
    }));
}

const Page = async ({
  params,
}: {
  params: { firstLevelArticle_slug: string };
}) => {
  const article = await getFirstLevelArticle(params.firstLevelArticle_slug);

  if (!article || article === null) {
    return <NotFound />;
  }

  const components = useMDXComponents();

  return (
    <>
      <LeftColumn>
        <div className="content-style p-4">
          <Breadcrumbs
            categoryName={article.frontmatter.categoryName}
            pageTitle={article.frontmatter.title}
            isNotParentCategoryPage={false}
          />
          <h1 className="text-2xl font-semibold mx-2 my-4">
            {article.frontmatter.title}
          </h1>
          {article.content && article.frontmatter.eyeCatchName && (
            <Image
              src={`/image_webp/${article.frontmatter.eyeCatchName}.webp`}
              alt={`${article.frontmatter.eyeCatchAlt}`}
              width={750}
              height={493}
              className="mx-auto mb-6"
            />
          )}
          {article.content && (
            <>
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
                    remarkPlugins: [
                      [remarkToc, { maxDepth: 3, heading: "目次" }],
                    ],
                    rehypePlugins: [rehypeSlug],
                  },
                }}
              />
            </>
          )}
        </div>
        {article.frontmatter.categoryName && (
          <CategoryInArticlesList
            parentCategorySlug={params.firstLevelArticle_slug}
            categoryName={article.frontmatter.categoryName}
          />
        )}
      </LeftColumn>
      {article.frontmatter.categoryName ? (
        <SideMenu
          firstLevelArticle_slug={params.firstLevelArticle_slug}
          categoryName={article.frontmatter.categoryName}
        />
      ) : (
        <SideMenu />
      )}
    </>
  );
};

export default Page;
