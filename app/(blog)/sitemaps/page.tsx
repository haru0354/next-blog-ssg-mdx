import Link from "next/link";
import React from "react";
import { getSecondLevelArticles } from "@/app/component/lib/SecondLevelArticleService";
import SideMenu from "@/app/component/SideMenu";

const page = async () => {
  const secondLevelArticles = await getSecondLevelArticles();

  return (
    <>
      <div className="flex flex-col flex-wrap w-full md:max-w-[800px] md:min-w-[800px]  md:mr-6">
        <div className="p-4 bg-white border border-gray-200">
          <h2 className="text-xl font-semibold text-white my-6 p-4 bg-main-gray rounded">
            サイトマップ
          </h2>
          <ul>
            {secondLevelArticles.map((secondLevelArticle, index) => {
              const isFirstCategoryItem =
                index === 0 ||
                secondLevelArticle.categoryName !==
                  secondLevelArticles[index - 1].categoryName;
              return (
                <React.Fragment key={index}>
                  {isFirstCategoryItem && (
                    <li className="text-lg font-semibold pt-4 text-sky-600">
                      <Link href={`/${secondLevelArticle.categorySlug}`}>
                        {secondLevelArticle.categoryName}
                      </Link>
                    </li>
                  )}
                  <li className="list-disc list-inside my-4 mx-6 text-sky-600">
                    <Link
                      href={`/${secondLevelArticle.categorySlug}/${secondLevelArticle.slug}`}
                    >
                      {secondLevelArticle.frontmatter.title}
                    </Link>
                  </li>
                </React.Fragment>
              );
            })}
          </ul>
        </div>
      </div>
      <SideMenu />
    </>
  );
};

export default page;
