import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import remarkToc from "remark-toc";
import { useMDXComponents } from "@/mdx-components";
import {
  getFirstLevelArticle,
  getFirstLevelArticles,
} from "@/app/lib/service/firstLevelArticleService";
import LeftColumn from "@/app/components/layouts/LeftColumn";
import ContentsArea from "@/app/components/layouts/ContentsArea";
import SideMenu from "@/app/components/side-menu/SideMenu";
import CategoryInArticlesList from "@/app/components/content-area/related-articles/CategoryInArticlesList";
import NotFound from "@/app/not-found";

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

  if (!article) {
    return <NotFound />;
  }

  const components = useMDXComponents();

  return (
    <>
      <LeftColumn>
        <ContentsArea article={article} params={params} />
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
        {article.frontmatter.categoryName && (
          <CategoryInArticlesList
            parentCategorySlug={params.firstLevelArticle_slug}
            categoryName={article.frontmatter.categoryName}
            categoryContents={!!article.content}
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
