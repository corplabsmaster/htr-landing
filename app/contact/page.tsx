"use client";

import { useState } from "react";
import Container from "@/app/components/ui/container";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { toast } from "sonner";
import { ReloadIcon } from "@radix-ui/react-icons";

const INQUIRY_OPTIONS = [
  "App Demo",
  "Business Collaboration",
  "TerraLink Partner",
  "Others",
] as const;

export default function ContactPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    contactNumber: "",
    note: "",
    inquiry: [] as string[],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (formData.inquiry.length === 0) {
      toast.error("Please select at least one inquiry option");
      return;
    }

    setIsLoading(true);

    try {
      console.log("Submitting form data:", formData);
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit form");
      }

      // Clear form
      setFormData({
        email: "",
        contactNumber: "",
        note: "",
        inquiry: [],
      });

      toast.success("Thank you for your inquiry! We'll be in touch soon.");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to submit form. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleInquiryChange = (option: string) => {
    setFormData((prev) => ({
      ...prev,
      inquiry: prev.inquiry.includes(option)
        ? prev.inquiry.filter((item) => item !== option)
        : [...prev.inquiry, option],
    }));
  };

  return (
    <Container>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-12 items-start">
          {/* Left Column */}
          <div className="flex flex-col px-2 justify-center lg:sticky lg:top-8">
            <h1 className="text-2xl md:text-4xl font-bold mb-4 text-[#2c5b2d] dark:text-lake-400">
              Grow With Us
            </h1>
            <p className="text-xs md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              If you have a question or need assistance with crop nutrition,
              please don't hesitate to contact us.
            </p>
          </div>

          {/* Right Column - Form */}
          <div className="bg-white dark:bg-gray-800/50 p-6 md:p-8 rounded-2xl shadow-lg backdrop-blur-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium">
                  Email <span className="text-red-500">*</span>
                </label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="Enter your email"
                  className="w-full"
                />
              </div>

              {/* Contact Number */}
              <div className="space-y-2">
                <label
                  htmlFor="contactNumber"
                  className="block text-sm font-medium"
                >
                  Contact Number
                </label>
                <Input
                  id="contactNumber"
                  type="tel"
                  value={formData.contactNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, contactNumber: e.target.value })
                  }
                  placeholder="Enter your contact number"
                  className="w-full"
                />
              </div>

              {/* Inquiry Options */}
              <div className="space-y-3">
                <label className="block text-sm font-medium">
                  Inquiry <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {INQUIRY_OPTIONS.map((option) => (
                    <label
                      key={option}
                      className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={formData.inquiry.includes(option)}
                        onChange={() => handleInquiryChange(option)}
                        className="rounded border-gray-300 text-[#2c5b2d] focus:ring-[#2c5b2d] dark:border-gray-600 dark:text-lake-400 dark:focus:ring-lake-400"
                      />
                      <span className="text-sm font-medium">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Note */}
              <div className="space-y-2">
                <label htmlFor="note" className="block text-sm font-medium">
                  Note
                </label>
                <textarea
                  id="note"
                  rows={4}
                  value={formData.note}
                  onChange={(e) =>
                    setFormData({ ...formData, note: e.target.value })
                  }
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 pt-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2c5b2d] focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-50 dark:placeholder:text-gray-500 dark:focus:ring-lake-400"
                  placeholder="Enter your message"
                />
                {/* Privacy Policy Notice */}
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  By submitting the form you confirm that you have been informed
                  that we process your data in accordance with the HiTerra
                  Privacy Policy.
                </p>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#2c5b2d] hover:bg-[#234724] dark:bg-lake-600 dark:hover:bg-lake-700 text-white py-2 h-11"
              >
                {isLoading ? (
                  <>
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit"
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </Container>
  );
}
