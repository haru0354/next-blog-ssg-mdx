import { getLinks } from "../lib/MenuService";
import Link from "next/link";

const SideLinks = async () => {
  const links = await getLinks();

  if (!links.frontmatter.name) {
    return null;
  }

  return (
    <nav className="bg-white border-r border-l mt-8 border-gray-200">
      <p className="w-full p-4 bg-gray-800 text-white font-bold">
        参考文献・参考サイト
      </p>
      <ul>
        <Link href={`/${links.frontmatter.slug}`}>
          <li className="py-2 px-4 border-b border-gray-200">
            {links.frontmatter.name}
          </li>
        </Link>
        {links.frontmatter.name2 && (
          <Link href={`/${links.frontmatter.slug2}`}>
            <li className="py-2 px-4 border-b border-gray-200">
              {links.frontmatter.name2}
            </li>
          </Link>
        )}
        {links.frontmatter.name3 && (
          <Link href={`/${links.frontmatter.slug3}`}>
            <li className="py-2 px-4 border-b border-gray-200">
              {links.frontmatter.name3}
            </li>
          </Link>
        )}
        {links.frontmatter.name4 && (
          <Link href={`/${links.frontmatter.slug4}`}>
            <li className="py-2 px-4 border-b border-gray-200">
              {links.frontmatter.name4}
            </li>
          </Link>
        )}
      </ul>
    </nav>
  );
};

export default SideLinks;
