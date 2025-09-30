import { ThemeProvider } from "@/app/components/theme-provider";
import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import LayoutWrapper from "./layout-wrapper";
import { GoogleTagManager } from "./components/gtm";

const manrope = Manrope({
  subsets: ["latin"],
  display: "optional",
});

export const metadata: Metadata = {
  title: "HiTerra AI | Agritech AI Solutions in Malaysia",
  description:
    "We transforms farming with AI-driven insights, global-standard carbon compliance, and ecosystem-neutral solutions for sustainable yield growth.",
  metadataBase: new URL("https://hiterra.co"),
  alternates: {
    canonical: "/",
  },
  verification: {
    google: "wNgHg7tgtHtjUaZyjyvt7W-uPy0nlZw9WPPEiGKcxSY",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <GoogleTagManager />
      </head>
      <body className={manrope.className}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-54RQSDWL"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
          disableTransitionOnChange
        >
          <LayoutWrapper>{children}</LayoutWrapper>
          <Toaster position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
