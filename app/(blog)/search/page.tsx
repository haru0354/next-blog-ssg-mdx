import { getAllArticles } from "@/app/lib/allArticleService";
import { Metadata } from "next";
import LeftColumn from "@/app/component/layouts/LeftColumn";
import Breadcrumbs from "@/app/component/content-area/Breadcrumbs";
import SearchBar from "@/app/component/ui/SearchBar";
import SearchResult from "@/app/component/content-area/SearchResult";
import SideMenu from "@/app/component/SideMenu";

export const metadata: Metadata = {
  title: "サイト内検索結果",
};

const page = async () => {
  const allArticles = await getAllArticles();

  if (!allArticles) {
    return null;
  }

  return (
    <>
      <LeftColumn>
        <div className="p-4">
          <Breadcrumbs isNotParentCategoryPage={false} addItem="検索結果" />
          <SearchBar contentsPage={true} />
          <h1 className="text-2xl font-semibold mx-2 my-4">検索結果</h1>
          <SearchResult allArticles={allArticles} />
        </div>
      </LeftColumn>
      <SideMenu />
    </>
  );
};

export default page;
