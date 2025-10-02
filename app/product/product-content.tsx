"use client";

import { useState } from "react";
import Container from "@/app/components/ui/container";
import { ContentSection } from "@/app/components/ui/content-section";
import { Tab } from "@/app/components/ui/tab";

export function ProductContent() {
  const [activeTab, setActiveTab] = useState("impact");

  const ImpactContent = (
    <>
      {/* For Beginners */}
      <ContentSection
        headline="🌱 For Beginners"
        leftContent="Starting out in farming is easier with step-by-step AI recommendations, practical tips, and a supportive community. Beginners can optimize harvest from day one, gaining confidence as they learn and grow."
        rightContent="/images/product/beginner_farmer.webp"
        imageLeft={false}
      />

      {/* For Farmers */}
      <ContentSection
        headline="🌾 For Farmers"
        leftContent="/images/product/farmer_working.webp"
        rightContent="Practical, easy-to-use tools make daily farming more efficient. The mobile app helps manage schedules, sends task notifications, and delivers AI recommendations tailored to specific crops. Soil testing identifies the best crops for each plot, while access to a marketplace and community forum reduces costs, increases yields, and supports smarter farming."
        imageLeft={true}
      />

      {/* For Enterprises */}
      <ContentSection
        headline="🏢 For Enterprises"
        leftContent="Managing large-scale farmland is streamlined through AI-driven analytics, resource optimization, and task automation. Enterprises gain access to a digital marketplace, community engagement tools, and carbon credit contributions  — all designed to cut costs, improve efficiency, and optimize harvest across their networks."
        rightContent="/images/product/farm_enterprise_land.webp"
        imageLeft={false}
      />

      {/* For Product Providers */}
      <ContentSection
        headline="🛒 For Product Providers"
        leftContent="/images/product/farm_product_provider.jpg"
        rightContent="Agricultural input providers, such as fertilizer companies, can monitor how their products are being used in the field. This ensures farmers apply inputs effectively while generating valuable insights into product performance and customer needs."
        imageLeft={true}
      />

      {/* For Service Providers */}
      <ContentSection
        headline="🔧 For Service Providers"
        leftContent="Agricultural service providers, such as drone spraying companies, can efficiently manage operations with task tracking in real time. This improves accountability, enhances service delivery, and boosts customer satisfaction."
        rightContent="/images/product/drone_services_provider.webp"
        imageLeft={false}
      />
    </>
  );

  const FeatureContent = (
    <>
      {/* Keep All Your Land Data */}
      <ContentSection
        headline="Keep All Your Land Data in <span class='text-blue-700 dark:text-blue-500'>One</span>"
        leftContent="/images/product/screen/home.png"
        rightContent="Unify every detail of your farm into one digital platform. From soil health to crop cycles, all land data stays connected in a single system, making it easier to analyze, plan, and optimize harvests."
        imageLeft={true}
        imageClassName="object-contain"
        isFeatureSection={true}
      />

      {/* Task Recommendation */}
      <ContentSection
        headline={
          "Task Recommendation with\n<span class='text-blue-700 dark:text-blue-500'>TerraMind</span> AI-Powered"
        }
        leftContent="TerraMind's AI goes beyond reminders — it recommends the right tasks at the right time based on soil data, weather, and crop cycles. Farmers and enterprises gain actionable insights that improve planning, reduce wasted effort, and optimize harvest results."
        rightContent="/images/product/screen/create-cycle.png"
        headlineClassName="whitespace-pre-line"
        imageLeft={false}
        imageClassName="object-contain"
        isFeatureSection={true}
      />

      {/* Create and Assign Tasks */}
      <ContentSection
        headline="Create and Assign Different <span class='text-blue-700 dark:text-blue-500'>Tasks</span> to Worker under Cycles"
        leftContent="/images/product/screen/task-assign.png"
        rightContent="Digitise task management by assigning responsibilities directly within seasonal or crop cycles. This connected ecosystem ensures accountability and helps teams work smarter across the farm."
        imageLeft={true}
        imageClassName="object-contain"
        isFeatureSection={true}
      />

      {/* Explore Products */}
      <ContentSection
        headline={
          "Explore Different <span class='text-blue-700 dark:text-blue-500'>Products</span> with\nProven Results"
        }
        leftContent="Find trusted farming solutions within the TerraLink ecosystem. From fertilizers to biostimulants, discover products tested in the field and proven to optimize harvest results."
        rightContent="/images/product/screen/explore-marketplace.png"
        imageLeft={false}
        imageClassName="object-contain"
        isFeatureSection={true}
      />

      {/* List Services */}
      <ContentSection
        headline={
          "List Your Services or Products in our <span class='text-blue-700 dark:text-blue-500'>TerraLink</span> ecosystem"
        }
        headlineClassName="whitespace-pre-line"
        leftContent="/images/product/screen/list-product-service.png"
        rightContent="Showcase your agricultural solutions inside TerraLink. Providers can integrate their services and products into a thriving ecosystem, connecting with farmers and contributing to the future of digital farming."
        imageLeft={true}
        imageClassName="object-contain"
        isFeatureSection={true}
      />
    </>
  );

  const tabs = [
    {
      id: "impact",
      label: "Impact",
      content: ImpactContent,
    },
    {
      id: "features",
      label: "Features",
      content: FeatureContent,
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <Container>
        <div className="py-12 md:py-16 text-center">
          <h1 className="text-2xl md:text-4xl font-semibold md:font-medium mb-2 md:mb-6">
            HiTerra APP
          </h1>
          <p className="text-base md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Help farmers and agricultural companies to be more profitable and
            sustainable and reap higher yields with &nbsp;
            <span className="inline-block items-baseline">
              HiTerra
              <span className="text-[18px] align-text-top font-extralight font-mono">
                ™
              </span>{" "}
              TerraCore AI
            </span>
          </p>
        </div>
      </Container>

      <Tab
        className="dark:bg-gray-950"
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <Container className="pt-4">
        {tabs.find((tab) => tab.id === activeTab)?.content}
      </Container>
    </>
  );
}
