import Image from "next/image";
import Link from "next/link";
import { getRecommendArticles } from "@/app/lib/menuService";

type SideRecommendArticlesProps = {
  border?: boolean;
};

const SideRecommendArticles: React.FC<SideRecommendArticlesProps> = async ({
  border = false,
}) => {
  const recommendArticles = await getRecommendArticles();

  if (!recommendArticles) {
    return null;
  }

  const allFieldsEmpty = Object.values(recommendArticles.frontmatter).every(
    (value) => value === ""
  );

  if (allFieldsEmpty) {
    return null;
  }

  const h3BorderDesign = border ? "w-[300px]" : "rounded mb-4";

  return (
    <div className="w-full mb-8">
      <h3
        className={`p-4 font-bold text-white bg-layout-mainColor  ${h3BorderDesign}`}
      >
        おすすめの記事
      </h3>
      <Link href={`/${recommendArticles.frontmatter.slug}`}>
        <Image
          src={`/thumbnail_webp/${recommendArticles.frontmatter.eyeCatchName}.webp`}
          alt={recommendArticles.frontmatter.eyeCatchAlt}
          width={300}
          height={196}
          className="mx-auto md:mt-0 mt-8"
        />
      </Link>
    </div>
  );
};

export default SideRecommendArticles;
