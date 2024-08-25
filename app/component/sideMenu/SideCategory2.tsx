import Link from "next/link";
import { getParentCategories } from "../lib/CategoryService";

const SideCategory2 = async () => {
  const categories = await getParentCategories();

  if (!categories) {
    return null;
  }

  return (
    <nav className="bg-white border-r border-l mb-8 border-gray-500">
      <h3 className="w-full p-4 bg-main-gray text-white font-bold">カテゴリ</h3>
      <ul>
        {categories.map((category) => {
          return (
            <Link href={`/${category?.slug}`} key={category?.slug}>
              <li
                className="p-4 border-b border-gray-500 hover:bg-hover-blue"
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

export default SideCategory2;
