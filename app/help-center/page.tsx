import { Metadata } from "next";
import Container from "@/app/components/ui/container";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/accordion";

export const metadata: Metadata = {
  title: "Help Center - HiTerra",
  description:
    "Find answers to common questions about HiTerra. Our help center section is designed to help you quickly find the information you need.",
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
      <div className="py-12 md:py-16">
        <div className="grid md:grid-cols-2 gap-12 md:gap-12">
          {/* Left Block - Headline */}
          <div className="flex flex-col justify-start space-y-2 px-2">
            <h1 className="text-2xl md:text-4xl font-semibold md:font-medium">
              Help Center
            </h1>
            <p className="text-[12px] max-w-lg md:text-base text-gray-600 dark:text-gray-300 leading-relaxed text-pretty">
              Find answers to common questions about HiTerra. <br />
              This section is designed to help you quickly find the information
              you need.
            </p>
          </div>

          {/* Right Block - Q&A Accordion */}
          <div className="space-y-8 px-2 pb-6">
            <Accordion type="single" collapsible className="w-full">
              {/* General Questions Section */}
              <div className="space-y-4">
                <h2 className="text-lg md:text-xl font-semibold border-b border-gray-200 dark:border-gray-700 pb-2 text-left">
                  General Questions
                </h2>

                <AccordionItem value="item-1" className="text-left">
                  <AccordionTrigger className="text-left">
                    What is HiTerra?
                  </AccordionTrigger>
                  <AccordionContent>
                    HiTerra is an AI-powered platform that helps farmers and
                    agricultural companies boost profitability and
                    sustainability. With the HiTerra App, Dashboard, and AI Data
                    Platform, we deliver smart farming solutions to streamline
                    operations and optimize yields.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2" className="text-left">
                  <AccordionTrigger className="text-left">
                    How does the HiTerra App help farmers?
                  </AccordionTrigger>
                  <AccordionContent>
                    HiTerra helps farmers boost efficiency and productivity with
                    AI-powered smart farming recommendations, automated farming
                    cycles, a B2C agri-ecosystem. Besides, we also connect
                    farmer into carbon credit projects to offset their cost.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3" className="text-left">
                  <AccordionTrigger className="text-left">
                    The Benefits of joining carbon credit projects
                  </AccordionTrigger>
                  <AccordionContent>
                    Farmers who adhere to the best practices recommended by
                    HiTerra are eligible to access premium features free of
                    charge. Additionally, they may receive sponsorships for
                    products and services from HiTerra.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4" className="text-left">
                  <AccordionTrigger className="text-left">
                    The criteria to be entitled to join carbon credit projects?
                  </AccordionTrigger>
                  <AccordionContent>
                    Minimum 200 hectares of agricultural land, proof of land
                    ownership, and a past continuous 10 years of agricultural
                    history on the land/not activities of construction or
                    industrialization.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5" className="text-left">
                  <AccordionTrigger className="text-left">
                    How does the HiTerra App help enterprises?
                  </AccordionTrigger>
                  <AccordionContent>
                    HiTerra empowers agricultural companies with AI solutions
                    that streamline cycles, reduce costs, connect to markets,
                    R&D prediction, and faciliate the execution of carbon
                    projects, while building stronger ties with their farming
                    communities. HiTerra is also as a central hub for storing
                    all the carbon credits MRV(Monitoring, Reporting and
                    Verification) records and involved in validations process.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-6" className="text-left">
                  <AccordionTrigger className="text-left">
                    Who do I contact if I have questions?
                  </AccordionTrigger>
                  <AccordionContent>
                    Our Customer Service Team is happy to assist you.
                    <br />
                    📩{" "}
                    <a
                      href="mailto:contact@hiterra.co"
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      contact@hiterra.co
                    </a>
                  </AccordionContent>
                </AccordionItem>
              </div>
            </Accordion>

            {/* HiTerra App Section */}
            <Accordion type="single" collapsible className="w-full">
              <div className="space-y-4">
                <h2 className="text-lg md:text-xl font-semibold border-b border-gray-200 dark:border-gray-700 pb-2 text-left">
                  HiTerra App
                </h2>

                <AccordionItem value="item-7" className="text-left">
                  <AccordionTrigger className="text-left">
                    What features does the HiTerra App offer?
                  </AccordionTrigger>
                  <AccordionContent>
                    The HiTerra Marketplace is a seamless platform designed to
                    connect farmers with high-quality agricultural products,
                    service providers and common practice from local suppliers
                    and sellers.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-8" className="text-left">
                  <AccordionTrigger className="text-left">
                    What is the cost of HiTerra?
                  </AccordionTrigger>
                  <AccordionContent>
                    HiTerra offers two packages: a Free Plan and a Subscription
                    Plan, which can be paid monthly, quarterly, or annually
                    based on your preference. We currently charged RM1/ha in POC
                    phase.
                  </AccordionContent>
                </AccordionItem>
              </div>
            </Accordion>
          </div>
        </div>
      </div>
    </Container>
  );
}
