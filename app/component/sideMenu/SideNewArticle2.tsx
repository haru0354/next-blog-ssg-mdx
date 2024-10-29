import Link from "next/link";
import Image from "next/image";
import { getAllArticles } from "@/app/lib/allArticleService";

const SideNewArticle2 = async () => {
  const allArticles = await getAllArticles();

  if (!allArticles) {
    return null;
  }

  const sortedArticles = allArticles.sort((a, b) => {
    const dateA = new Date(a.frontmatter.date);
    const dateB = new Date(b.frontmatter.date);
    return dateB.getTime() - dateA.getTime();
  });

  const filteredArticles = sortedArticles.slice(0, 5);

  return (
    <nav className="mb-8 bg-white">
      <h3 className="w-full p-4 border font-bold text-white bg-layout-mainColor border-layout-mainColor">
        新着記事
      </h3>
      <ul>
        {filteredArticles.map((article) => {
          return (
            <Link
              href={
                article.childCategorySlug
                  ? `/${article.parentCategorySlug}/${article.childCategorySlug}/${article.slug}`
                  : `/${article.parentCategorySlug}/${article.slug}`
              }
              key={article.slug}
            >
              <div className="pt-4 md:pt-0 border-r border-l transition-colors duration-300 border-gray-500 hover:bg-hover-blue">
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
                <p className="border-b pt-2 pb-6 px-4 border-gray-500">
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
