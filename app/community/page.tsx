import { Metadata } from "next";
import Container from "@/app/components/ui/container";

export const metadata: Metadata = {
  title: "Community",
  description: "Join our community and connect with other members",
};

export default function CommunityPage() {
  return (
    <Container>
      <div className="py-8">
        <h1 className="text-4xl font-bold mb-6">Community</h1>
        {/* Add your community page content here */}
      </div>
    </Container>
  );
}
