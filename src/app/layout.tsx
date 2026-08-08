import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.cambridgelocals.com"

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Cambridge Locals — Local insights for students, tourists & professionals",
    template: "%s — Cambridge Locals",
  },
  description: "Discover Cambridge through the eyes of local experts. Tips, guides, and insider knowledge for students, tourists, and professionals.",
  openGraph: {
    type: "website",
    siteName: "Cambridge Locals",
    title: "Cambridge Locals — Local insights for students, tourists & professionals",
    description: "Discover Cambridge through the eyes of local experts. Tips, guides, and insider knowledge for students, tourists, and professionals.",
    url: baseUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "Cambridge Locals — Local insights for students, tourists & professionals",
    description: "Discover Cambridge through the eyes of local experts. Tips, guides, and insider knowledge for students, tourists, and professionals.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
