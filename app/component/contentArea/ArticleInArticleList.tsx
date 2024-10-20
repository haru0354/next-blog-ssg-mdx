import Link from "next/link";
import Image from "next/image";
import { getAllArticles } from "../lib/AllArticleService";

type ArticleInArticleListProps = {
  parentCategorySlug: string;
  childCategorySlug?: string;
  articleSlug: string;
};

const ArticleInArticleList: React.FC<ArticleInArticleListProps> = async ({
  parentCategorySlug,
  childCategorySlug,
  articleSlug,
}) => {
  const allArticles = await getAllArticles();

  const filteredAllArticles = allArticles?.filter((allArticle) =>
    childCategorySlug
      ? childCategorySlug === allArticle.childCategorySlug &&
        articleSlug !== allArticle.slug
      : parentCategorySlug === allArticle.parentCategorySlug &&
        articleSlug !== allArticle.slug
  );

  const latestArticles = filteredAllArticles?.slice(0, 4);

  if (!latestArticles || latestArticles.length === 0) {
    return null;
  }

  return (
    <div className="p-4 rounded bg-white">
      <h2 className="w-full my-4 py-5 px-3 bg-main-gray text-white text-lg font-semibold rounded">
        関連記事
      </h2>
      <div className="w-full flex flex-wrap justify-center">
        {latestArticles.map((article) => (
          <Link
            href={
              article.childCategorySlug
                ? `/${article.parentCategorySlug}/${article.childCategorySlug}/${article.slug}`
                : `/${article.parentCategorySlug}/${article.slug}`
            }
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
                  {article.frontmatter.description.length > 110
                    ? `${article.frontmatter.description.slice(0, 110)}...`
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
