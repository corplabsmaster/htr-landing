import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notion API Test",
  description: "Test page for Notion API integration",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotionTestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
