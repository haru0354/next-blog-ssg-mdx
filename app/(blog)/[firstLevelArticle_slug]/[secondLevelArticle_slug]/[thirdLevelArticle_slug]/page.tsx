import { getThirdLevelArticles } from "@/app/component/lib/ThirdLevelArticleService";

export async function generateStaticParams() {
    const articles = await getThirdLevelArticles();
  
    return articles.map((article) => ({
      firstLevelArticle_slug: article.parentCategorySlug,
      secondLevelArticle_slug: article.childCategorySlug,
      thirdLevelArticle_slug: article.slug,
    }));
  }

const page = () => {
  return (
    <div>page3</div>
  )
}

export default page