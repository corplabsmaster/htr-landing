import { Metadata } from "next";
import Image from "next/image";
import Container from "@/app/components/ui/container";
import Card from "@/app/components/ui/card";
import {
  Database,
  Calendar,
  DollarSign,
  Target,
  TrendingUp,
  Users,
  Linkedin,
  Building2,
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Investor Deck - HiTerra AI | Investment Updates & News",
  description:
    "Stay updated with HiTerra's latest investment news, financial updates, and growth milestones in AgriTech AI solutions and sustainable farming technology.",
  keywords:
    "HiTerra investors, AgriTech investment, sustainable farming investment, agricultural technology news",
  robots: {
    index: true,
    follow: true,
  },
};

export default function InvestorPage() {
  return (
    <Container>
      {/* Hero Section */}
      <div className="py-8 md:py-12">
        <div className="text-center mb-12">
          <h1 className="text-2xl md:text-4xl font-bold mb-4">Investor Deck</h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Join us in transforming agriculture through data intelligence and
            sustainable farming solutions
          </p>
        </div>

        {/* 1. Company Overview */}
        <section className="mb-16 md:mb-20">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-blue-700 dark:text-blue-400 text-center">
            Company Overview
          </h2>
          <div className="bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950/30 dark:to-green-950/30 p-6 md:p-10 rounded-xl">
            <p className="text-sm md:text-lg text-gray-700 dark:text-gray-200 leading-relaxed">
              Hiterra is an agritech platform that empowers farmers and
              agricultural companies to increase profitability and
              sustainability. We combine data intelligence, community-driven
              insights, and modern farming solutions to optimize processes and
              reduce inefficiencies across the agriculture value chain.
            </p>
          </div>
        </section>

        {/* 2. Problem */}
        <section className="mb-16 md:mb-20">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-blue-700 dark:text-blue-400 text-center">
            Problem
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card
              icon={<Database className="w-6 h-6 text-red-600" />}
              title="Data Deficiency"
              content="Lack of reliable, real-time information to guide decision-making."
            />
            <Card
              icon={<Calendar className="w-6 h-6 text-orange-600" />}
              title="Outdated Methods"
              content="Reliance on traditional practices that limit productivity."
            />
            <Card
              icon={<DollarSign className="w-6 h-6 text-yellow-600" />}
              title="Financial Barriers"
              content="Limited access to affordable solutions and resources for modernization."
            />
          </div>
        </section>

        {/* 3. Technology / Solution */}
        <section className="mb-16 md:mb-20">
          <h2 className="textxl md:text-3xl font-bold mb-6 text-blue-700 dark:text-blue-400 text-center">
            Technology / Solution
          </h2>
          <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950/30 dark:to-blue-950/30 p-6 md:p-10 rounded-xl">
            <p className="text-sm md:text-lg text-gray-700 dark:text-gray-200 leading-relaxed">
              Hiterra provides a digital platform that integrates farm data,
              AI-driven insights, and decision-support tools. Our solution helps
              farmers monitor, plan, and optimize operations while connecting
              them with resources and financial opportunities. By merging
              technology with localized agricultural knowledge, we deliver
              scalable, practical solutions for smallholders and enterprises
              alike.
            </p>
          </div>
        </section>

        {/* 4. Market Opportunity */}
        <section className="mb-16 md:mb-20">
          <h2 className="text-xl md:text-3xl font-bold mb-6 text-blue-700 dark:text-blue-400 text-center">
            Market Opportunity
          </h2>
          <div className="space-y-6">
            <div className="p-6 rounded-xl bg-white dark:bg-gray-800/50 shadow-lg border-l-4 border-blue-600">
              <p className="text-base md:text-lg text-gray-700 dark:text-gray-200">
                Agriculture contributes about{" "}
                <span className="font-bold text-blue-700 dark:text-blue-400">
                  8.16% of Malaysia's GDP
                </span>{" "}
                as of 2024.{" "}
                <a
                  href="https://www.theglobaleconomy.com/Malaysia/share_of_agriculture/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  [TheGlobalEconomy.com]
                </a>
              </p>
            </div>
            <div className="p-6 rounded-xl bg-white dark:bg-gray-800/50 shadow-lg border-l-4 border-green-600">
              <p className="text-base md:text-lg text-gray-700 dark:text-gray-200">
                Gross output value of Malaysia's agriculture sector grew from{" "}
                <span className="font-bold text-green-700 dark:text-green-400">
                  ~RM 82.2 billion (2020) to ~RM 101.3 billion in 2021
                </span>
                .{" "}
                <a
                  href="https://www.dosm.gov.my/portal-main/release-content/0ae5d1df-8ba9-11ed-96a6-1866daa77ef9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  [Department of Statistics Malaysia]
                </a>
              </p>
            </div>
            <div className="p-6 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 shadow-lg border-l-4 border-purple-600">
              <p className="text-base md:text-lg text-gray-700 dark:text-gray-200 mb-3">
                Global carbon credit market was valued at{" "}
                <span className="font-bold text-purple-700 dark:text-purple-400">
                  ~USD 479.4 billion in 2023
                </span>
                , and is projected to reach{" "}
                <span className="font-bold text-purple-700 dark:text-purple-400">
                  ~USD 4.73 trillion by 2030
                </span>
                , growing at a CAGR of ~38.7%.{" "}
                <a
                  href="https://www.grandviewresearch.com/horizon/outlook/carbon-credit-market-size/global"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  [Grand View Research]
                </a>
              </p>
              <p className="text-base md:text-lg text-gray-700 dark:text-gray-200">
                Another projection: carbon credit market size expected to grow
                from ~USD 933 billion in 2025 to{" "}
                <span className="font-bold text-purple-700 dark:text-purple-400">
                  ~USD 16.38 trillion by 2034
                </span>{" "}
                at a CAGR of ~37.7%.
              </p>
            </div>
          </div>
        </section>

        {/* 5. Traction / Key Achievements */}
        <section className="mb-16 md:mb-20">
          <h2 className="text-xl md:text-3xl font-bold mb-6 text-blue-700 dark:text-blue-400 text-center">
            Traction / Key Achievements
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-white dark:bg-gray-800/50 shadow-lg">
              <div className="flex items-start gap-3">
                <div className="text-2xl">✅</div>
                <div>
                  <h3 className="font-semibold text-base md:text-lg mb-2">
                    MVP Launch
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">
                    Minimal viable product launch (TRL 7)
                  </p>
                </div>
              </div>
            </div>
            <div className="p-6 rounded-xl bg-white dark:bg-gray-800/50 shadow-lg">
              <div className="flex items-start gap-3">
                <div className="text-2xl">🌾</div>
                <div>
                  <h3 className="font-semibold text-base md:text-lg mb-2">
                    Carbon Credit POC
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">
                    Carbon Credit POC on paddy with Jati and Bursa Verra
                  </p>
                </div>
              </div>
            </div>
            <div className="p-6 rounded-xl bg-white dark:bg-gray-800/50 shadow-lg">
              <div className="flex items-start gap-3">
                <div className="text-2xl">🚀</div>
                <div>
                  <h3 className="font-semibold text-base md:text-lg mb-2">
                    SIDEC DeepX
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">
                    Sidec Deepx Cohort 25 Semi Finalist
                  </p>
                </div>
              </div>
            </div>
            <div className="p-6 rounded-xl bg-white dark:bg-gray-800/50 shadow-lg">
              <div className="flex items-start gap-3">
                <div className="text-2xl">💡</div>
                <div>
                  <h3 className="font-semibold text-base md:text-lg mb-2">
                    Cradle Fund
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">
                    Shortlisted by Cradle Fund
                  </p>
                </div>
              </div>
            </div>
            <div className="p-6 rounded-xl bg-white dark:bg-gray-800/50 shadow-lg md:col-span-2 lg:col-span-1">
              <div className="flex items-start gap-3">
                <div className="text-2xl">🏛️</div>
                <div>
                  <h3 className="font-semibold text-base md:text-lg mb-2">
                    Government Recognition
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">
                    Private Launch to Ministry of Plantation and Commodities
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5.5. Target Market */}
        <section className="mb-16 md:mb-20">
          <h2 className="text-xl md:text-3xl font-bold mb-6 text-blue-700 dark:text-blue-400 text-center">
            Target Market
          </h2>
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950/30 dark:to-green-950/30 p-6 md:p-8 rounded-xl">
              <p className="text-base md:text-lg text-gray-700 dark:text-gray-200 leading-relaxed mb-2">
                Small to medium-sized farms and agribusinesses, starting with
                Malaysia's paddy sector.
              </p>
              <p className="text-base md:text-lg text-gray-700 dark:text-gray-200 leading-relaxed">
                Total addressable market spans millions of hectares of arable
                land.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800/50 p-6 md:p-8 rounded-xl shadow-lg">
              <div className="mb-6">
                <h3 className="text-base md:text-lg font-semibold mb-2 flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-600" />
                  National Paddy Farmers
                </h3>
                <p className="text-base md:text-lg text-gray-700 dark:text-gray-200">
                  <span className="font-bold">~322,830</span> (FFTC summary).{" "}
                  <span className="text-blue-600">
                    FFTC Agricultural Policy
                  </span>
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-base md:text-lg font-semibold mb-3 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  Peninsular Paddy Area
                </h3>
                <p className="text-base md:text-lg text-gray-700 dark:text-gray-200 mb-4">
                  <span className="font-bold">~416,000 ha</span> (total planted
                  area in granary areas)
                </p>

                {/* Table */}
                <div className="overflow-x-auto">
                  <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg mb-2">
                    <h4 className="font-semibold text-xs md:text-sm mb-2">
                      Table 1. List of paddy granary areas, 2022
                    </h4>
                  </div>
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-200 dark:bg-gray-700">
                        <th className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-sm md:text-base font-semibold">
                          No.
                        </th>
                        <th className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-sm md:text-base font-semibold">
                          Paddy Granary Areas
                        </th>
                        <th className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-sm md:text-base font-semibold text-right">
                          Land Areas (ha)
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm md:text-base">
                          1.
                        </td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm md:text-base">
                          Muda Agricultural Development Area (MADA)
                        </td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm md:text-base text-right font-semibold">
                          201,306
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm md:text-base">
                          2.
                        </td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm md:text-base">
                          Kemubu Agricultural Development Area (KADA)
                        </td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm md:text-base text-right font-semibold">
                          52,164
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm md:text-base">
                          3.
                        </td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm md:text-base">
                          Krian, Integrated Agriculture Development Area (IADA)
                        </td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm md:text-base text-right font-semibold">
                          38,672
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm md:text-base">
                          4.
                        </td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm md:text-base">
                          West Coast Selangor (IADA)
                        </td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm md:text-base text-right font-semibold">
                          36,004
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm md:text-base">
                          5.
                        </td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm md:text-base">
                          IADA, Penang
                        </td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm md:text-base text-right font-semibold">
                          24,210
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm md:text-base">
                          6.
                        </td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm md:text-base">
                          IADA, Seberang Perak
                        </td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm md:text-base text-right font-semibold">
                          26,296
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm md:text-base">
                          7.
                        </td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm md:text-base">
                          IADA, KETARA
                        </td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm md:text-base text-right font-semibold">
                          9,752
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm md:text-base">
                          8.
                        </td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm md:text-base">
                          IADA, Kemasin Semarak
                        </td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm md:text-base text-right font-semibold">
                          8,129
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm md:text-base">
                          9.
                        </td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm md:text-base">
                          IADA, Pekan
                        </td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm md:text-base text-right font-semibold">
                          4,764
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm md:text-base">
                          10.
                        </td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm md:text-base">
                          IADA, Rompin
                        </td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm md:text-base text-right font-semibold">
                          5,158
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm md:text-base">
                          11.
                        </td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm md:text-base">
                          IADA, Kota Belud
                        </td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm md:text-base text-right font-semibold">
                          8,860
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm md:text-base">
                          12.
                        </td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm md:text-base">
                          IADA, Batang Lupar
                        </td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm md:text-base text-right font-semibold">
                          1,121
                        </td>
                      </tr>
                      <tr className="bg-blue-100 dark:bg-blue-900/30 font-bold">
                        <td
                          className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-sm md:text-base"
                          colSpan={2}
                        >
                          TOTAL
                        </td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-sm md:text-base text-right">
                          416,436
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-2 italic">
                    Source: Department of Agriculture, Malaysia
                  </p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                <p className="text-base md:text-lg text-gray-700 dark:text-gray-200 leading-relaxed">
                  In a future phase, we will expand our target market to include
                  all farmers in Malaysia while adding support for a wider
                  variety of crops.
                </p>
              </div>

              <div className="mt-6 space-y-3">
                <p className="text-base md:text-lg text-gray-700 dark:text-gray-200 leading-relaxed">
                  The total arable land in Malaysia is approximately{" "}
                  <span className="font-bold">825,000 to 826,000 hectares</span>
                  , which represents about 2.5% of the country's total land area
                  as of 2022-2025
                </p>
                <p className="text-base md:text-lg text-gray-700 dark:text-gray-200 leading-relaxed">
                  Total agriculture holders who would benefit (including farm
                  enterprises):{" "}
                  <span className="font-bold text-blue-700 dark:text-blue-400">
                    1,030,020
                  </span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 6. The Ask */}
        <section className="mb-16 md:mb-20">
          <h2 className="text-xl md:text-3xl font-bold mb-6 text-blue-700 dark:text-blue-400 text-center">
            The Ask
          </h2>
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/30 dark:to-blue-950/30 p-6 md:p-10 rounded-xl shadow-lg">
            <p className="text-base md:text-lg text-gray-700 dark:text-gray-200 leading-relaxed mb-6">
              We are seeking:
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <DollarSign className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-base md:text-lg mb-1">
                    Funding (Grant)
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">
                    To accelerate product development and expand pilot programs.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Users className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-base md:text-lg mb-1">
                    Partnerships
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">
                    With agribusinesses, cooperatives, and government agencies.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <TrendingUp className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-base md:text-lg mb-1">
                    Support
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">
                    From ecosystem players to scale adoption and drive
                    sustainable agriculture impact.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Management Team */}
        <section className="mb-16 md:mb-20">
          <h2 className="text-xl md:text-3xl font-bold mb-6 text-blue-700 dark:text-blue-400 text-center">
            Management Team
          </h2>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Dayrl Lee */}
            <div className="bg-white dark:bg-gray-800/50 p-6 rounded-xl shadow-lg">
              <div className="flex flex-col items-center text-center gap-4">
                <div className="relative w-32 h-32 rounded-full overflow-hidden">
                  <Image
                    src="/images/team/dayrl.webp"
                    alt="Dayrl Lee - CEO, Product Engineer"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold mb-1">
                    Dayrl Lee
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mb-3">
                    CEO, Product Engineer
                  </p>
                  <Link
                    href="https://www.linkedin.com/in/dayrl10"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    <Linkedin className="w-5 h-5" />
                    LinkedIn
                  </Link>
                  <div className="relative w-auto h-28 mt-1 mx-auto">
                    <Image
                      src="/images/team/dayrl-1.png"
                      alt="Previous Company"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Ken Tew */}
            <div className="bg-white dark:bg-gray-800/50 p-6 rounded-xl shadow-lg">
              <div className="flex flex-col items-center text-center gap-4">
                <div className="relative w-32 h-32 rounded-full overflow-hidden">
                  <Image
                    src="/images/team/ken.webp"
                    alt="Ken Tew - COO, Product Designer"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold mb-1">Ken Tew</h3>
                  <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mb-3">
                    COO, Product Designer
                  </p>
                  <Link
                    href="https://www.linkedin.com/in/kenyonyi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    <Linkedin className="w-5 h-5" />
                    LinkedIn
                  </Link>
                  <div className="relative w-auto h-28 mt-1 mx-auto">
                    <Image
                      src="/images/team/ken-1.png"
                      alt="Previous Company"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Charles Yap */}
            <div className="bg-white dark:bg-gray-800/50 p-6 rounded-xl shadow-lg">
              <div className="flex flex-col items-center text-center gap-4">
                <div className="relative w-32 h-32 rounded-full overflow-hidden">
                  <Image
                    src="/images/team/bfs-2.webp"
                    alt="Charles Yap - Agri-Innovation Advisor"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold mb-1">
                    Charles Yap
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">
                    Agri-Innovation Advisor
                    <br />
                    10 Years of Agriculture Experience
                  </p>
                  <div className="relative w-auto h-24 mt-1 mx-auto">
                    <Image
                      src="/images/team/bfs-3.png"
                      alt="Previous Company"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* KC Lim */}
            <div className="bg-white dark:bg-gray-800/50 p-6 rounded-xl shadow-lg">
              <div className="flex flex-col items-center text-center gap-4">
                <div className="relative w-32 h-32 rounded-full overflow-hidden">
                  <Image
                    src="/images/team/bfs-1.webp"
                    alt="KC Lim - Agribusiness Advisor"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold mb-1">KC Lim</h3>
                  <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">
                    Agribusiness Advisor
                    <br />
                    10 Years of Agriculture Experience
                  </p>
                  <div className="relative w-auto h-24 mt-1 mx-auto">
                    <Image
                      src="/images/team/bfs-3.png"
                      alt="Previous Company"
                      fill
                      className="object-contain dark:invert-50"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Our Experience */}
          <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950/30 dark:to-blue-950/30 p-6 md:p-10 rounded-xl shadow-lg">
            <h3 className="text-xl md:text-2xl font-bold mb-6">
              Our Experience
            </h3>
            <p className="text-sm md:text-md text-gray-700 dark:text-gray-200 leading-relaxed mb-6">
              HiTerra advisors & research teams have extensive experience and
              proven expertise in improving crop yields for local projects:
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3">
                <span className="text-green-600 text-md flex-shrink-0">✓</span>
                <span className="text-sm md:text-lg text-gray-700 dark:text-gray-200">
                  5,000 acres of rice project at Chui Chok, Malaysia
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 text-xmd flex-shrink-0">✓</span>
                <span className="text-sm md:text-lg text-gray-700 dark:text-gray-200">
                  Nestlé's 2,000-acre rice project in Malaysimd
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 text-xmd flex-shrink-0">✓</span>
                <span className="text-sm md:text-lg text-gray-700 dark:text-gray-200">
                  PLS Group's 4,000-acre rice project in Sekinchan, Malaysia
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 text-md flex-shrink-0">✓</span>
                <span className="text-sm md:text-lg text-gray-700 dark:text-gray-200">
                  10,000 acres of rice project in Kedah with Thean Peng Rice &
                  Oil
                </span>
              </li>
            </ul>
            <p className="text-sm md:text-md text-gray-700 dark:text-gray-200 leading-relaxed">
              Moreover, our advisors and their teams have built strong
              partnerships with{" "}
              <span className="font-bold">
                nearly 100 universities and research institutions worldwide
              </span>
              , including local institutions{" "}
              <span className="font-bold">UTAR, UPM</span>, providing direct
              access to cutting-edge agricultural research and expertise.
            </p>
          </div>
        </section>
      </div>
    </Container>
  );
}
