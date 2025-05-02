"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

export default function BackToInsightsButton() {
  const router = useRouter();
  const [isClicked, setIsClicked] = useState(false);

  const handleBackClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();

      // Set clicked state
      setIsClicked(true);

      // Navigate after a brief delay
      setTimeout(() => {
        router.push("/blog");
      }, 100);
    },
    [router]
  );

  return (
    <a
      href="/blog"
      onClick={handleBackClick}
      className={`inline-flex items-center mb-4 text-sm font-medium ${
        isClicked
          ? "rounded cursor-wait"
          : "text-blue-600 hover:underline dark:text-blue-400"
      }`}
    >
      <svg
        className={`mr-1 h-4 w-4 transition-transform ${
          isClicked ? "transform -translate-x-1" : ""
        }`}
        fill="none"
        stroke={isClicked ? "#d1d5db" : "currentColor"}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 19l-7-7 7-7"
        />
      </svg>
      {isClicked ? (
        <span className="text-blue-500 dark:text-blue-500">Going Back</span>
      ) : (
        "Back to Insights"
      )}
    </a>
  );
}
