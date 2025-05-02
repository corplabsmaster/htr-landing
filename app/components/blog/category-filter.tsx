"use client";

import { Category } from "@/types/blog";
import { useState } from "react";

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string | null;
  onCategorySelect: (category: string | null) => void;
  disabled?: boolean;
}

export default function CategoryFilter({
  categories,
  selectedCategory,
  onCategorySelect,
  disabled = false,
}: CategoryFilterProps) {
  // Local state to track clicked state for immediate feedback
  const [clickedCategory, setClickedCategory] = useState<string | null>(null);

  if (categories.length === 0) return null;

  // Helper to handle button click with instant visual feedback
  const handleClick = (category: string | null) => {
    if (disabled) return;

    // Set local clicked state for immediate feedback
    setClickedCategory(category);

    // Call the actual handler
    onCategorySelect(category);

    // Reset the clicked state after animation
    setTimeout(() => setClickedCategory(null), 200);
  };

  return (
    <div className="mb-10">
      <div className="flex flex-wrap gap-2 justify-center">
        <button
          onClick={() => handleClick(null)}
          disabled={disabled}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            selectedCategory === null
              ? "bg-[#2c5b2d] text-white dark:bg-[#2ae1ac] dark:text-gray-900"
              : "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
          } ${disabled ? "opacity-60 cursor-not-allowed" : ""} ${
            clickedCategory === null && selectedCategory !== null
              ? "scale-95 opacity-80"
              : ""
          }`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleClick(category.name)}
            disabled={disabled}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === category.name
                ? "bg-[#2c5b2d] text-white dark:bg-[#2ae1ac] dark:text-gray-900"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
            } ${disabled ? "opacity-60 cursor-not-allowed" : ""} ${
              clickedCategory === category.name &&
              selectedCategory !== category.name
                ? "scale-95 opacity-80"
                : ""
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
}
