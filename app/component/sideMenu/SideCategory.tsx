import Link from "next/link";
import { getParentCategories } from "../lib/CategoryService";
import { getSideCategoriesMenu } from "../lib/MenuService";

type Category = {
  slug: string;
  categoryName: string;
};

const SideCategory = async () => {
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
    <nav>
      <h3 className="w-full mb-8 py-4 px-2 bg-main-gray text-white font-bold rounded">
        カテゴリ
      </h3>
      <ul>
        {categories.map((category: Category) => {
          return (
            <Link href={`/${category?.slug}`} key={category?.slug}>
              <li
                className="p-3 hover:bg-hover-blue"
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
