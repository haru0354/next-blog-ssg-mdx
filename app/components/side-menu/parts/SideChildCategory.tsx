import Link from "next/link";
import { getChildCategories } from "@/app/lib/categoryService";

type SideChildCategoryProps = {
  firstLevelArticle_slug: string;
  categoryName: string | undefined;
  border?: boolean;
};

const SideChildCategory: React.FC<SideChildCategoryProps> = async ({
  firstLevelArticle_slug,
  categoryName,
  border,
}) => {
  const categories = await getChildCategories(firstLevelArticle_slug);

  if (!categories) {
    return null;
  }

  const h3BorderDesign = border ? "" : "rounded";
  const liBorderDesign = border
    ? "border-r border-b border-l border-gray-500"
    : "";

  return (
    <nav className="mb-8 bg-white">
      <h3
        className={`w-full p-4 bg-layout-mainColor text-white font-bold ${h3BorderDesign}`}
      >
        {categoryName}
      </h3>
      <ul>
        {categories?.map((category) => {
          return (
            <Link
              href={`/${firstLevelArticle_slug}/${category?.slug}`}
              key={category?.slug}
            >
              <li
                className={`p-4 hover:transition-colors hover:bg-layout-hoverColor duration-300 ${liBorderDesign}`}
                key={category?.frontmatter.categoryName}
              >
                {category?.frontmatter.categoryName}
              </li>
            </Link>
          );
        })}
      </ul>
    </nav>
  );
};

export default SideChildCategory;
