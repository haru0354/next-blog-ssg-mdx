"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import InputText from "../ui/InputText";
import Button from "../ui/Button";

type SearchBarProps = {
  contentsPage?: boolean;
};

const SearchBar: React.FC<SearchBarProps> = ({ contentsPage = false }) => {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("query") ?? "";
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const router = useRouter();

  useEffect(() => {
    if (initialQuery) {
      setSearchQuery(initialQuery);
    }
  }, [initialQuery]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className={`flex ${contentsPage && "my-8"}`}>
      <InputText
        name="search"
        placeholder="記事を検索"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Button size="search" color="gray">
        検索
      </Button>
    </form>
  );
};

export default SearchBar;
