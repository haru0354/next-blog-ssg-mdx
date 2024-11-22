import Image from "next/image";
import Link from "next/link";
import { getRecommendArticles } from "@/app/lib/service/menuService";

type SideRecommendArticlesProps = {
  border?: boolean;
};

type Image = {
  eyeCatchName: string;
  eyeCatchAlt: string;
  url: string;
};

const SideRecommendArticles: React.FC<SideRecommendArticlesProps> = async ({
  border = false,
}) => {
  const recommendArticles = await getRecommendArticles();

  if (!recommendArticles) {
    return null;
  }

  if (recommendArticles.display === false) {
    return null;
  }

  const h3BorderDesign = border ? "" : "rounded";
  const divBorderDesign = border
    ? "md:pt-0 border-r border-b border-l border-gray-500"
    : "";

  return (
    <div className="w-full mb-8">
      <h3
        className={`p-4 font-bold text-white bg-layout-mainColor  ${h3BorderDesign}`}
      >
        おすすめの記事
      </h3>
      {recommendArticles.articles.map((article) => {
        return (
          <>
            <Link href={`/${article?.slug}`} key={article?.slug}>
              <div
                className={`pt-4 bg-white ${divBorderDesign}`}
              >
                <Image
                  src={
                    article?.frontmatter.eyeCatchName
                      ? `/thumbnail_webp/${article.frontmatter.eyeCatchName}.webp`
                      : "/thumbnail_webp/no_image.webp"
                  }
                  alt={
                    article?.frontmatter.eyeCatchAlt
                      ? `${article.frontmatter.eyeCatchAlt}`
                      : "アイチャッチ画像"
                  }
                  width={300}
                  height={196}
                  className="mx-auto hover:-translate-y-2 translate transition duration-300"
                />

              </div>
            </Link>
          </>
        );
      })}
    </div>
  );
};

export default SideRecommendArticles;
