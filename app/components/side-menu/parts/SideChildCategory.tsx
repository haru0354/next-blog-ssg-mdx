import Link from "next/link";

import { getChildCategories } from "@/app/lib/service/categoryService";

type SideChildCategoryProps = {
  firstLevelArticle_slug: string;
  border?: boolean;
};

const SideChildCategory: React.FC<SideChildCategoryProps> = async ({
  firstLevelArticle_slug,
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
        {categories.parentCategoryName}
      </h3>
      <ul>
        {categories?.childCategories.map((childCategory) => {
          return (
            <Link
              href={`/${firstLevelArticle_slug}/${childCategory?.slug}`}
              key={childCategory?.slug}
            >
              <li
                className={`p-4 hover:transition-colors hover:bg-layout-hoverColor duration-300 ${liBorderDesign}`}
                key={childCategory?.frontmatter.categoryName}
              >
                {childCategory?.frontmatter.categoryName}
              </li>
            </Link>
          );
        })}
      </ul>
    </nav>
  );
};

export default SideChildCategory;
