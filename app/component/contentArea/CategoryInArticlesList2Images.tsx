import Link from "next/link";
import Image from "next/image";
import { getAllArticles } from "../lib/AllArticleService";

type CategoryInArticlesList2ImagesProps = {
  parentCategorySlug: string;
  childCategorySlug?: string;
  categoryName: string;
};

const CategoryInArticlesList2Images: React.FC<
  CategoryInArticlesList2ImagesProps
> = async ({ parentCategorySlug, childCategorySlug, categoryName }) => {
  const allArticles = await getAllArticles();

  const filteredArticles = allArticles.filter((allArticle) =>
    childCategorySlug
      ? childCategorySlug === allArticle.childCategorySlug
      : parentCategorySlug === allArticle.parentCategorySlug
  );

  return (
    <div className="bg-white p-4 mt-8 border border-gray-200">
      <h2 className="w-full my-4 py-4 px-2 bg-main-gray text-white text-xl font-semibold rounded">
        「{categoryName}」の記事一覧
      </h2>
      <div className="w-full flex flex-wrap justify-center md:justify-start items-start">
        {filteredArticles.map((article) => (
          <Link
            href={
              article.childCategorySlug
                ? `/${article.parentCategorySlug}/${article.childCategorySlug}/${article.slug}`
                : `/${article.parentCategorySlug}/${article.slug}`
            }
            key={article.slug}
          >
            <div className="flex flex-col max-w-[367px] md:min-h-[330px] mx-2 my-2 hover:bg-hover-blue">
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
              <h3 className="p-2">
                {article.frontmatter.title.length > 40
                  ? `${article.frontmatter.title.slice(0, 40)}...`
                  : article.frontmatter.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryInArticlesList2Images;
