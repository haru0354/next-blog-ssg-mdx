import Link from "next/link";
import { getGlobalMenu } from "./lib/MenuService";

const GlobalMenu = async () => {
  const globalMenu = await getGlobalMenu();

  if (!globalMenu.frontmatter.name) {
    return null;
  }

  const menuItems = [
    { name: globalMenu.frontmatter.name, slug: globalMenu.frontmatter.slug },
    { name: globalMenu.frontmatter.name2, slug: globalMenu.frontmatter.slug2 },
    { name: globalMenu.frontmatter.name3, slug: globalMenu.frontmatter.slug3 },
    { name: globalMenu.frontmatter.name4, slug: globalMenu.frontmatter.slug4 },
  ];

  return (
    <nav className="w-full mb-10 bg-main-gray">
      <div className="flex items-center justify-center">
        <ul className="md:w-[1100px] flex flex-wrap w-full items-center justify-center">
          {menuItems.map(
            (menuItem, index) =>
              menuItem.name && (
                <li
                  key={index}
                  className="w-[50%] md:w-[25%] text-center text-sm md:text-base text-white py-3 md:py-4 px-2 hover:bg-hover-gray"
                >
                  <Link href={`/${menuItem.slug}`} className="block">
                    {menuItem.name}
                  </Link>
                </li>
              )
          )}
        </ul>
      </div>
    </nav>
  );
};

export default GlobalMenu;
