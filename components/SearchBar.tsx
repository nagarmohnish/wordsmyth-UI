"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar({ expanded = false }: { expanded?: boolean }) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/we/${encodeURIComponent(query.trim().toLowerCase())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className={`flex items-center ${expanded ? "w-full max-w-2xl" : "w-64"}`}>
      <div className="relative flex-1">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Look up a word..."
          className={`w-full border-2 border-[var(--color-border)] rounded-full focus:border-[var(--color-primary)] focus:outline-none transition-colors ${
            expanded ? "px-6 py-3 text-lg" : "px-4 py-2 text-sm"
          }`}
        />
        <button
          type="submit"
          className={`absolute right-1 top-1/2 -translate-y-1/2 bg-[var(--color-primary)] text-white rounded-full hover:bg-[var(--color-primary-light)] transition-colors ${
            expanded ? "px-6 py-2" : "px-4 py-1.5 text-sm"
          }`}
        >
          Search
        </button>
      </div>
    </form>
  );
}
