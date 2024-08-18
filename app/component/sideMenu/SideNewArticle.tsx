import Link from "next/link";
import Image from "next/image";
import { getSecondLevelArticles } from "../lib/SecondLevelArticleService";

const SideNewArticle = async () => {
  const secondLevelArticles = await getSecondLevelArticles();
  const sortedArticles = secondLevelArticles.sort((a, b) => {
    const dateA = new Date(a.frontmatter.date);
    const dateB = new Date(b.frontmatter.date);
    return dateB.getTime() - dateA.getTime();
  });

  const filteredArticles = sortedArticles.slice(0, 5);

  return (
    <nav>
      <h3 className="w-full mb-8 py-4 px-2 bg-main-gray text-white font-bold rounded">
        新着記事
      </h3>
      <ul>
        {filteredArticles.map((article) => {
          return (
            <Link
              href={`/${article.categorySlug}/${article.slug}`}
              key={article.slug}
            >
              <div className="hover:bg-hover-blue">
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
                  width={298}
                  height={196}
                  className="mx-auto"
                />
                <p className="my-4">{article.frontmatter.title}</p>
              </div>
            </Link>
          );
        })}
      </ul>
    </nav>
  );
};

export default SideNewArticle;
