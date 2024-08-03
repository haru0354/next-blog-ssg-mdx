import Link from "next/link";
import Image from "next/image";
import { getArticles } from "../lib/ArticleService";

const SideNewArticle2 = async () => {
  const articles = await getArticles();
  const sortedArticles = articles.sort((a, b) => {
    const dateA = new Date(a.frontmatter.date);
    const dateB = new Date(b.frontmatter.date);
    return dateB.getTime() - dateA.getTime();
  });

  const filteredArticles = sortedArticles.slice(0, 5);

  return (
    <nav className="bg-white mb-8 border-r border-l border-gray-200">
      <h3 className="w-full p-4 bg-main-gray text-white font-bold">新着記事</h3>
      <ul>
        {filteredArticles.map((article) => {
          return (
            <Link
              href={`/${article.frontmatter.categorySlug}/${article.slug}`}
              key={article.slug}
            >
              <div className="hover:bg-hover-blue pt-4 md:pt-0">
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
                <p className="border-b pt-2 pb-6 px-4 border-gray-200">
                  {article.frontmatter.title.length > 32
                    ? `${article.frontmatter.title.slice(0, 32)}...`
                    : article.frontmatter.title}
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
