import { Metadata } from "next";
import Container from "@/app/components/ui/container";

export const metadata: Metadata = {
  title: "Products - HiTerra AI",
  description:
    "Explore our smart farming AI solutions and products for modern agriculture.",
};

export default function ProductPage() {
  return (
    <Container>
      <div className="py-8">
        <h1 className="text-4xl font-bold">Our Products</h1>
        {/* Add your product page content here */}
      </div>
    </Container>
  );
}
