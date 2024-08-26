import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import remarkToc from "remark-toc";
import { useMDXComponents } from "@/mdx-components";
import { getTopPageArticle } from "./component/lib/TopPageService";
import Header from "./component/Header";
import Footer from "./component/Footer";
import SideMenu from "./component/SideMenu";
import TopNewArticle from "./component/topPage/TopNewArticle";
import TopCategory from "./component/topPage/TopCategory";
import BackToTopButton from "./component/ui/BackToTopButton ";

export default async function Home() {
  const topPageArticle = await getTopPageArticle();

  const components = useMDXComponents();

  return (
    <>
      {topPageArticle?.content ? (
        <>
          <Header />
          <main className="flex justify-center mb-20">
            <div className="max-w-[1150px] flex flex-wrap justify-center">
              <div className="flex flex-col flex-wrap w-full md:max-w-[800px] md:min-w-[800px] md:mr-12">
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
              </div>
            </div>
            <SideMenu />
            <BackToTopButton />
          </main>
          <Footer />
        </>
      ) : (
        <>
          <Header isTopPage={true} />
          <main className="pb-20">
            <TopNewArticle />
            <TopCategory />
          </main>
          <Footer />
        </>
      )}
    </>
  );
}
