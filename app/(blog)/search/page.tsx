import { getAllArticles } from "@/app/component/lib/AllArticleService";
import SearchResult from "@/app/component/contentArea/SearchResult";
import SideMenu from "@/app/component/SideMenu";
import Breadcrumbs from "@/app/component/contentArea/Breadcrumbs";
import { Metadata } from "next";
import SearchBar from "@/app/component/ui/SearchBar";

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
      <div className="flex flex-col flex-wrap w-full md:max-w-[800px] md:min-w-[800px] md:mr-6">
        <Breadcrumbs isNotParentCategoryPage={false} />
        <SearchBar contentsPage={true} />
        <h1 className="text-2xl font-semibold mx-2 my-4">検索結果</h1>
        <SearchResult allArticles={allArticles} />
      </div>
      <SideMenu />
    </>
  );
};

export default page;
