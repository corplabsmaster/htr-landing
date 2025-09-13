"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

interface CategoryLinkProps {
  category: {
    id: string;
    name: string;
  };
}

export default function CategoryLink({ category }: CategoryLinkProps) {
  const router = useRouter();
  const [isClicked, setIsClicked] = useState(false);

  const handleCategoryClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();

      // Set clicked state
      setIsClicked(true);

      // Navigate after a brief delay
      setTimeout(() => {
        router.push(`/blog?category=${encodeURIComponent(category.name)}`);
      }, 100);
    },
    [category.name, router]
  );

  return (
    <span className="relative inline-block">
      <a
        href={`/blog?category=${encodeURIComponent(category.name)}`}
        onClick={handleCategoryClick}
        className={`inline-block px-2 py-1 text-xs font-medium rounded-full 
          ${
            isClicked
              ? "bg-[#2c5b2d]/30 text-[#2c5b2d]/50 dark:bg-lake-500/30 dark:text-lake-500/50 cursor-wait"
              : "bg-[#2c5b2d]/10 text-[#2c5b2d] dark:bg-lake-500/10 dark:text-lake-500"
          }`}
      >
        {category.name}
      </a>
      {isClicked && (
        <span className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 text-xs text-gray-300 dark:text-gray-500 whitespace-nowrap">
          loading...
        </span>
      )}
    </span>
  );
}
