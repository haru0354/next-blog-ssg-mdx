import Link from "next/link";
import { getArticles } from "../lib/ArticleService";
import Image from "next/image";

const SideNewArticle = async () => {
  const articles = await getArticles();
  const sortedArticles = articles.sort((a, b) => {
    const dateA = new Date(a.frontmatter.date);
    const dateB = new Date(b.frontmatter.date);
    return dateB.getTime() - dateA.getTime();
  });

  const filteredArticles = sortedArticles.slice(0, 5);

  return (
    <nav>
      <p className="w-full mt-8 py-4 px-2 bg-gray-800 text-white font-bold rounded">
        新着記事
      </p>
      <ul>
        {filteredArticles.map((article) => {
          return (
            <Link
              href={`/${article.frontmatter.categorySlug}/${article.slug}`}
              key={article.slug}
            >
              <div className="hover:bg-blue-100">
                <Image
                  src={`/thumbnail_webp/${article.frontmatter.eyeCatchName}.webp`}
                  alt={`${article.frontmatter.eyeCatchAlt}`}
                  width={282}
                  height={100}
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
