"use client";

import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

export default function ComingSoonDescriptionPage() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          inquiry: ["From_Coming_Soon_Carbon"],
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Thank you! We'll notify you when we launch.");
        setEmail("");
      } else {
        toast.error(data.error || "Signup failed. Please try again.");
      }
    } catch (error) {
      toast.error(
        "Connection error. Please check your internet and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-lime-300/40 via-white via-30% to-white dark:from-blue-900 dark:to-gray-950">
      <div className="min-h-[80vh] flex flex-col items-center justify-center py-16 px-4 ">
        {/* Logo */}
        <div className="mb-8">
          <Image
            src="/logos/htr-logo-horizonta-positive.svg"
            alt="HiTerra Logo"
            width={180}
            height={36}
            className="h-8 w-auto dark:hidden"
          />
          <Image
            src="/logos/htrr-logo-horizonta-negative.svg"
            alt="HiTerra Logo"
            width={180}
            height={36}
            className="h-8 w-auto hidden dark:block"
          />
        </div>

        {/* Coming Soon Text */}
        <h1 className="text-2xl md:text-5xl font-bold text-center mb-4 text-[#2c5b2d] dark:text-lake-400">
          TerraCarbon
        </h1>

        {/* Description */}
        <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 text-center px-4 mb-8 max-w-2xl text-pretty">
          Our upcoming Carbon Accounting Platform will revolutionize how
          agricultural businesses track, manage, and automate their carbon
          footprint.
          {/* in Scope 1, 2, and 3 emissions.  */}
          <br />
          <br />
          <span className="text-base">
            <b>Key Features Coming Soon:</b>
            <br />
            • Carbon Project Management
            <br />
            • Real-time carbon data tracking
            <br />
            • Automated emissions calculations
            <br />
            • Carbon offset history
            <br />• Compliance reporting tools
          </span>
          <br />
          <br />
          Join our waitlist to be among the first to access these groundbreaking
          features!
        </p>

        {/* Back to Home Button */}
        <Link href="/">
          <Button className="bg-[#2c5b2d] hover:bg-[#234724] text-white dark:bg-blue-600 dark:hover:bg-blue-700 px-4 py-3 h-auto text-sm">
            Back to Home
          </Button>
        </Link>

        {/* Email Signup Form */}
        <div className="mt-12 w-full max-w-md space-y-2">
          <form
            className="flex justify-center gap-2 pl-0 md:pl-8"
            onSubmit={handleSignUp}
          >
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex items-center max-w-[200px] md:max-w-[320px] flex-1 dark:bg-gray-800 dark:border-gray-700"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button
              type="submit"
              className="bg-[#2c5b2d] hover:bg-[#234724] text-[12px] text-white dark:bg-blue-600 dark:hover:bg-blue-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing Up..." : "Sign Up"}
            </Button>
          </form>
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            Get notified when we launch.{" "}
            <Link href="/term/tnc" className="underline underline-offset-2">
              Terms &amp; Conditions
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
