"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

type SearchResultProps = {
  allArticles: Article[];
};

type Article = {
  slug: string;
  parentCategoryName?: string;
  parentCategorySlug?: string;
  childCategoryName?: string;
  childCategorySlug?: string;
  frontmatter: {
    title: string;
    date: string;
    description: string;
    eyeCatchName: string;
    eyeCatchAlt: string;
  };
};

const SearchResult: React.FC<SearchResultProps> = ({ allArticles }) => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);

  useEffect(() => {
    if (query) {
      const lowerCaseQuery = query.toLowerCase();
      const filteredArticles = allArticles.filter(
        (article) =>
          article.frontmatter.title.toLowerCase().includes(lowerCaseQuery) ||
          article.frontmatter.description.toLowerCase().includes(lowerCaseQuery)
      );
      setFilteredArticles(filteredArticles);
    }
  }, [query, allArticles]);

  return (
    <>
      {filteredArticles.length === 0 ? (
        <p>該当する記事が見つかりませんでした。</p>
      ) : (
        <div className="w-full flex flex-wrap justify-center">
          {filteredArticles.map((article) => (
            <Link
              href={
                article.childCategorySlug
                  ? `/${article.parentCategorySlug}/${article.childCategorySlug}/${article.slug}`
                  : `/${article.parentCategorySlug}/${article.slug}`
              }
              key={article.slug}
            >
              <div className="flex flex-wrap justify-center md:flex-nowrap w-full my-2 py-4 md:p-0 hover:bg-hover-blue">
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
                <div className="flex flex-col w-full md:min-w-[422px] py-2 px-4">
                  <h3 className="mb-6 font-semibold">
                    {article.frontmatter.title.length > 32
                      ? `${article.frontmatter.title.slice(0, 32)}...`
                      : article.frontmatter.title}
                  </h3>
                  <p>
                    {article.frontmatter.description.length > 120
                      ? `${article.frontmatter.description.slice(0, 120)}...`
                      : article.frontmatter.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default SearchResult;
