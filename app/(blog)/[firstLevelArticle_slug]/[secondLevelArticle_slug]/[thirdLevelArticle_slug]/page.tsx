import { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { useMDXComponents } from "@/mdx-components";
import rehypeSlug from "rehype-slug";
import remarkToc from "remark-toc";

import {
  getThirdLevelArticle,
  getThirdLevelArticles,
} from "@/app/lib/service/thirdLevelArticleService";
import NotFound from "@/app/not-found";
import LeftColumn from "@/app/components/layouts/LeftColumn";
import ContentsArea from "@/app/components/layouts/ContentsArea";
import SideMenu from "@/app/components/side-menu/SideMenu";
import ArticleInArticleList from "@/app/components/content-area/related-articles/ArticleInArticleList";

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

  if (!article || !article.content) {
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
        <ArticleInArticleList
          parentCategorySlug={params.firstLevelArticle_slug}
          childCategorySlug={params.secondLevelArticle_slug}
          articleSlug={params.thirdLevelArticle_slug}
        />
      </LeftColumn>
      <SideMenu
        firstLevelArticle_slug={params.firstLevelArticle_slug}
        categoryName={article.parentCategoryName}
      />
    </>
  );
};

export default Page;
