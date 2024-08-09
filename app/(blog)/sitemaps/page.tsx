import { getArticles } from "@/app/component/lib/ArticleService";
import Link from "next/link";
import React from "react";

const page = async () => {
  const articles = await getArticles();

  return (
    <div className="p-4 bg-white border border-gray-200">
      <h2 className="text-xl font-semibold text-white my-6 p-4 bg-main-gray rounded">
        サイトマップ
      </h2>
      <ul>
        {articles.map((article, index) => {
          const isFirstCategoryItem =
            index === 0 ||
            article.categoryName !==
              articles[index - 1].categoryName;
          return (
            <React.Fragment key={index}>
              {isFirstCategoryItem && (
                <li className="text-lg font-semibold pt-4 text-sky-600">
                  <Link href={`/${article.categorySlug}`}>
                    {article.categoryName}
                  </Link>
                </li>
              )}
              <li className="list-disc list-inside my-4 mx-6 text-sky-600">
                <Link href={`/${article.categorySlug}/${article.slug}`}>
                  {article.frontmatter.title}
                </Link>
              </li>
            </React.Fragment>
          );
        })}
      </ul>
    </div>
  );
};

export default page;
