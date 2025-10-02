"use client";

import { ReactNode } from "react";

export interface CardProps {
  title: string;
  content: string;
  icon?: ReactNode;
  className?: string;
}

export default function Card({
  title,
  content,
  icon,
  className = "",
}: CardProps) {
  return (
    <div
      className={`p-6 rounded-xl bg-white dark:bg-gray-800/50 backdrop-blur-sm shadow-lg ${className}`}
    >
      <div className="flex flex-col gap-3">
        {icon && <div className="text-2xl">{icon}</div>}
        <h3 className="text-lg md:text-xl font-semibold">{title}</h3>
        <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
          {content}
        </p>
      </div>
    </div>
  );
}
