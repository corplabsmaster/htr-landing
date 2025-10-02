import { Metadata } from "next";
import { ProductContent } from "./product-content";

export const metadata: Metadata = {
  title: "HiTerra AI App",
  description:
    "Help farmers and agricultural companies to be more profitable and sustainable, optimize harvests and higher yields with HiTerra App",
};

export default function ProductPage() {
  return <ProductContent />;
}
