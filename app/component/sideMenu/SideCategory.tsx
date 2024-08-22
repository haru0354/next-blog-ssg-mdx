import Link from "next/link";
import { getParentCategories } from "../lib/CategoryService";

const SideCategory = async () => {
  const categories = await getParentCategories();

  return (
    <nav>
      <h3 className="w-full mb-8 py-4 px-2 bg-main-gray text-white font-bold rounded">
        カテゴリ
      </h3>
      <ul>
        {categories.map((category) => {
          return (
            <Link href={`/${category.slug}`} key={category.slug}>
              <li
                className="p-3 hover:bg-hover-blue"
                key={category.frontmatter.categoryName}
              >
                {category.frontmatter.categoryName}
              </li>
            </Link>
          );
        })}
      </ul>
    </nav>
  );
};

export default SideCategory;
