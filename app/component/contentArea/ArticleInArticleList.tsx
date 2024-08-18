import Link from "next/link";
import Image from "next/image";
import { getSecondLevelArticles } from "../lib/SecondLevelArticleService";

type ArticleInArticleListProps = {
  categorySlug: string;
  articleSlug: string;
};

const ArticleInArticleList: React.FC<ArticleInArticleListProps> = async ({
  categorySlug,
  articleSlug,
}) => {
  const secondLevelArticles = await getSecondLevelArticles();

  const filteredSecondLevelArticles = secondLevelArticles.filter(
    (secondLevelArticle) =>
      categorySlug === secondLevelArticle.categorySlug && articleSlug !== secondLevelArticle.slug
  );

  const sortedArticles = filteredSecondLevelArticles.sort((a, b) => {
    const dateA = new Date(a.frontmatter.date);
    const dateB = new Date(b.frontmatter.date);
    return dateB.getTime() - dateA.getTime();
  });

  const latestArticles = sortedArticles.slice(0, 4);

  return (
    <div className="bg-white p-4 mt-8 border border-gray-200">
      <h2 className="w-full my-4 py-5 px-3 bg-main-gray text-white text-lg font-semibold rounded">
        関連記事
      </h2>
      <div className="w-full flex flex-wrap justify-center">
        {latestArticles.map((article) => (
          <Link
            href={`/${article.categorySlug}/${article.slug}`}
            key={article.slug}
          >
            <div className="flex flex-wrap justify-center md:flex-nowrap w-full my-2 py-4 md:p-0 hover:bg-hover-blue">
              <div className="min-w-[342px] mb-2 md:mb-0">
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
                  width={367}
                  height={210}
                />
              </div>
              <div className="flex flex-col w-full md:min-w-[422px] py-2 px-4">
                <h3 className="mb-6 font-semibold">
                  {article.frontmatter.title.length > 32
                    ? `${article.frontmatter.title.slice(0, 32)}...`
                    : article.frontmatter.title}
                </h3>
                <p>
                  {article.frontmatter.description.length > 80
                    ? `${article.frontmatter.description.slice(0, 80)}...`
                    : article.frontmatter.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ArticleInArticleList;
