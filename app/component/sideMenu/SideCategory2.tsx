import Link from "next/link";
import { getParentCategories } from "@/app/lib/categoryService";
import { getSideCategoriesMenu } from "../lib/MenuService";

type Category = {
  slug: string;
  categoryName: string;
};

const SideCategory2 = async () => {
  const sideCategoriesMenu = await getSideCategoriesMenu();

  if (!sideCategoriesMenu || !sideCategoriesMenu.items) {
    return null;
  }

  let categories;

  if (sideCategoriesMenu.display === false) {
    const parentCategories = await getParentCategories();
    categories = parentCategories.map((category) => {
      return {
        slug: category?.slug,
        categoryName: category?.frontmatter.categoryName,
      };
    });
  } else {
    categories = sideCategoriesMenu?.items;
  }

  if (!categories) {
    return null;
  }

  return (
    <nav className="mb-8 bg-white">
      <h3 className="w-full p-4 border font-bold text-white bg-layout-mainColor border-layout-mainColor">
        カテゴリ
      </h3>
      <ul>
        {categories.map((category: Category) => {
          return (
            <Link href={`/${category?.slug}`} key={category?.slug}>
              <li
                className="p-4 border-b border-r border-l border-gray-500 hover: transition-colors duration-300 hover:bg-hover-blue"
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

export default SideCategory2;
