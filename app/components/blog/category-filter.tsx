"use client";

import { Category } from "@/types/blog";

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string | null;
  onCategorySelect: (category: string | null) => void;
}

export default function CategoryFilter({
  categories,
  selectedCategory,
  onCategorySelect,
}: CategoryFilterProps) {
  if (categories.length === 0) return null;

  return (
    <div className="mb-10">
      <div className="flex flex-wrap gap-2 justify-center">
        <button
          onClick={() => onCategorySelect(null)}
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            selectedCategory === null
              ? "bg-[#2c5b2d] text-white dark:bg-[#2ae1ac] dark:text-gray-900"
              : "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
          }`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategorySelect(category.name)}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              selectedCategory === category.name
                ? "bg-[#2c5b2d] text-white dark:bg-[#2ae1ac] dark:text-gray-900"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
}
