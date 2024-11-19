import Image from "next/image";
import Link from "next/link";
import { getRecommendArticles } from "@/app/lib/menuService";

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

  if (recommendArticles.frontmatter.display === false) {
    return null;
  }

  const h3BorderDesign = border ? "w-[300px]" : "mb-4 rounded";

  return (
    <div className="w-full">
      <h3
        className={`p-4 font-bold text-white bg-layout-mainColor  ${h3BorderDesign}`}
      >
        おすすめの記事
      </h3>
      {recommendArticles.frontmatter.images.map((image: Image) => (
        <Link href={`/${image.url}`}>
          <Image
            src={`/thumbnail_webp/${image.eyeCatchName}.webp`}
            alt={image.eyeCatchAlt}
            width={300}
            height={196}
            className="mx-auto md:mt-0 my-8"
          />
        </Link>
      ))}
    </div>
  );
};

export default SideRecommendArticles;
