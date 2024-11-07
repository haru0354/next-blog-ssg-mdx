"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

type LoadMoreArticlesProps = {
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

const LoadMoreArticles: React.FC<LoadMoreArticlesProps> = ({ articles }) => {
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
      <div className="w-full flex flex-wrap justify-center md:justify-start items-start">
        {displayedArticles?.map((article) => (
          <Link
            href={
              article.childCategorySlug
                ? `/${article.parentCategorySlug}/${article.childCategorySlug}/${article.slug}`
                : `/${article.parentCategorySlug}/${article.slug}`
            }
            key={article.slug}
          >
            <div className="flex flex-col max-w-[367px] md:min-h-[330px] mx-2 my-2 hover: transition-colors duration-300 hover:bg-hover-blue">
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
              <h3 className="p-2">
                {article.frontmatter.title.length > 40
                  ? `${article.frontmatter.title.slice(0, 40)}...`
                  : article.frontmatter.title}
              </h3>
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

export default LoadMoreArticles;
