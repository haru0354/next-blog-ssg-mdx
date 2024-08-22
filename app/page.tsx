import TopNewArticle from "./component/topPage/TopNewArticle";
import TopCategory from "./component/topPage/TopCategory";
import Header from "./component/Header";
import Footer from "./component/Footer";
import { getAllArticles } from "./component/lib/AllArticleService";
import { getFixedPages } from "./component/lib/FixedPageService";

export default async function Home() {
  const allArticles = await getAllArticles()
  const fixedPages = await getFixedPages()

  console.log(fixedPages);
  
  return (
    <>
      <Header isTopPage={true} />
      <main className="pb-20">
        <TopNewArticle />
        <TopCategory />
      </main>
      <Footer />
    </>
  );
}
