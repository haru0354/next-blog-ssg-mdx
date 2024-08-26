import TopNewArticle from "./component/topPage/TopNewArticle";
import TopCategory from "./component/topPage/TopCategory";
import Header from "./component/Header";
import Footer from "./component/Footer";
import { getTopPageArticle } from "./component/lib/TopPageService";

export default async function Home() {
  const topPageArticle = await getTopPageArticle()
  console.log(topPageArticle);
  
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
