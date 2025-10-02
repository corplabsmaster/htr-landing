import { Metadata } from "next";
import Image from "next/image";
import Container from "@/app/components/ui/container";
import Card from "@/app/components/ui/card";
import { Em } from "@/app/components/ui/em";
import {
  Leaf,
  Zap,
  TreeDeciduous,
  Users,
  Globe,
  ShieldCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About HiTerra - Empowering Sustainable Agriculture",
  description:
    "Learn about HiTerra's mission to empower farmers and agricultural enterprises through AI technology, data analytics, and scientific research.",
};

export default function AboutPage() {
  return (
    <Container>
      {/* Intro Section */}
      <div className="py-12 md:py-16">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="flex flex-col gap-6">
            <h1 className="text-2xl md:text-4xl font-semibold md:font-medium">
              About HiTerra
            </h1>
            <div className="relative h-[300px] md:h-[400px] w-full rounded-xl overflow-hidden">
              <Image
                src="/images/intro/hiterra_core_ai.jpg"
                alt="HiTerra Core AI"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="flex flex-col gap-6 px-2">
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed text-pretty">
              HiTerra, founded by Dayrl Lee<Em>(Product Engineer)</Em> and
              Kenyon Tew<Em>(Product Designer)</Em>, originated as a technology
              development startup, Corplabs with a strong focus on innovative
              product development. Based in Malaysia, started on 2024 September,
              we empower small-scale farmers and agricultural enterprises
              through advanced AI technology, data analytics, and scientific
              research.
            </p>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              Our mission is to deliver smart, scalable solutions that &nbsp;
              <span className="font-bold text-blue-800 dark:text-white">
                promote sustainable farming practices and enhance productivity
                while assist farmers to offset their cost through carbon project
              </span>
              . HiTerra's journey began with a pioneering project spanning 200
              hectares of paddy fields in Sungai Besar, and we are committed to
              expanding our expertise across key crops including palm oil,
              pineapple, banana, durian, and more.
            </p>
          </div>
        </div>

        {/* Mission Statements */}
        <div className="mt-16 md:mt-24 grid md:grid-cols-2 gap-8">
          <div className="bg-green-50 dark:bg-green-950/30 p-6 md:p-8 rounded-xl">
            <h3 className="text-base md:text-xl font-semibold mb-4">
              Empowering farmers with HiTerra
            </h3>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              Farming is essential, yet many farmers face challenges such as
              &nbsp;
              <span className="text-blue-700 dark:text-blue-500 font-semibold">
                limited resources, lack of technology, and insufficient access
                to information
              </span>
              . HiTerra was built to bridge this gap — providing farmers with
              technology, data, and practical tips to improve productivity and
              sustainability.
            </p>
          </div>
          <div className="bg-blue-50 dark:bg-blue-950/30 p-6 md:p-8 rounded-xl">
            <h3 className="text-base md:text-xl font-semibold mb-4">
              Support profitable and sustainable farming
            </h3>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              Small-scale farmers and agricultural companies are the backbone of
              our food system. With HiTerra, we are not just offering
              technology, but{" "}
              <span className="text-blue-700 dark:text-blue-500 font-semibold">
                building a movement that helps farmers raise their income and
                livelihood while supporting agri-companies in serving their
                communities more effectively. &nbsp;
              </span>
              <span className="text-pretty">
                {" "}
                We believe carbon project can help farmers to offset their cost
                and improve their livelihood.
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-12 md:py-16 border-t">
        <h2 className="text-xl md:text-4xl font-semibold md:font-normal mb-8 md:mb-12 text-center">
          🌱 HiTerra Brand Values
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 text-pretty">
          <Card
            icon={
              <Leaf className="w-6 h-6 text-green-600 dark:text-green-400" />
            }
            title="Empowerment"
            content="We believe farmers are the backbone of agriculture. HiTerra empowers them with knowledge, technology, and tools to make smarter decisions, improve their livelihoods, and secure a sustainable future."
          />
          <Card
            icon={
              <Zap className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            }
            title="Innovation with Purpose"
            content="Our technology is not just advanced — it is practical, accessible, and designed to solve real problems in farming, from productivity to sustainability."
          />
          <Card
            icon={
              <TreeDeciduous className="w-6 h-6 text-green-600 dark:text-green-400" />
            }
            title="Sustainability"
            content="We are committed to promoting eco-friendly farming practices that protect natural resources, improve soil health, and ensure long-term agricultural resilience."
          />
          <Card
            icon={
              <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            }
            title="Inclusivity"
            content="We bridge the gap for small-scale farmers who often lack access to resources, ensuring that modern agricultural advancements benefit every farmer, not just the largest players."
          />
          <Card
            icon={
              <Globe className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            }
            title="Community & Collaboration"
            content="HiTerra connects farmers, agricultural companies, and researchers, fostering collaboration that strengthens communities and builds a better agricultural ecosystem."
          />
          <Card
            icon={
              <ShieldCheck className="w-6 h-6 text-slate-600 dark:text-slate-400" />
            }
            title="Trust & Transparency"
            content="Farmers and agri-businesses can trust HiTerra to provide accurate, research-backed, and unbiased insights, empowering them to make informed choices."
          />
        </div>
      </div>
    </Container>
  );
}
