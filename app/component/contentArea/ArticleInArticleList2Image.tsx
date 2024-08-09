import Link from "next/link";
import Image from "next/image";
import { getArticles } from "../lib/ArticleService";

type ArticleInArticleListProps = {
  categorySlug: string;
  articleSlug: string;
};

const ArticleInArticleList: React.FC<ArticleInArticleListProps> = async ({
  categorySlug,
  articleSlug,
}) => {
  const Articles = await getArticles();

  const filteredArticles = Articles.filter(
    (article) =>
      categorySlug === article.categorySlug && articleSlug !== article.slug
  );

  const sortedArticles = filteredArticles.sort((a, b) => {
    const dateA = new Date(a.frontmatter.date);
    const dateB = new Date(b.frontmatter.date);
    return dateB.getTime() - dateA.getTime();
  });

  const latestArticles = sortedArticles.slice(0, 4);

  return (
    <div className="bg-white p-4 mt-8 border border-gray-200">
      <h2 className="w-full my-4 py-4 px-2 bg-main-gray text-white text-xl font-semibold rounded">
        関連記事
      </h2>
      <div className="w-full flex flex-wrap justify-center">
        {latestArticles.map((article) => (
          <Link
            href={`/${article.categorySlug}/${article.slug}`}
            key={article.slug}
          >
            <div className="flex flex-col max-w-[367px] md:min-h-[330px] mx-2 my-4 hover:bg-hover-blue">
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
              <h3 className="my-4">
                {article.frontmatter.title.length > 32
                  ? `${article.frontmatter.title.slice(0, 32)}...`
                  : article.frontmatter.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ArticleInArticleList;
