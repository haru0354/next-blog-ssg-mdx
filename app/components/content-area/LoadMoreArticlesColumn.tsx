"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

type LoadMoreArticlesColumnProps = {
  articles: Article[];
};

type Article = {
  slug: string;
  parentCategoryName: string;
  parentCategorySlug: string;
  childCategorySlug?: string;
  frontmatter: {
    title: string;
    date: string;
    description: string;
    eyeCatchName?: string;
    eyeCatchAlt?: string;
  };
};

const LoadMoreArticlesColumn: React.FC<LoadMoreArticlesColumnProps> = ({
  articles,
}) => {
  const [displayedArticles, setDisplayedArticles] = useState<Article[]>(
    articles.slice(0, 4)
  );

  const handleLoadMoreArticles = () => {
    setDisplayedArticles((prevArticles) => {
      const nextArticles = articles.slice(
        prevArticles.length,
        prevArticles.length + 4
      );
      return [...prevArticles, ...nextArticles];
    });
  };

  return (
    <>
      <div className="w-full flex flex-wrap justify-center items-start">
        {displayedArticles?.map((article) => (
          <Link
            href={
              article.childCategorySlug
                ? `/${article.parentCategorySlug}/${article.childCategorySlug}/${article.slug}`
                : `/${article.parentCategorySlug}/${article.slug}`
            }
            key={article.slug}
          >
            <div className="flex flex-wrap justify-center md:flex-nowrap w-full my-2">
              <div className="min-w-[342px] mb-2 md:mb-0">
                <Image
                  src={
                    article.frontmatter.eyeCatchName
                      ? `/thumbnail_webp/${article.frontmatter.eyeCatchName}.webp`
                      : "/thumbnail_webp/no_image.webp"
                  }
                  alt={
                    article.frontmatter.eyeCatchAlt
                      ? `${article.frontmatter.eyeCatchAlt}`
                      : "アイチャッチ画像"
                  }
                  width={367}
                  height={210}
                />
              </div>
              <div className="flex flex-col md:min-w-[442px] py-2 px-4">
                <h3 className="mb-6 font-semibold">
                  {article.frontmatter.title}
                </h3>
                <p>
                  {article.frontmatter.description.length > 80
                    ? `${article.frontmatter.description.slice(0, 80)}...`
                    : article.frontmatter.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {displayedArticles.length < articles.length && (
        <div className="flex justify-center mt-4">
          <button
            onClick={handleLoadMoreArticles}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            更に記事を読み込む
          </button>
        </div>
      )}
    </>
  );
};

export default LoadMoreArticlesColumn;
