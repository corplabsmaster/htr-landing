"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

export function Footer() {
  const [mounted, setMounted] = useState(false);

  // After mounting, we can access the theme
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <footer className="border-t bg-white dark:bg-gray-900 dark:border-gray-800">
      <div className="container flex flex-col gap-6 py-8 md:py-12 px-10 md:px-6">
        <div className="grid grid-cols-12 gap-8">
          {/* Logo section - takes 3 columns */}
          <div className="col-span-12 md:col-span-3 space-y-3">
            <div className="flex items-center gap-2">
              <Image
                src="/logos/htr-logo-horizonta-positive.svg"
                alt="hiterra Logo"
                width={120}
                height={24}
                className="h-6 md:h-8 w-auto dark:hidden"
              />
              <Image
                src="/logos/htrr-logo-horizonta-negative.svg"
                alt="hiterra Logo"
                width={120}
                height={24}
                className="h-6 md:h-8 w-auto hidden dark:block"
              />
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Smart farming AI solutions for modern agriculture. Streamline
              operations and optimize harvests.
            </p>
          </div>

          {/* Gap - takes 1 column */}
          <div className="hidden md:block md:col-span-1"></div>

          {/* Navigation group - takes 8 columns, divided into 3 sections */}
          <div className="col-span-12 md:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Platform section */}
            <div className="space-y-3">
              <h3 className="font-bold dark:text-white text-lg">Platform</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    // href="https://app.hiterra.co/app/access/?mode=login"
                    href="/product"
                    className="text-sm text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                    // rel="noopener noreferrer"
                  >
                    Mobile App
                  </Link>
                </li>
                <li>
                  <Link
                    // href="https://app.hiterra.co/app/access/?mode=login"
                    href="/product"
                    className="text-sm text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                    // rel="noopener noreferrer"
                  >
                    TerraLink
                  </Link>
                </li>
                <li>
                  <Link
                    href="/product"
                    className="text-sm text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                  >
                    AI Data Platform
                  </Link>
                </li>
                <li>
                  <Link
                    href="/coming-soon/terracarbon"
                    className="text-sm text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                  >
                    TerraCarbon - Accounting
                  </Link>
                </li>
                <li>
                  <Link
                    href="/coming-soon"
                    className="text-sm text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                  >
                    Marketplace
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company section */}
            <div className="space-y-3">
              <h3 className="font-bold dark:text-white text-lg">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/about"
                    // href="/coming-soon"
                    className="text-sm text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="text-sm text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                  >
                    Insights
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://corplabs-careers.notion.site/Careers-25a1f36a70cf80e0957fc2de434fb57e"
                    className="text-sm text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                  >
                    Careers
                  </Link>
                </li>
                {/* <li>
                  <Link
                    href="/blog?category=News"
                    className="text-sm text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                  >
                    Press
                  </Link>
                </li> */}
                <li>
                  <Link
                    href="/investor"
                    className="text-sm text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                  >
                    Investor
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support section */}
            <div className="space-y-3">
              <h3 className="font-bold dark:text-white text-lg">Support</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/help-center"
                    // href="/coming-soon"
                    className="text-sm text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-sm text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    // href="/community"
                    href="/coming-soon"
                    className="text-sm text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                  >
                    Community
                  </Link>
                </li>
                <li>
                  <Link
                    // href="/status"
                    href="/coming-soon"
                    className="text-sm text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                  >
                    Status
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row justify-between items-center border-t pt-6 dark:border-gray-800">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()}&nbsp;
            <span className="dark:text-lake-500">
              {" "}
              HiTerra
              <span className="text-[10px] font-extralight font-mono">™</span>
            </span>{" "}
            <span className="text-[11px]"> by</span>
            <a
              className="text-purple-900 dark:text-purple-500"
              href="https://corplabs.co"
              target="_blank"
            >
              &nbsp;Corplabs
            </a>
            .&nbsp;&nbsp;All Rights Reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/term/pp"
              className="text-xs text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/term/tnc"
              className="text-xs text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
            >
              Terms of Service
            </Link>
            <div className="flex items-center gap-3 ml-4 border-l pl-4 dark:border-gray-800">
              <Link
                href="https://www.facebook.com/hiterra.co/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                aria-label="Visit HiTerra Facebook page"
              >
                <FaFacebook size={16} />
              </Link>
              <Link
                href="https://www.linkedin.com/company/hiterra-co"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                aria-label="Visit HiTerra LinkedIn page"
              >
                <FaLinkedin size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
