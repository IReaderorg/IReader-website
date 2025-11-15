import type { Metadata, Viewport } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import "./globals.css";

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
const siteTagline = "Open Source Novel Reader for Android & Desktop";
const siteDescription =
  "A free and open-source novel reader for Android and Desktop with customizable reading experience, extension support, and Text-to-Speech capabilities.";
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
    default: `${siteName} · ${siteTagline}`,
    template: `%s · ${siteName}`,
  },
  description: siteDescription,
  applicationName: siteName,
  keywords: [
    "light novels",
    "reader",
    "ireader",
    "android",
    "desktop",
    "cross-platform",
    "text-to-speech",
    "piper tts",
    "open source",
    "tachiyomi",
    "offline reading",
    "free novel app",
    "japanese novels",
    "novel tracker",
  ],
  openGraph: {
    title: `${siteName} · ${siteTagline}`,
    description: siteDescription,
    url: baseUrl,
    siteName,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} · ${siteTagline}`,
    description: siteDescription,
  },
  alternates: {
    canonical: baseUrl,
  },
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
      <body className={`${sans.variable} ${mono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
