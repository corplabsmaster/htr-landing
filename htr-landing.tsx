"use client";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";

export default function FarmAppLanding() {
  const { theme } = useTheme();

  return (
    <div className="flex flex-col min-h-screen dark:bg-gray-950">
      <header className="border-b sticky top-0 z-10 bg-white dark:bg-gray-900 dark:border-gray-800">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Image
              src={
                theme === "dark"
                  ? "/logos/htrr-logo-horizonta-negative.svg"
                  : "/logos/htr-logo-horizonta-positive.svg"
              }
              alt="Terra Logo"
              width={120}
              height={24}
              className="h-8 w-auto"
            />
          </div>
          <nav className="hidden md:flex gap-6">
            <Link
              href="#problem"
              className="text-sm font-medium hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400 transition-colors"
            >
              Problem
            </Link>
            <Link
              href="#solution"
              className="text-sm font-medium hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400 transition-colors"
            >
              Solution
            </Link>
            <Link
              href="#why-us"
              className="text-sm font-medium hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400 transition-colors"
            >
              Why Us
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link
              href="#"
              className="text-sm font-medium hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400 transition-colors hidden md:block"
            >
              Log In
            </Link>
            <ThemeToggle />
            <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800">
              Get Started
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="py-12 md:py-24 lg:py-32 bg-gradient-to-b from-lime-300 to-white dark:from-blue-900 dark:to-gray-950">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <Image
                src="/images/high-angle-farmland-view.jpg"
                width={800}
                height={500}
                alt="Aerial view of organized green farmland with rows of crops"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
              />
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter text-[#2c5b2d] dark:text-[#2ae1ac] sm:text-5xl xl:text-6xl/none">
                    A Platform that helps farmers and agricultural companies to
                    be more profitable and sustainable
                  </h1>
                  <p className="max-w-[600px] text-gray-700 dark:text-gray-300 md:text-xl">
                    The Hiterra Agro AI platform consists of the Hiterra app,
                    the Hiterra Dashboard Web, and the Hiterra AI Data platform
                  </p>
                </div>
                <div className="w-full max-w-sm space-y-2">
                  <form className="flex gap-2">
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      className="max-w-lg flex-1 dark:bg-gray-800 dark:border-gray-700"
                    />
                    <Button
                      type="submit"
                      className="bg-[#2c5b2d] hover:bg-[#1e3e1f] dark:bg-[#2ae1ac] dark:text-gray-900 dark:hover:bg-[#1bc393]"
                    >
                      Sign Up
                    </Button>
                  </form>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Sign up to get notified when we launch.{" "}
                    <Link
                      href="/terms"
                      className="underline underline-offset-2"
                    >
                      Terms &amp; Conditions
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="problem"
          className="py-12 md:py-24 lg:py-32 bg-[#f5f5f5] dark:bg-gray-900"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-[#2c5b2d] dark:text-[#2ae1ac]">
                Problem
              </h2>
            </div>
            <div className="mx-auto max-w-4xl">
              <p className="text-xl md:text-2xl text-[#2c5b2d] dark:text-[#2ae1ac] mb-8">
                Farmers and agricultural companies face several challenges,
                including{" "}
                <span className="underline">
                  reliance on outdated practices
                </span>
                ,{" "}
                <span className="underline">
                  the complexity of farm management tools
                </span>
                ,{" "}
                <span className="underline">
                  difficulty in choosing cost-effective products
                </span>
              </p>
              <p className="text-xl md:text-2xl text-[#2c5b2d] dark:text-[#2ae1ac]">
                These issues result in{" "}
                <span className="underline">higher operational costs</span>,{" "}
                <span className="underline">
                  lower yields, and underutilized resources
                </span>
                , preventing farmers from optimizing their agricultural
                processes and maximizing productivity.
              </p>
            </div>
          </div>
        </section>

        <section
          id="solution"
          className="py-12 md:py-24 lg:py-32 dark:bg-gray-950"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-[#2c5b2d] dark:text-[#2ae1ac]">
                Solution
              </h2>
            </div>
            <div className="mx-auto max-w-4xl">
              <p className="text-xl md:text-2xl text-[#2c5b2d] dark:text-[#2ae1ac] mb-8">
                Hiterra Argo addresses these challenges by providing an
                AI-powered platform that delivers{" "}
                <span className="underline">smart farming recommendations</span>
                ,{" "}
                <span className="underline">
                  automates agricultural cycles and tasks
                </span>
              </p>
              <p className="text-xl md:text-2xl text-[#2c5b2d] dark:text-[#2ae1ac] mb-8">
                The platform offers a marketplace for products and services, as
                well as community forum for sharing knowledge, enabling farmers
                to increase efficiency, reduce costs, and enhance overall
                productivity.
              </p>
              <p className="text-xl md:text-2xl text-[#2c5b2d] dark:text-[#2ae1ac] font-bold">
                By implementing Hiterra Agro System, farmer and agricultural
                companies are able to reduce more than 85% labour and 70%
                time-saving.
              </p>
            </div>
          </div>
        </section>

        <section
          id="why-us"
          className="py-12 md:py-24 lg:py-32 bg-[#f5f5f5] dark:bg-gray-900"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-[#2c5b2d] dark:text-[#2ae1ac]">
                Why Choose Us
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="bg-[#2c5b2d] dark:bg-gray-800 text-white p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4">Expert Team</h3>
                <p>
                  Our skilled team brings specialized knowledge and experience
                  to provide top-notch solutions tailored to our clients' needs.
                </p>
              </div>
              <div className="bg-[#2c5b2d] dark:bg-gray-800 text-white p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4">
                  Cutting-Edge Technology
                </h3>
                <p>
                  We use the latest tools and technology to stay ahead, ensuring
                  efficient and effective services.
                </p>
              </div>
              <div className="bg-[#2c5b2d] dark:bg-gray-800 text-white p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4">Customer Focus</h3>
                <p>
                  We prioritize building strong relationships and understanding
                  our clients' needs, leading to long-term partnerships based on
                  trust and satisfaction.
                </p>
              </div>
              <div className="bg-[#2c5b2d] dark:bg-gray-800 text-white p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4">Proven Success</h3>
                <p>
                  With a track record of successful projects, we've earned a
                  reputation for reliability and excellence, setting us apart
                  from the competition.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-24 lg:py-32 bg-blue-600 text-white dark:bg-blue-800">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Transform Your Farm?
                </h2>
                <p className="max-w-[600px] text-blue-50 md:text-xl">
                  Join thousands of farmers who are already using our platform
                  to optimize their operations and increase profitability.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center lg:justify-end">
                <Button className="bg-white text-blue-600 hover:bg-lime-300 dark:hover:bg-[#2ae1ac]">
                  Start Free Trial
                </Button>
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-blue-700 dark:hover:bg-blue-900"
                >
                  Schedule Demo
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t bg-white dark:bg-gray-900 dark:border-gray-800">
        <div className="container flex flex-col gap-6 py-8 md:py-12 px-4 md:px-6">
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Image
                  src={
                    theme === "dark"
                      ? "/logos/htrr-logo-horizonta-negative.svg"
                      : "/logos/htr-logo-horizonta-positive.svg"
                  }
                  alt="Terra Logo"
                  width={120}
                  height={24}
                  className="h-8 w-auto"
                />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Smart farming solutions for modern agriculture. Streamline
                operations and increase yields.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="font-bold dark:text-white">Platform</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-sm text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                  >
                    Mobile App
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                  >
                    AI Data Platform
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                  >
                    Marketplace
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="font-bold dark:text-white">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-sm text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                  >
                    Press
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="font-bold dark:text-white">Support</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-sm text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                  >
                    Community
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                  >
                    Status
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row justify-between items-center border-t pt-6 dark:border-gray-800">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} hiterra. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Link
                href="#"
                className="text-xs text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-xs text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="#"
                className="text-xs text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
