import { getLinks } from "../lib/MenuService";
import Link from "next/link";

const SideLinks = async () => {
  const links = await getLinks();

  if (!links) {
    return null;
  }

  const allFieldsEmpty = Object.values(links.frontmatter).every(
    (value) => value === ""
  );

  if (allFieldsEmpty) {
    return null;
  }

  return (
    <nav className="bg-white border-r border-l mb-8 border-gray-500">
      <h3 className="w-full p-4 bg-main-gray text-white font-bold">
        参考文献・参考サイト
      </h3>
      <ul>
        <Link href={`/${links.frontmatter.slug}`}>
          <li className="py-2 px-4 border-b border-gray-500">
            {links.frontmatter.name}
          </li>
        </Link>
        {links.frontmatter.name2 && (
          <Link href={`/${links.frontmatter.slug2}`}>
            <li className="py-2 px-4 border-b border-gray-500">
              {links.frontmatter.name2}
            </li>
          </Link>
        )}
        {links.frontmatter.name3 && (
          <Link href={`/${links.frontmatter.slug3}`}>
            <li className="py-2 px-4 border-b border-gray-500">
              {links.frontmatter.name3}
            </li>
          </Link>
        )}
        {links.frontmatter.name4 && (
          <Link href={`/${links.frontmatter.slug4}`}>
            <li className="py-2 px-4 border-b border-gray-500">
              {links.frontmatter.name4}
            </li>
          </Link>
        )}
      </ul>
    </nav>
  );
};

export default SideLinks;
