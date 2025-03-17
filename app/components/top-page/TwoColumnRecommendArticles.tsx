import Image from "next/image";

import { getTwoColumnRecommendArticles } from "@/app/lib/service/topPageService";
import NextLinkButton from "../ui/NextLinkButton";

const TwoColumnRecommendArticles = async () => {
  const twoColumnRecommendArticles = await getTwoColumnRecommendArticles();

  if (!twoColumnRecommendArticles) {
    return null;
  }

  if (twoColumnRecommendArticles.display !== true) {
    return null;
  }

  return (
    <>
      <section className="w-full md:py-8 py-2">
        <div className="max-w-[1150px] mx-auto px-4">
          {twoColumnRecommendArticles.articles.map((article) => {
            return (
              <div key={article?.slug}>
                <h2 className="text-2xl font-bold text-center my-8 pb-4 border-b border-dashed border-main-gray">
                  {article?.frontmatter.title.length > 33
                    ? `${article?.frontmatter.title.slice(0, 33)}...`
                    : article?.frontmatter.title}
                </h2>
                <div className="flex flex-wrap w-full justify-center items-center">
                  <div className="flex flex-wrap md:flex-nowrap justify-center w-full mb-8">
                    <div className="flex flex-wrap items-center justify-center md:max-w-[440px] w-full p-4">
                      <Image
                        src={
                          article?.frontmatter.eyeCatchName
                            ? `/thumbnail_webp/${article.frontmatter.eyeCatchName}.webp`
                            : "/thumbnail_webp/no_image.webp"
                        }
                        alt={
                          article?.frontmatter.eyeCatchAlt
                            ? `${article.frontmatter.eyeCatchAlt}`
                            : "アイチャッチ画像"
                        }
                        width={380}
                        height={250}
                      />
                    </div>
                    <div className="w-full md:w-[560px] my-8 p-4 flex flex-col">
                      <p className="flex-grow">
                        {article?.frontmatter.description.length > 140
                          ? `${article?.frontmatter.description.slice(
                              0,
                              140
                            )}...`
                          : article?.frontmatter.description}
                      </p>
                      <NextLinkButton
                        className="mx-auto block"
                        size="normal"
                        color="gray"
                        href={`/${article?.slug}`}
                        key={article?.slug}
                      >
                        記事ページへ
                      </NextLinkButton>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default TwoColumnRecommendArticles;
