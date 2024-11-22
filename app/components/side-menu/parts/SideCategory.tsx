import Link from "next/link";
import { getParentCategories } from "@/app/lib/service/categoryService";
import { getSideCategoriesMenu } from "@/app/lib/service/menuService";

type Category = {
  slug: string;
  categoryName: string;
};

type SideCategoryProps = {
  border?: boolean;
};

const SideCategory: React.FC<SideCategoryProps> = async ({
  border = false,
}) => {
  const sideCategories = await getSideCategoriesMenu();

  if (!sideCategories || !sideCategories.frontmatter.items) {
    return null;
  }

  let categories;

  if (sideCategories.frontmatter.display === false) {
    const parentCategories = await getParentCategories();
    categories = parentCategories.map((category) => {
      return {
        slug: category?.slug,
        categoryName: category?.frontmatter.categoryName,
      };
    });
  } else {
    categories = sideCategories?.frontmatter.items;
  }

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
        className={`w-full p-4 border font-bold text-white bg-layout-mainColor border-layout-mainColor ${h3BorderDesign}`}
      >
        カテゴリ
      </h3>
      <ul>
        {categories.map((category: Category) => {
          return (
            <Link href={`/${category?.slug}`} key={category?.slug}>
              <li
                className={`p-4 hover: transition-colors duration-300 hover:bg-layout-hoverColor ${liBorderDesign}`}
                key={category?.categoryName}
              >
                {category?.categoryName}
              </li>
            </Link>
          );
        })}
      </ul>
    </nav>
  );
};

export default SideCategory;
