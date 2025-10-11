import { Metadata } from "next";
import ComingSoonDescriptionPage from "../coming-soon-des";

export const metadata: Metadata = {
  title: "TerraCarbon - Coming Soon | HiTerra",
  description:
    "HiTerra's upcoming Carbon Accounting Platform will revolutionize how agricultural businesses track, manage, and monetize their carbon footprint.",
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
  return <ComingSoonDescriptionPage />;
}
