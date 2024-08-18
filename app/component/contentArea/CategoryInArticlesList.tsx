import Link from "next/link";
import Image from "next/image";
import { getSecondLevelArticles } from "../lib/SecondLevelArticleService";

type CategoryInArticlesListProps = {
  categoryName: string;
  params: string;
};

const CategoryInArticlesList: React.FC<CategoryInArticlesListProps> = async ({
  params,
  categoryName,
}) => {
  const currentCategory = params;
  const secondLevelArticles = await getSecondLevelArticles();
  const filteredArticles = secondLevelArticles.filter(
    (article) => currentCategory === article.categorySlug
  );

  return (
    <div className="bg-white p-4 mt-8">
      <h2 className="w-full my-4 py-4 px-2 bg-main-gray text-white text-xl font-semibold rounded">
        「{categoryName}」の記事一覧
      </h2>
      <div className="w-full flex flex-wrap justify-center items-start">
        {filteredArticles.map((article) => (
          <Link
            href={`/${article.categorySlug}/${article.slug}`}
            key={article.slug}
          >
            <div className="flex flex-wrap justify-center md:flex-nowrap w-full my-2">
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
              <div className="flex flex-col md:min-w-[442px] py-2 px-4">
                <h3 className="mb-6 font-semibold">
                  {article.frontmatter.title}
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

export default CategoryInArticlesList;
