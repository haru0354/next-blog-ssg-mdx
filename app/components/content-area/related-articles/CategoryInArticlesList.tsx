import { getAllArticles } from "@/app/lib/allArticleService";
import { shuffleArray } from "@/app/util/shuffleArray";
import LoadMoreArticles from "./LoadMoreArticles";

type CategoryInArticlesListProps = {
  parentCategorySlug: string;
  childCategorySlug?: string;
  categoryName: string;
  categoryContents: boolean;
};

const CategoryInArticlesList: React.FC<CategoryInArticlesListProps> = async ({
  parentCategorySlug,
  childCategorySlug,
  categoryName,
  categoryContents = false,
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

  const articleNumber = process.env.RELATED_ARTICLES_IN_CATEGORY_NUMBER;
  const articleLimit = articleNumber ? parseInt(articleNumber, 10) : 4;

  return (
    <div className="p-4 rounded bg-white">
      {categoryContents ? (
        <h2 className="w-full my-4 py-4 px-2 bg-layout-mainColor text-white text-xl font-semibold rounded">
          「{categoryName}」の記事一覧
        </h2>
      ) : (
        <h1 className="text-2xl font-semibold mx-2 mb-8">
          「{categoryName}」の記事一覧
        </h1>
      )}
      {process.env.RELATED_ARTICLES_IN_CATEGORY_COLUMN === "true" ? (
        <LoadMoreArticles articles={shuffledArticles} column={true} articleLimit={articleLimit}/>
      ) : (
        <LoadMoreArticles articles={shuffledArticles} column={false} articleLimit={articleLimit}/>
      )}
    </div>
  );
};

export default CategoryInArticlesList;
