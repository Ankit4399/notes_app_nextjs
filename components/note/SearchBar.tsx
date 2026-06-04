'use client';

import { Search } from 'lucide-react';
import { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="relative">
      <Search
        size={20}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#84B082] pointer-events-none transition-colors duration-300"
      />
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search notes..."
        className="w-full rounded-lg border-2 border-[#F7C1BB] bg-white py-2.5 pl-10 pr-4 font-medium text-[#353A47] shadow-sm transition-colors duration-200 placeholder:text-[#a98784] focus:border-[#84B082] focus:outline-none focus:ring-3 focus:ring-[#84B082]/25 dark:border-[#66515a] dark:bg-[#463d45] dark:text-white dark:placeholder:text-[#d0aaa6] dark:focus:border-[#84B082] dark:focus:ring-[#84B082]/20"
      />
    </div>
  );
}
