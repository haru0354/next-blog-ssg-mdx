import Link from "next/link";
import { getGlobalMenu } from "./lib/MenuService";

const GlobalMenu = async () => {
  const globalMenu = await getGlobalMenu();

  if (!globalMenu.frontmatter.name) {
    return null;
  }

  return (
    <nav className="w-full mb-10 bg-gray-800">
      <div className="flex items-center justify-center">
        <ul className="md:w-[1100px] flex flex-wrap items-center justify-center">
          <li className="w-[50%] md:w-[25%] text-center text-sm md:text-base text-white py-2 md:py-4 px-2">
            <Link href={`/${globalMenu.frontmatter.slug}`} className="block">
              {globalMenu.frontmatter.name}
            </Link>
          </li>
          {globalMenu.frontmatter.name2 && (
            <li className="w-[50%] md:w-[25%] text-center text-sm md:text-base text-white py-2 md:py-4 px-2">
              <Link href={`/${globalMenu.frontmatter.slug2}`} className="block">
                {globalMenu.frontmatter.name2}
              </Link>
            </li>
          )}
          {globalMenu.frontmatter.name3 && (
            <li className="w-[50%] md:w-[25%] text-center text-sm md:text-base text-white py-2 md:py-4 px-2">
              <Link href={`/${globalMenu.frontmatter.slug3}`} className="block">
                {globalMenu.frontmatter.name3}
              </Link>
            </li>
          )}
          {globalMenu.frontmatter.name4 && (
            <li className="w-[50%] md:w-[25%] text-center text-sm md:text-base text-white py-2 md:py-4 px-2">
              <Link href={`/${globalMenu.frontmatter.slug4}`} className="block">
                {globalMenu.frontmatter.name4}
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default GlobalMenu;
