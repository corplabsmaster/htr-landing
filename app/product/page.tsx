import { Metadata } from "next";
import { ProductContent } from "./product-content";

export const metadata: Metadata = {
  title: "HiTerra - TerraCore AI",
  description:
    "Help farmers and agricultural companies optimize harvests and higher yields with HiTerra AI: TerraCore",
};

export default function ProductPage() {
  return <ProductContent />;
}
