import Link from "next/link";
import React from "react";
import SideMenu from "@/app/component/SideMenu";
import { getAllArticles } from "@/app/component/lib/AllArticleService";
import { getFixedPages } from "@/app/component/lib/FixedPageService";
import { Metadata } from "next";
import Breadcrumbs from "@/app/component/contentArea/Breadcrumbs";

export const metadata: Metadata = {
  title: "サイトマップ",
};

const page = async () => {
  const allArticles = await getAllArticles();
  const fixedPages = await getFixedPages();

  return (
    <>
      <div className="flex flex-col flex-wrap w-full md:max-w-[800px] md:min-w-[800px] md:mr-12">
        <div className="content-style px-4">
          <Breadcrumbs isNotParentCategoryPage={false} />
          <h1 className="text-2xl font-semibold mx-2 my-4">サイトマップ</h1>
          <ul>
            {allArticles?.map((allArticle, index) => {
              const isParentCategory =
                index === 0 ||
                allArticle.parentCategoryName !==
                  allArticles[index - 1].parentCategoryName;
              const isChildCategory =
                index === 0 ||
                allArticle.childCategoryName !==
                  allArticles[index - 1].childCategoryName;
              return (
                <React.Fragment key={index}>
                  {isParentCategory && (
                    <li className="text-xl font-semibold pt-4 text-sky-600">
                      <Link href={`/${allArticle.parentCategorySlug}`}>
                        {allArticle.parentCategoryName}
                      </Link>
                    </li>
                  )}
                  {isChildCategory && allArticle.childCategoryName && (
                    <li className="text-lg font-semibold pt-2 mx-4 text-sky-600">
                      <Link
                        href={`/${allArticle.parentCategorySlug}/${allArticle.childCategorySlug}`}
                      >
                        {allArticle.childCategoryName}
                      </Link>
                    </li>
                  )}
                  {allArticle.frontmatter.title && (
                    <li className="list-disc list-inside my-4 mx-10 text-sky-600">
                      <Link
                        href={
                          allArticle.childCategorySlug
                            ? `/${allArticle.parentCategorySlug}/${allArticle.childCategorySlug}/${allArticle.slug}`
                            : `/${allArticle.parentCategorySlug}/${allArticle.slug}`
                        }
                      >
                        {allArticle.frontmatter.title}
                      </Link>
                    </li>
                  )}
                </React.Fragment>
              );
            })}
          </ul>
          <h3 className="my-8 p-2 text-lg font-semibold border-b border-main-gray border-dashed">
            その他のページ
          </h3>
          {fixedPages.map((fixedPage, index) => {
            return (
              <ul key={index}>
                <li className="list-disc list-inside my-4 mx-8 text-sky-600">
                  <Link href={`/${fixedPage?.slug}`}>
                    {fixedPage?.frontmatter.title}
                  </Link>
                </li>
              </ul>
            );
          })}
        </div>
      </div>
      <SideMenu />
    </>
  );
};

export default page;
