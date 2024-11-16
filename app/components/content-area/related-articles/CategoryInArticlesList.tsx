import { getAllArticles } from "@/app/lib/allArticleService";
import { shuffleArray } from "@/app/util/shuffleArray";
import LoadMoreArticles from "./LoadMoreArticles";

type CategoryInArticlesListProps = {
  parentCategorySlug: string;
  childCategorySlug?: string;
  categoryName: string;
};

const CategoryInArticlesList: React.FC<CategoryInArticlesListProps> = async ({
  parentCategorySlug,
  childCategorySlug,
  categoryName,
}) => {
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
      {process.env.RELATED_ARTICLES_IN_CATEGORY_COLUMN === "true" ? (
        <LoadMoreArticles articles={shuffledArticles} column={true} />
      ) : (
        <LoadMoreArticles articles={shuffledArticles} column={false} />
      )}
    </div>
  );
};

export default CategoryInArticlesList;
