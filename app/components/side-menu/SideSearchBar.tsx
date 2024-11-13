import SearchBar from "../ui/SearchBar";

type SideSearchBarProps = {
  border?: boolean;
};

const SideSearchBar: React.FC<SideSearchBarProps> = ({ border = false }) => {
  const h3BorderDesign = border ? "" : "rounded";

  return (
    <nav className="mb-8 bg-white">
      <h3 className={`w-full p-4 font-bold text-white bg-layout-mainColor ${h3BorderDesign}`}>
        サイト内検索
      </h3>
      <SearchBar />
    </nav>
  );
};

export default SideSearchBar;
