import TopNewArticle from "./component/topPage/TopNewArticle";
import TopCategory from "./component/topPage/TopCategory";
import Header from "./component/Header";
import Footer from "./component/Footer";
import GlobalMenu from "./component/GlobalMenu";

export default function Home() {
  return (
    <>
      <Header isTopPage={true}/>
      <GlobalMenu/>
      <main className="pb-20">
        <TopNewArticle />
        <TopCategory />
      </main>
      <Footer />
    </>
  );
}
