import { Metadata } from "next";
import Container from "@/app/components/ui/container";

export const metadata: Metadata = {
  title: "Investor Deck - HiTerra AI | Investment Updates & News",
  description:
    "Stay updated with HiTerra's latest investment news, financial updates, and growth milestones in AgriTech AI solutions and sustainable farming technology.",
  keywords:
    "HiTerra investors, AgriTech investment, sustainable farming investment, agricultural technology news",
  robots: {
    index: true,
    follow: true,
  },
};

export default function InvestorPage() {
  return (
    <Container>
      <div className="py-8">
        <h1 className="text-4xl font-bold">Investor News</h1>
        {/* Add your investor news content here */}
      </div>
    </Container>
  );
}
