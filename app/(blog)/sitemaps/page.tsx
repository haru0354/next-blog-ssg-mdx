import Link from "next/link";
import React from "react";
import { getAllArticles } from "@/app/lib/allArticleService";
import { getFixedPages } from "@/app/lib/fixedPageService";
import { Metadata } from "next";
import LeftColumn from "@/app/component/layouts/LeftColumn";
import SideMenu from "@/app/component/SideMenu";
import Breadcrumbs from "@/app/component/content-area/Breadcrumbs";

export const metadata: Metadata = {
  title: "サイトマップ",
};

const page = async () => {
  const allArticles = await getAllArticles();
  const fixedPages = await getFixedPages();

  return (
    <>
      <LeftColumn>
        <div className="content-style p-4">
          <Breadcrumbs isNotParentCategoryPage={false} addItem="サイトマップ" />
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
      </LeftColumn>
      <SideMenu />
    </>
  );
};

export default page;
