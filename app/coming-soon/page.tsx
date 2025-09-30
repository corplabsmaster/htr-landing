import { Metadata } from "next";
import ComingSoonPage from "./coming-soon";

export const metadata: Metadata = {
  title: "Coming Soon - HiTerra",
  description: "This page is coming soon. Stay tuned for updates!",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function Page() {
  return <ComingSoonPage />;
}
