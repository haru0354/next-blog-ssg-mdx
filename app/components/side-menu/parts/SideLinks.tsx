import { getLinks } from "@/app/lib/menuService";

type SideLinksProps = {
  border?: boolean;
};

type Item = {
  name: string;
  slug: string;
};

const SideLinks: React.FC<SideLinksProps> = async ({ border = false }) => {
  const links = await getLinks();

  if (!links) {
    return null;
  }

  if (links.frontmatter.display === false) {
    return null;
  }

  const h3BorderDesign = border ? "" : "rounded";
  const liBorderDesign = border
    ? "border-r border-b border-l border-gray-500"
    : "";

  return (
    <nav className="mb-8 bg-white">
      <h3
        className={`w-full p-4 bg-layout-mainColor text-white font-bold ${h3BorderDesign}`}
      >
        参考文献・参考サイト
      </h3>
      <ul>
        {links.frontmatter.items.map((item: Item) => (
          <a href={item.slug} target="blank" key={item.name}>
            <li
              className={`p-4 hover: transition-colors duration-300 hover:bg-layout-hoverColor ${
                border && liBorderDesign
              }`}
            >
              {item.name}
            </li>
          </a>
        ))}
      </ul>
    </nav>
  );
};

export default SideLinks;
