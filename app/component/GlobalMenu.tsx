import Link from "next/link";
import { getGlobalMenu } from "./lib/MenuService";

const GlobalMenu = async () => {
  const globalMenu = await getGlobalMenu();

  if (!globalMenu) {
    return null;
  }

  const menuItems = [
    { name: globalMenu.frontmatter.name, slug: globalMenu.frontmatter.slug },
    { name: globalMenu.frontmatter.name2, slug: globalMenu.frontmatter.slug2 },
    { name: globalMenu.frontmatter.name3, slug: globalMenu.frontmatter.slug3 },
    { name: globalMenu.frontmatter.name4, slug: globalMenu.frontmatter.slug4 },
  ];

  return (
    <nav className="w-full flex items-center justify-center bg-layout-mainColor">
      <ul className="flex flex-wrap items-center justify-center md:w-[1150px] w-full">
        {menuItems.map(
          (menuItem, index) =>
            menuItem.name && (
              <Link
                key={index}
                href={`/${menuItem.slug}`}
                className="w-[50%] md:w-[25%] hover:bg-hover-gray"
              >
                <li className="text-center text-sm md:text-base text-white py-3 md:py-4 px-2">
                  {menuItem.name}
                </li>
              </Link>
            )
        )}
      </ul>
    </nav>
  );
};

export default GlobalMenu;
