import { getAllArticles } from "@/app/component/lib/AllArticleService";
import Search from "@/app/component/contentArea/Search";
import SideMenu from "@/app/component/SideMenu";
import Breadcrumbs from "@/app/component/contentArea/Breadcrumbs";
import { Metadata } from "next";

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
        <h1 className="text-2xl font-semibold mx-2 my-4">検索結果</h1>
        <Search allArticles={allArticles} />
      </div>
      <SideMenu />
    </>
  );
};

export default page;
