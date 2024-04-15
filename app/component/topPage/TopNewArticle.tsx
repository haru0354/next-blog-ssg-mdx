import Link from "next/link";
import { getArticles } from "../lib/ArticleService";
import Image from "next/image";

const TopNewArticle = async () => {
  const articles = await getArticles();
  const sortedArticles = articles.sort((a, b) => {
    const dateA = new Date(a.frontmatter.date);
    const dateB = new Date(b.frontmatter.date);
    return dateB.getTime() - dateA.getTime();
  });

  const filteredArticles = sortedArticles.slice(0, 6);

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
        <div className="flex flex-wrap w-full justify-center">
          {filteredArticles.map((article) => {
            return (
              <Link
                href={`/${article.frontmatter.categorySlug}/${article.slug}`}
                key={article.slug}
              >
                <div className="flex flex-col justify-center items-center mx-2 mb-8 md:max-w-[320px] md:min-w-[320px]">
                  <Image
                    src={`/image_webp/${article.frontmatter.eyeCatchName}.webp`}
                    alt={`${article.frontmatter.eyeCatchAlt}`}
                    width={320}
                    height={230}
                  />
                  <h3 className="p-4">{article.frontmatter.title}</h3>
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
