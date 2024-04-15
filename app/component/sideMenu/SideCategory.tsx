import Link from "next/link";
import { getCategories } from "../lib/CategoryService";

const SideCategory = async () => {
  const categories = await getCategories();

  return (
    <nav>
      <p className="w-full mt-4 py-4 px-2 bg-gray-800 text-white font-bold rounded">
        カテゴリ
      </p>
      <ul>
        {categories.map((category) => {
          return (
            <Link href={`/${category.slug}`} key={category.slug}>
              <li
                className="p-3 hover:bg-blue-100"
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
