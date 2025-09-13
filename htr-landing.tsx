"use client";

import { Button } from "@/app/components/ui/button";
import { Footer } from "@/app/components/ui/footer";
import { Input } from "@/app/components/ui/input";
import { ThemeToggle } from "@/app/components/ui/theme-toggle";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner"; // Using sonner for toast notifications

export default function HtrAppLanding() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      const mobileBreakpoint = 768;
      setIsMobile(window.innerWidth < mobileBreakpoint);
    };

    // Initial check
    if (typeof window !== "undefined") {
      checkMobile();
      window.addEventListener("resize", checkMobile);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", checkMobile);
      }
    };
  }, []);

  // After mounting, we can access the theme and ensure it's light on first visit
  useEffect(() => {
    setMounted(true);

    // Check if this is the first visit
    if (typeof window !== "undefined") {
      const isFirstVisit = !localStorage.getItem("visited");

      if (isFirstVisit) {
        // For mobile devices, check if user prefers dark mode
        if (
          isMobile &&
          window.matchMedia &&
          window.matchMedia("(prefers-color-scheme: dark)").matches
        ) {
          setTheme("dark");
        } else {
          setTheme("light");
        }
        localStorage.setItem("visited", "true");
      }
    }
  }, [setTheme, isMobile]);

  // Handle form submission
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    console.log("Submitting email:", email);

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      console.log("Response status:", response.status);
      const data = await response.json();
      console.log("Response data:", data);

      if (response.ok) {
        toast.success("Thank you! We'll be in touch about our app demo.");
        setEmail("");
      } else {
        toast.error(
          data.error || "Signup failed. Please try again or contact support."
        );
        console.error("Error details:", data);
      }
    } catch (error) {
      toast.error(
        "Connection error. Please check your internet and try again."
      );
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle button clicks without affecting theme
  const handleButtonClick = (action: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    // Add your button action logic here
    console.log(`${action} button clicked`);
  };

  // Handle app download based on device type
  const handleDownloadApp = (e: React.MouseEvent) => {
    e.preventDefault();
    const appUrl = "https://app.hiterra.co/app/access/?mode=login";

    // Check if user is on mobile
    if (/Android|iPhone|iPad|iPod|Opera Mini/i.test(navigator.userAgent)) {
      // For mobile users, navigate to the app
      window.location.href = appUrl;

      // Show installation instructions based on device type
      if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        // iOS instructions
        toast.info(
          "To install: Tap the share icon and select 'Add to Home Screen'",
          { duration: 6000 }
        );
      } else if (/Android/i.test(navigator.userAgent)) {
        // Android instructions
        toast.info(
          "To install: Tap the menu (⋮) and select 'Add to Home Screen'",
          { duration: 6000 }
        );
      }
    } else {
      // For desktop users, just redirect to the web app
      window.open(appUrl, "_blank");
    }
  };

  return (
    <div className="flex flex-col min-h-screen dark:bg-gray-950">
      <header className="border-b sticky top-0 z-10 bg-white dark:bg-gray-900 dark:border-gray-800">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Image
              src={
                mounted && theme === "dark"
                  ? "/logos/htrr-logo-horizonta-negative.svg"
                  : "/logos/htr-logo-horizonta-positive.svg"
              }
              alt="Terra Logo"
              width={120}
              height={24}
              className="h-6 md:h-8 w-auto"
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
            <Link
              href="/blog"
              className="text-sm font-medium hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400 transition-colors"
            >
              Insights
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link
              href="https://app.hiterra.co/app/access/?mode=login"
              className="text-sm font-medium hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400 transition-colors hidden md:block"
            >
              Log In
            </Link>
            <ThemeToggle />
            <Button
              className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
              onClick={handleButtonClick("Get Started")}
            >
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
                  <h1 className="text-3xl font-bold tracking-tighter text-[#2c5b2d] dark:text-lake-400 sm:text-5xl xl:text-6xl/none">
                    A Platform that helps farmers and agricultural companies to
                    be more profitable and sustainable
                  </h1>
                  <p className="max-w-[600px] text-gray-700 dark:text-gray-300 md:text-xl">
                    The Hiterra Agro AI platform consists of the Hiterra app,
                    the Hiterra Dashboard Web, and the Hiterra AI Data platform
                  </p>
                </div>
                <div className="w-full max-w-sm space-y-2">
                  <form className="flex gap-2" onSubmit={handleSignUp}>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      className="max-w-lg flex-1 dark:bg-gray-800 dark:border-gray-700"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <Button
                      type="submit"
                      className="bg-[#2c5b2d] hover:bg-lake-600 dark:bg-blue-600 dark:text-gray-900 dark:hover:bg-green-400"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Signing Up..." : "Sign Up"}
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
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-[#2c5b2d] dark:text-lake-400">
                Problem
              </h2>
            </div>
            <div className="mx-auto max-w-4xl">
              <p className="text-xl md:text-2xl text-[#2c5b2d] dark:text-lake-400 mb-8">
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
              <p className="text-xl md:text-2xl text-[#2c5b2d] dark:text-lake-400">
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
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-[#2c5b2d] dark:text-lake-400">
                Solution
              </h2>
            </div>
            <div className="mx-auto max-w-4xl">
              <p className="text-xl md:text-2xl text-[#2c5b2d] dark:text-lake-400 mb-8">
                Hiterra Argo addresses these challenges by providing an
                AI-powered platform that delivers{" "}
                <span className="underline">smart farming recommendations</span>
                ,{" "}
                <span className="underline">
                  automates agricultural cycles and tasks
                </span>
              </p>
              <p className="text-xl md:text-2xl text-[#2c5b2d] dark:text-lake-400 mb-8">
                The platform offers a marketplace for products and services, as
                well as community forum for sharing knowledge, enabling farmers
                to increase efficiency, reduce costs, and enhance overall
                productivity.
              </p>
              <p className="text-xl md:text-2xl text-[#2c5b2d] dark:text-lake-400 font-bold">
                By implementing Hiterra Agro System, farmer and agricultural
                companies are able to reduce more than 85% labour and 70%
                time-saving.
              </p>
            </div>
          </div>
        </section>

        <section
          id="why-us"
          className="py-12 md:py-24 lg:py-32 bg-[#f5f5f5] dark:bg-blue-950"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-[#2c5b2d] dark:text-lake-400">
                Why Choose Us
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="bg-[#2c5b2d] dark:bg-blue-900 text-white p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4">Expert Team</h3>
                <p>
                  Our skilled team brings specialized knowledge and experience
                  to provide top-notch solutions tailored to our clients' needs.
                </p>
              </div>
              <div className="bg-[#2c5b2d] dark:bg-blue-900 text-white p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4">
                  Cutting-Edge Technology
                </h3>
                <p>
                  We use the latest tools and AI technology to stay ahead,
                  ensuring efficient and effective services.
                </p>
              </div>
              <div className="bg-[#2c5b2d] dark:bg-blue-900 text-white p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4">Customer Focus</h3>
                <p>
                  We prioritize building strong relationships and understanding
                  our clients' needs, leading to long-term partnerships based on
                  trust and satisfaction.
                </p>
              </div>
              <div className="bg-[#2c5b2d] dark:bg-blue-900 text-white p-6 rounded-lg">
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
              <div className="space-y-4 text-center lg:text-left">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Transform Your Farm?
                </h2>
                <p className="max-w-[600px] text-blue-50 md:text-xl mx-auto lg:mx-0">
                  Join thousands of farmers who are already using our platform
                  to optimize their operations and increase profitability.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-end">
                <Button
                  className="bg-white focus:text-blue-600 !text-blue-600 hover:text-white dark:!text-white dark:hover:!bg-blue-900 hover:bg-lake-400 dark:hover:!text-green-400 px-8 py-6 h-auto font-medium text-base"
                  onClick={handleButtonClick("Start Free Trial")}
                >
                  Start Free Trial
                </Button>
                <Button
                  variant="outline"
                  className="border-white dark:border-none border-2 bg-blue-700 text-white px-8 py-6 h-auto font-medium text-base hover:bg-blue-800 hover:text-gray-800 focus:text-white active:text-white dark:bg-blue-900 dark:hover:text-lake-400"
                  onClick={handleDownloadApp}
                >
                  Download WebApp
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
