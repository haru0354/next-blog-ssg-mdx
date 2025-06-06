import Image from "next/image";
import rehypeSlug from "rehype-slug";
import remarkToc from "remark-toc";
import { MDXRemote } from "next-mdx-remote/rsc";
import { useMDXComponents } from "@/mdx-components";

import { getTopPageArticle } from "./lib/service/topPageService";
import SideMenu from "./components/side-menu/SideMenu";
import TopNewArticle from "./components/top-page/TopNewArticle";
import TopCategory from "./components/top-page/TopCategory";
import TopRecommendArticles from "./components/top-page/TopRecommendArticles";
import TwoColumnRecommendArticles from "./components/top-page/TwoColumnRecommendArticles";
import MainLayout from "./components/layouts/MainLayout";
import LeftColumn from "./components/layouts/LeftColumn";

export default async function Home() {
  const topPageArticle = await getTopPageArticle();

  const components = useMDXComponents();

  return (
    <>
      {topPageArticle?.frontmatter.contentPage ? (
        <MainLayout>
          <LeftColumn>
            <div className="content-style p-4">
              <h1 className="text-2xl font-semibold mx-2 my-4">
                {topPageArticle.frontmatter.title}
              </h1>
              {topPageArticle.content &&
                topPageArticle.frontmatter.eyeCatchName && (
                  <Image
                    src={`/image_webp/${topPageArticle.frontmatter.eyeCatchName}.webp`}
                    alt={`${topPageArticle.frontmatter.eyeCatchAlt}`}
                    width={750}
                    height={493}
                    className="mx-auto mb-6"
                  />
                )}
              {topPageArticle.content && (
                <>
                  {topPageArticle.frontmatter.date && (
                    <p className="mx-2 mb-6 text-gray-600 font-sm">
                      投稿日：{topPageArticle.frontmatter.date}
                    </p>
                  )}
                  <MDXRemote
                    source={topPageArticle.content}
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
          </LeftColumn>
          <SideMenu />
        </MainLayout>
      ) : (
        <main>
          <TwoColumnRecommendArticles />
          <TopNewArticle />
          <TopCategory />
          <TopRecommendArticles />
        </main>
      )}
    </>
  );
}
