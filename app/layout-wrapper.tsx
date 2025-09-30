"use client";

import { Header } from "@/app/components/ui/header";
import { Footer } from "@/app/components/ui/footer";
import { usePathname } from "next/navigation";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Define paths that should not show header/footer
  const noHeaderPaths = ["/coming-soon"];
  const noFooterPaths = [""];

  const showHeader = !noHeaderPaths.some((path) => pathname?.startsWith(path));
  const showFooter = !noFooterPaths.some((path) => pathname?.startsWith(path));

  return (
    <div className="flex flex-col min-h-screen dark:bg-gray-950">
      {showHeader && <Header />}
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
