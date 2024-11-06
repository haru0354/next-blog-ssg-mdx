import { getAllArticles } from "@/app/lib/allArticleService";
import { shuffleArray } from "@/app/util/shuffleArray";
import LoadMoreArticles from "./LoadMoreArticles";

type CategoryInArticlesList2ImagesProps = {
  parentCategorySlug: string;
  childCategorySlug?: string;
  categoryName: string;
};

const CategoryInArticlesList2Images: React.FC<
  CategoryInArticlesList2ImagesProps
> = async ({ parentCategorySlug, childCategorySlug, categoryName }) => {
  const allArticles = await getAllArticles();

  if (!allArticles) {
    return null;
  }

  const filteredArticles = allArticles?.filter((allArticle) =>
    childCategorySlug
      ? childCategorySlug === allArticle.childCategorySlug
      : parentCategorySlug === allArticle.parentCategorySlug
  );

  const shuffledArticles = shuffleArray(filteredArticles);

  return (
    <div className="p-4 rounded bg-white">
      <h2 className="w-full my-4 py-4 px-2 bg-layout-mainColor text-white text-xl font-semibold rounded">
        「{categoryName}」の記事一覧
      </h2>
      <LoadMoreArticles articles={shuffledArticles} />
    </div>
  );
};

export default CategoryInArticlesList2Images;
