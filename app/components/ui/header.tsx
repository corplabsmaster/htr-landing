"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "./button";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="border-b sticky top-0 z-10 bg-white dark:bg-gray-900 dark:border-gray-800">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Link href="/">
            <Image
              src="/logos/htr-logo-horizonta-positive.svg"
              alt="HiTerra Logo"
              width={120}
              height={24}
              className="h-6 md:h-8 w-auto dark:hidden"
            />
            <Image
              src="/logos/htrr-logo-horizonta-negative.svg"
              alt="HiTerra Logo"
              width={120}
              height={24}
              className="h-6 md:h-8 w-auto hidden dark:block"
            />
          </Link>
        </div>
        <nav className="hidden md:flex gap-6">
          <Link
            href="/#problem"
            className="text-sm font-medium hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400 transition-colors"
          >
            Solution
          </Link>
          <Link
            href="/product"
            className="text-sm font-medium hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400 transition-colors"
          >
            Impact
          </Link>
          <Link
            href="/blog"
            className="text-sm font-medium hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400 transition-colors"
          >
            Insights
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400 transition-colors"
          >
            Grow with Us
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link
            // href="https://app.hiterra.co/app/access/?mode=login"
            href="/coming-soon"
            className="text-sm font-medium hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400 transition-colors hidden md:block"
          >
            Log In
          </Link>
          <ThemeToggle />
          <Link href="/product">
            <Button className="text-sm bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800">
              Discover Impact
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
