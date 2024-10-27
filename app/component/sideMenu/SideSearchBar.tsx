import SearchBar from "../ui/SearchBar";

const SideSearchBar = () => {
  return (
    <nav className="mb-8 bg-white">
      <h3 className="w-full p-4 bg-layout-mainColor text-white font-bold">
        サイト内検索
      </h3>
      <SearchBar />
    </nav>
  );
};

export default SideSearchBar;
