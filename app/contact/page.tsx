import { Metadata } from "next";
import Container from "@/app/components/ui/container";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with our team",
};

export default function ContactPage() {
  return (
    <Container>
      <div className="py-8">
        <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
        {/* Add your contact page content here */}
      </div>
    </Container>
  );
}
