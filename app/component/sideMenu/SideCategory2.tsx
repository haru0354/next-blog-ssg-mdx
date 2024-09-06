import Link from "next/link";
import { getParentCategories } from "../lib/CategoryService";
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
    <nav className="bg-white border-r border-l mb-8 border-gray-500">
      <h3 className="w-full p-4 bg-main-gray text-white font-bold">カテゴリ</h3>
      <ul>
        {categories.map((category: Category) => {
          return (
            <Link href={`/${category?.slug}`} key={category?.slug}>
              <li
                className="p-4 border-b border-gray-500 hover:bg-hover-blue"
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
