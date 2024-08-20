import Link from "next/link";
import { getSecondCategories } from "../lib/CategoryService";

type SideChildCategoryProps = {
  params: Params;
  categoryName: string | undefined;
}

type Params = {
  firstLevelArticle_slug: string;
  secondLevelArticle_slug: string;
};

const SideChildCategory: React.FC<SideChildCategoryProps> = async ({ params, categoryName }) => {
  const categories = await getSecondCategories(params.firstLevelArticle_slug);
  console.log("params", params);
  console.log("categories", categories);

  return (
    <nav className="bg-white border-r border-l mb-8 border-gray-200">
      <h3 className="w-full p-4 bg-main-gray text-white font-bold">{categoryName}</h3>
      <ul>
        {categories.map((category) => {
          return (
            <Link href={`/${params.firstLevelArticle_slug}/${category.slug}`} key={category.slug}>
              <li
                className="p-4 border-b border-gray-200 hover:bg-hover-blue"
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

export default SideChildCategory;
