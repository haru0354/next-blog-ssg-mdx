import TopNewArticle from "./component/topPage/TopNewArticle";
import TopCategory from "./component/topPage/TopCategory";
import Header from "./component/Header";
import Footer from "./component/Footer";
import { getFirstLevelArticles } from "./component/lib/FirstLevelArticle";

export default async function Home() {
  const articles = await getFirstLevelArticles();
  console.log("getFirstLevelArticles", articles);


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
