'use client';

import { useState } from 'react';

interface CategoryFilterProps {
  categories: string[];
  onFilter: (category: string) => void;
}

const categoryColors: Record<string, { idle: string; selected: string }> = {
  Personal: {
    idle: 'border-[#F7C1BB] bg-[#F7C1BB]/45 text-[#885A5A] hover:border-[#885A5A] dark:border-[#F7C1BB]/25 dark:bg-[#F7C1BB]/10 dark:text-[#F7C1BB]',
    selected: 'border-[#885A5A] bg-[#885A5A] text-white shadow-[#885A5A]/25',
  },
  Work: {
    idle: 'border-[#353A47]/15 bg-white text-[#353A47] hover:border-[#353A47] dark:border-[#F7C1BB]/15 dark:bg-[#353A47] dark:text-white',
    selected: 'border-[#353A47] bg-[#353A47] text-white shadow-[#353A47]/25',
  },
  Ideas: {
    idle: 'border-[#DC136C]/20 bg-[#DC136C]/8 text-[#DC136C] hover:border-[#DC136C] dark:border-[#DC136C]/40 dark:bg-[#DC136C]/15 dark:text-[#ff8fbd]',
    selected: 'border-[#DC136C] bg-[#DC136C] text-white shadow-[#DC136C]/25',
  },
  Learning: {
    idle: 'border-[#84B082]/35 bg-[#84B082]/15 text-[#4f7450] hover:border-[#84B082] dark:border-[#84B082]/45 dark:bg-[#84B082]/15 dark:text-[#b8d4b7]',
    selected: 'border-[#84B082] bg-[#84B082] text-[#1f2b22] shadow-[#84B082]/25',
  },
  Todo: {
    idle: 'border-[#885A5A]/20 bg-[#f5e5e2] text-[#885A5A] hover:border-[#885A5A] dark:border-[#885A5A]/60 dark:bg-[#885A5A]/25 dark:text-[#F7C1BB]',
    selected: 'border-[#885A5A] bg-[#885A5A] text-white shadow-[#885A5A]/25',
  },
  Other: {
    idle: 'border-[#353A47]/10 bg-[#F7C1BB]/25 text-[#353A47] hover:border-[#84B082] dark:border-[#66515a] dark:bg-[#463d45] dark:text-[#fff7f5]',
    selected: 'border-[#84B082] bg-[#84B082] text-[#1f2b22] shadow-[#84B082]/25',
  },
};

export default function CategoryFilter({
  categories,
  onFilter,
}: CategoryFilterProps) {
  const [selected, setSelected] = useState<string>('');

  const handleSelect = (category: string) => {
    const newSelected = selected === category ? '' : category;
    setSelected(newSelected);
    onFilter(newSelected);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => {
        const isSelected = selected === category;
        const colors = categoryColors[category] ?? categoryColors.Other;
        return (
          <button
            key={category}
            onClick={() => handleSelect(category)}
            className={`rounded-lg border px-4 py-2 text-sm font-semibold shadow-sm transition-colors duration-200 ${
              isSelected ? colors.selected : colors.idle
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
