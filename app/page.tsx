import TopNewArticle from "./component/topPage/TopNewArticle";
import TopCategory from "./component/topPage/TopCategory";
import Header from "./component/Header";
import Footer from "./component/Footer";
import { getAllArticles } from "./component/lib/AllArticleService";
import { getFixedPages } from "./component/lib/FixedPageService";
import { getAllCategories } from "./component/lib/CategoryService";

export default async function Home() {
  const AllCategories = await getAllCategories()
  console.log(AllCategories);
  
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
