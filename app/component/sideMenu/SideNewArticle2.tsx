import Link from "next/link";
import { getArticles } from "../lib/ArticleService";
import Image from "next/image";

const SideNewArticle2 = async () => {
  const articles = await getArticles();
  const sortedArticles = articles.sort((a, b) => {
    const dateA = new Date(a.frontmatter.date);
    const dateB = new Date(b.frontmatter.date);
    return dateB.getTime() - dateA.getTime();
  });

  const filteredArticles = sortedArticles.slice(0, 5);

  return (
    <nav className="bg-white mt-8 border-r border-l border-gray-200">
      <p className="w-full p-4 bg-gray-800 text-white font-bold">新着記事</p>
      <ul>
        {filteredArticles.map((article) => {
          return (
            <Link
              href={`/${article.frontmatter.categorySlug}/${article.slug}`}
              key={article.slug}
            >
              <div className="hover:bg-blue-100 pt-4 md:pt-0">
                <Image
                  src={`/thumbnail_webp/${article.frontmatter.eyeCatchName}.webp`}
                  alt={`${article.frontmatter.eyeCatchAlt}`}
                  width={298}
                  height={196}
                  className="mx-auto"
                />
                <p className="border-b pt-2 pb-6 px-4 border-gray-200">
                  {article.frontmatter.title}
                </p>
              </div>
            </Link>
          );
        })}
      </ul>
    </nav>
  );
};

export default SideNewArticle2;
