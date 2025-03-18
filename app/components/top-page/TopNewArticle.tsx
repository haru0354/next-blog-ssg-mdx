import Link from "next/link";
import Image from "next/image";
import { getAllArticles } from "@/app/lib/service/allArticleService";

const TopNewArticle = async () => {
  const allArticles = await getAllArticles();

  if (!allArticles) {
    return null;
  }

  const sortedArticles = allArticles.sort((a, b) => {
    const dateA = new Date(a.frontmatter.date);
    const dateB = new Date(b.frontmatter.date);
    return dateB.getTime() - dateA.getTime();
  });

  const articleNumber = process.env.TOP_NEW_ARTICLE_NUMBER;
  const articleLimit = articleNumber ? parseInt(articleNumber, 10) : 6;
  const filteredArticles = sortedArticles.slice(0, articleLimit);

  return (
    <section className="bg-white w-full md:py-8 py-2">
      <div className="max-w-[1150px] mx-auto px-4">
        <div className="flex items-center mb-10">
          <span className="flex-grow h-1 w-5 md:w-0 mr-1 md:mr-4 bg-gradient-to-l from-gray-600 to-transparent"></span>
          <h2 className="text-2xl md:text-3xl py-0 my-5 text-gray-700 text-center font-bold bg-transparent">
            新着記事
          </h2>
          <span className="flex-grow h-1 w-5 md:w-0 ml-2 md:mr-4 bg-gradient-to-r from-gray-600 to-transparent"></span>
        </div>
        <div className="flex flex-wrap justify-center w-full">
          {filteredArticles.map((article) => {
            return (
              <Link
                href={
                  article.childCategorySlug
                    ? `/${article.parentCategorySlug}/${article.childCategorySlug}/${article.slug}`
                    : `/${article.parentCategorySlug}/${article.slug}`
                }
                key={article.slug}
              >
                <div className="flex flex-col justify-start min-h-[300px] md:max-w-[320px] items-center mx-2 mb-8 shadow-lg rounded border border-gray-300 bg-white transition-all duration-300 hover:scale-105 hover:bg-layout-hoverColor">
                  <Image
                    src={
                      article.frontmatter.eyeCatchName
                        ? `/thumbnail_webp/${article.frontmatter.eyeCatchName}.webp`
                        : "/thumbnail_webp/no_image.webp"
                    }
                    alt={
                      article.frontmatter.eyeCatchAlt
                        ? `${article.frontmatter.eyeCatchAlt}`
                        : "アイチャッチ画像"
                    }
                    width={320}
                    height={230}
                    className="rounded-t"
                  />
                  <h3 className="w-full text-center p-4">
                    {article.frontmatter.title.length > 34
                      ? `${article.frontmatter.title.slice(0, 34)}...`
                      : article.frontmatter.title}
                  </h3>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TopNewArticle;
