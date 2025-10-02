import { Metadata } from "next";
import Container from "@/app/components/ui/container";

export const metadata: Metadata = {
  title: "Help Center",
  description: "Find help and support for our services",
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

export default function HelpCenterPage() {
  return (
    <Container>
      <div className="py-8">
        <h1 className="text-4xl font-bold mb-6">Help Center</h1>
        {/* Add your help center content here */}
      </div>
    </Container>
  );
}
