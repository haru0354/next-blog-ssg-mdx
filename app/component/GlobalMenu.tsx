import Link from "next/link";
import { getGlobalMenu } from "./lib/MenuService";

const GlobalMenu = async () => {
  const globalMenu = await getGlobalMenu();

  if (!globalMenu.frontmatter.name) {
    return null;
  }

  const globalMenuList = ["name", "name2", "name3", "name4"];

  return (
    <nav className="w-full mb-10 bg-gray-800">
      <div className="flex items-center justify-center">
        <ul className="md:w-[1100px] flex flex-wrap items-center justify-center">
          {globalMenuList.map(
            (nameKey, index) =>
              globalMenu.frontmatter[nameKey] && (
                <li
                  key={nameKey}
                  className="w-[50%] md:w-[25%] text-center text-sm md:text-base text-white py-2 md:py-4 px-2 hover:bg-gray-700 "
                >
                  <Link
                    href={`/${globalMenu.frontmatter[`slug${index + 1}`]}`}
                    className="block"
                  >
                    {globalMenu.frontmatter[nameKey]}
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
