import { Metadata } from "next";
import Container from "@/app/components/ui/container";

export const metadata: Metadata = {
  title: "System Status",
  description: "Check our system status and service availability",
};

export default function StatusPage() {
  return (
    <Container>
      <div className="py-8">
        <h1 className="text-4xl font-bold mb-6">System Status</h1>
        {/* Add your status page content here */}
      </div>
    </Container>
  );
}
