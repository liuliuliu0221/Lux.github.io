import type { Metadata } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import { ExperienceEnhancements } from "@/components/ExperienceEnhancements";
import { siteConfig } from "@/data/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: "%s｜PES Explorer",
  },
  description: siteConfig.description,
  alternates: { canonical: "/" },
  robots: siteConfig.isProduction
    ? { index: true, follow: true }
    : { index: false, follow: false },
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.profile.name }],
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    type: "website",
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1731,
        height: 909,
        alt: "PES Explorer — Finding the Global Minimum of Human-AI Interaction.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const profileJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: siteConfig.title,
    url: siteConfig.url,
    mainEntity: {
      "@type": "Person",
      name: siteConfig.profile.name,
      jobTitle: siteConfig.profile.jobTitle,
      description: siteConfig.profile.description,
      url: siteConfig.url,
    },
  };

  return (
    <html lang="zh-CN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(profileJsonLd).replace(/</g, "\\u003c") }}
        />
        <div className="global-contours" aria-hidden="true" />
        <ExperienceEnhancements />
        {children}
      </body>
    </html>
  );
}
