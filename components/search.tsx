"use client";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import debounce from "debounce";
import { useCallback } from "react";

export function Search() {
  const router = useRouter();

  const debouncedSearch = useCallback(
    debounce((search) => {
      router.push("/dashboard?search=" + search);
    }, 500),
    [],
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value;
    debouncedSearch(search);
  };

  return (
    <div>
      <Input
        type="search"
        placeholder="Search..."
        className="md:w-[100px] lg:w-[300px] border border-transparent shadow-md"
        inputMode="search"
        onChange={handleSearch}
      />
    </div>
  );
}
