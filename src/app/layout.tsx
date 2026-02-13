import type { Metadata, Viewport } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { StructuredData } from "./structured-data";

const sans = Manrope({
  variable: "--font-sans-base",
  subsets: ["latin"],
  display: "swap",
});

const mono = Space_Grotesk({
  variable: "--font-mono-base",
  subsets: ["latin"],
  display: "swap",
});

const siteName = "IReader";
const siteTagline = "Open Source Reader App for Android & Desktop";
const siteDescription =
  "Download IReader, the best free open-source reader app for Android and Desktop. Read light novels, web novels, and ebooks offline with customizable themes, no ads, and complete privacy. Perfect for novel enthusiasts.";
const baseUrl = new URL("https://ireaderorg.netlify.app");

export const metadata: Metadata = {
  metadataBase: baseUrl,
  icons: {
    icon: [
      { rel: "icon", url: "/icon.svg", type: "image/svg+xml" },
      { rel: "icon", url: "/icon-16x16.png", sizes: "16x16", type: "image/png" },
      { rel: "icon", url: "/icon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { rel: "apple-touch-icon", url: "/icon-192x192.png", sizes: "192x192" },
    ],
  },
  manifest: "/manifest.json",
  title: {
    default: `${siteName} - ${siteTagline} | Free Novel Reader`,
    template: `%s | ${siteName} - Reader App`,
  },
  description: siteDescription,
  applicationName: siteName,
  keywords: [
    "reader app",
    "android reader app",
    "open source reader app",
    "novel reader app",
    "light novel reader",
    "web novel reader",
    "ebook reader app",
    "free reader app",
    "offline reader app",
    "desktop reader app",
    "cross-platform reader",
    "privacy reader app",
    "customizable reader app",
    "ireader",
    "android",
    "desktop",
    "text-to-speech",
    "piper tts",
    "open source",
    "tachiyomi alternative",
    "legado alternative",
    "offline reading",
    "free novel app",
    "japanese novels",
    "novel tracker",
    "book reader",
    "reading app",
    "no ads reader",
  ],
  authors: [{ name: "IReader Team" }],
  creator: "IReader Team",
  publisher: "IReader",
  openGraph: {
    title: `${siteName} - ${siteTagline}`,
    description: siteDescription,
    url: baseUrl,
    siteName,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/icon-512x512.png",
        width: 512,
        height: 512,
        alt: "IReader - Open Source Reader App",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} - ${siteTagline}`,
    description: siteDescription,
    images: ["/icon-512x512.png"],
  },
  alternates: {
    canonical: baseUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "Books & Reference",
};

export const viewport: Viewport = {
  themeColor: "#106e81",
  colorScheme: "light dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <StructuredData />
      </head>
      <body className={`${sans.variable} ${mono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
