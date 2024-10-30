import Image from "next/image";
import Link from "next/link";
import { getRecommendArticles } from "@/app/lib/menuService";

const SideRecommendArticles = async () => {
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

  return (
    <div className="bg-white border-r border-l mb-8 border-gray-200">
      <h3 className="w-full p-4 bg-layout-mainColor text-white font-bold">
        おすすめの記事
      </h3>
      <Link href={`/${recommendArticles.frontmatter.slug}`}>
        <Image
          src={`/thumbnail_webp/${recommendArticles.frontmatter.eyeCatchName}.webp`}
          alt={recommendArticles.frontmatter.eyeCatchAlt}
          width={298}
          height={196}
          className="mx-auto md:mt-0 mt-8"
        />
      </Link>
    </div>
  );
};

export default SideRecommendArticles;
