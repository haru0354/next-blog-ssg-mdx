import Link from "next/link";
import { getArticles } from "../lib/ArticleService";
import Image from "next/image";

const CategoryInArticlesList2 = async ({ params }: { params: string }) => {
  const currentCategory = params;
  const Articles = await getArticles();
  const filteredArticles = Articles.filter(
    (article) => currentCategory === article.frontmatter.categorySlug
  );

  return (
    <div className="bg-white p-4 mt-8">
      <h2 className="w-full my-4 py-4 px-2 bg-gray-800 text-white text-xl font-semibold rounded">
        関連記事
      </h2>
      <div className="w-full flex flex-wrap justify-center">
        {filteredArticles.map((article) => (
          <Link
            href={`/${article.frontmatter.categorySlug}/${article.slug}`}
            key={article.slug}
          >
            <div className="flex flex-wrap justify-center md:flex-nowrap w-full my-2">
              <div className="min-w-[342px] mb-2 md:mb-0">
                <Image
                  src={`/thumbnail_webp/${article.frontmatter.eyeCatchName}.webp`}
                  alt={`${article.frontmatter.eyeCatchAlt}`}
                  width={342}
                  height={225}
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
    </div>
  );
};

export default CategoryInArticlesList2;
