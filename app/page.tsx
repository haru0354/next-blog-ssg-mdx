import TopNewArticle from "./component/topPage/TopNewArticle";
import TopCategory from "./component/topPage/TopCategory";
import Header from "./component/Header";
import Footer from "./component/Footer";
import { getFirstLevelArticle, getFirstLevelArticles } from "./component/lib/FirstLevelArticleService";

export default async function Home() {
  const articles = await getFirstLevelArticles();
  console.log("getFirstLevelArticles", articles);
  const article = await getFirstLevelArticle("articleSample");
  console.log("getFirstLevelArticle", article);

  return (
    <>
      <Header isTopPage={true}/>
      <main className="pb-20">
        <TopNewArticle />
        <TopCategory />
      </main>
      <Footer />
    </>
  );
}
