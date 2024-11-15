import Link from "next/link";
import Image from "next/image";
import { getAllArticles } from "@/app/lib/allArticleService";

type SideNewArticleProps = {
  border?: boolean;
};

const SideNewArticle: React.FC<SideNewArticleProps> = async ({
  border = false,
}) => {
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

  const h3BorderDesign = border ? "" : "rounded";
  const divBorderDesign = border
    ? "md:pt-0 border-r border-b border-l border-gray-500"
    : "";

  return (
    <nav className="mb-8">
      <h3
        className={`w-full p-4 bg-layout-mainColor text-white font-bold ${h3BorderDesign}`}
      >
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
              <div
                className={`pt-4 bg-white hover:transition-colors duration-300 hover:bg-hover-blue ${divBorderDesign}`}
              >
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
                <p className="p-4">{article.frontmatter.title}</p>
              </div>
            </Link>
          );
        })}
      </ul>
    </nav>
  );
};

export default SideNewArticle;
