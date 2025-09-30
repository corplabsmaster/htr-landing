import { Metadata } from "next";
import Container from "@/app/components/ui/container";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn more about our company and mission",
};

export default function AboutPage() {
  return (
    <Container>
      <div className="py-8">
        <h1 className="text-4xl font-bold mb-6">About Us</h1>
        {/* Add your about page content here */}
      </div>
    </Container>
  );
}
