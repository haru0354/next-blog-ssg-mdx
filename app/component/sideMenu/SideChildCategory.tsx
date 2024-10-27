import Link from "next/link";
import { getChildCategories } from "../lib/CategoryService";

type SideChildCategoryProps = {
  firstLevelArticle_slug: string;
  categoryName: string | undefined;
};

const SideChildCategory: React.FC<SideChildCategoryProps> = async ({
  firstLevelArticle_slug,
  categoryName,
}) => {
  const categories = await getChildCategories(firstLevelArticle_slug);

  if (!categories) {
    return null;
  }

  return (
    <nav className="bg-white border-r border-l mb-8 border-gray-500">
      <h3 className="w-full p-4 bg-layout-mainColor text-white font-bold">
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

export default SideChildCategory;
