import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Reckoner - Financial Runway Calculator for Startups",
  description:
    "Calculate your startup's financial runway in seconds. Free, instant burn rate analysis with growth projections. Know exactly how long your cash will last.",
  keywords: [
    "runway calculator",
    "startup finance",
    "burn rate calculator",
    "cash runway",
    "financial planning",
    "startup metrics",
  ],
  authors: [{ name: "Muhammad Tanveer Abbas" }],
  openGraph: {
    title: "Reckoner - Financial Runway Calculator",
    description: "Calculate your startup's financial runway in seconds. Free, instant, and private.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Reckoner - Financial Runway Calculator",
    description: "Calculate your startup's financial runway in seconds.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Oswald:wght@200;300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
