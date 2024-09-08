"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import InputText from "../ui/InputText";
import Button from "../ui/Button";

const SearchBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <nav className="bg-white mb-8 border-gray-500">
      <h3 className="w-full p-4 bg-main-gray text-white font-bold">
        サイト内検索
      </h3>
      <div className="flex">
        <InputText
          name="search"
          placeholder="記事を検索"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button size="search" color="gray" onClick={handleSearch}>
          検索
        </Button>
      </div>
    </nav>
  );
};

export default SearchBar;