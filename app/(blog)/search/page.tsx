import { Metadata } from "next";
import { getAllArticles } from "@/app/lib/service/allArticleService";
import LeftColumn from "@/app/components/layouts/LeftColumn";
import Breadcrumbs from "@/app/components/content-area/Breadcrumbs";
import SearchBar from "@/app/components/ui/SearchBar";
import SearchResult from "@/app/components/content-area/SearchResult";
import SideMenu from "@/app/components/side-menu/SideMenu";

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
