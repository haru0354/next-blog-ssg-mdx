import { getLinks } from "../lib/MenuService";

type Item = {
  name: string;
  slug: string;
};

const SideLinks = async () => {
  const links = await getLinks();

  if (!links) {
    return null;
  }

  if (links.display === false) {
    return null;
  }

  return (
    <nav className="bg-white border-r border-l mb-8 border-gray-500">
      <h3 className="w-full p-4 bg-main-gray text-white font-bold">
        参考文献・参考サイト
      </h3>
      <ul>
        {links.items.map((item: Item) => (
          <a href={item.slug} target="blank" key={item.name}>
            <li className="py-2 px-4 border-b border-gray-500 hover:bg-hover-blue">
              {item.name}
            </li>
          </a>
        ))}
      </ul>
    </nav>
  );
};

export default SideLinks;
