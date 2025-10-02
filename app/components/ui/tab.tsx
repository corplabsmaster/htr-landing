"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface TabProps {
  tabs: {
    id: string;
    label: string;
    content: ReactNode;
  }[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
}

export function Tab({ tabs, activeTab, onTabChange, className }: TabProps) {
  return (
    <div
      className={cn(
        "sticky top-16 z-10 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b",
        className
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex gap-8 justify-center">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "py-4 text-sm md:text-base font-medium relative transition-colors",
                activeTab === tab.id
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
              )}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
