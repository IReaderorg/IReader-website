"use client";

import Link from "next/link";
import { Download, Github } from "lucide-react";
import type { ReactElement } from "react";
import { useState, useEffect } from "react";

type Platform = "windows" | "macos" | "linux" | "android" | "unknown";

const getPlatform = (): Platform => {
  if (typeof window === "undefined") return "unknown";
  
  const userAgent = window.navigator.userAgent.toLowerCase();
  
  if (/android/.test(userAgent)) return "android";
  if (/win/.test(userAgent)) return "windows";
  if (/mac/.test(userAgent)) return "macos";
  if (/linux/.test(userAgent)) return "linux";
  
  return "unknown";
};

const getDownloadUrl = (platform: Platform): string => {
  const baseUrl = "https://github.com/IReaderorg/IReader/releases/latest/download";
  
  switch (platform) {
    case "windows":
      return `${baseUrl}/IReader-windows-x64.zip`;
    case "macos":
      return `${baseUrl}/IReader-macos-universal.dmg`;
    case "linux":
      return `${baseUrl}/IReader-linux-x64.AppImage`;
    case "android":
      return `${baseUrl}/IReader-android.apk`;
    default:
      return "https://github.com/IReaderorg/IReader/releases";
  }
};

const getPlatformLabel = (platform: Platform): string => {
  switch (platform) {
    case "windows":
      return "Download for Windows";
    case "macos":
      return "Download for macOS";
    case "linux":
      return "Download for Linux";
    case "android":
      return "Download for Android";
    default:
      return "Download";
  }
};

const metricCards = [
  {
    label: "Platforms",
    value: "2",
    description: "Android & Desktop support for seamless reading",
  },
  {
    label: "Extensions",
    value: "200+",
    description: "Community-maintained sources ready to install",
  },
  {
    label: "Contributors",
    value: "50+",
    description: "Developers improving IReader together",
  },
];

export default function FeatureHero(): ReactElement {
  const [platform, setPlatform] = useState<Platform>("unknown");

  useEffect(() => {
    setPlatform(getPlatform());
  }, []);

  const downloadUrl = getDownloadUrl(platform);
  const downloadLabel = getPlatformLabel(platform);

  return (
    <section className="pt-[calc(var(--spacing-20)+var(--spacing-4))] pb-[var(--spacing-20)] bg-[var(--color-background)]">
      <div className="page-shell">
        <div className="flex flex-col gap-[var(--spacing-16)]">
          <div className="flex flex-col gap-[var(--spacing-8)]">
            <div className="flex flex-col gap-[var(--spacing-6)] text-center">
              <h1 className="text-4xl sm:text-[3rem] leading-[1.05] font-semibold tracking-[-0.03em] text-balance bg-gradient-to-r from-[var(--color-brand-primary)] via-[var(--color-brand-primary-light)] to-[var(--color-brand-accent)] bg-clip-text text-transparent">
                A cross-platform novel reader for Android & Desktop
              </h1>
              <p className="mx-auto max-w-3xl text-base sm:text-lg leading-relaxed text-[color-mix(in_srgb,_var(--color-foreground)_70%,_transparent)]">
                IReader brings a polished reading experience to Android and Desktop. Enjoy natural Text-to-Speech with Piper TTS, curate sources with extensions, and keep everything synced locally—no ads, no lock-in, just community-built features.
              </p>
            </div>
            <div className="flex flex-col items-center justify-center gap-[var(--spacing-3)] sm:flex-row">
              <Link
                href={downloadUrl}
                className="inline-flex items-center justify-center gap-[var(--spacing-2)] rounded-[var(--radius-md)] bg-gradient-to-r from-[var(--color-brand-primary)] to-[var(--color-brand-primary-light)] px-[var(--spacing-6)] py-[var(--spacing-3)] min-h-[44px] text-sm font-semibold tracking-tight text-white transition-all duration-[var(--transition-base)] hover:shadow-[var(--shadow-lg)] hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)] focus-visible:ring-offset-2"
                aria-label={downloadLabel}
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                {downloadLabel}
              </Link>
              <Link
                href="https://github.com/IReaderorg/IReader"
                className="inline-flex items-center justify-center gap-[var(--spacing-2)] rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] px-[var(--spacing-6)] py-[var(--spacing-3)] min-h-[44px] text-sm font-semibold tracking-tight text-[color-mix(in_srgb,_var(--color-foreground)_75%,_transparent)] transition-all duration-[var(--transition-base)] hover:bg-[var(--color-brand-primary)] hover:text-white hover:border-[var(--color-brand-primary)] hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)] focus-visible:ring-offset-2"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View IReader source code on GitHub (opens in new tab)"
              >
                <Github className="h-4 w-4" aria-hidden="true" />
                View source on GitHub
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-[var(--spacing-4)] md:flex-row md:flex-wrap" role="list" aria-label="IReader statistics">
            {metricCards.map(({ label, value, description }) => (
              <article
                key={label}
                role="listitem"
                className="flex min-w-[200px] flex-1 flex-col items-center gap-[var(--spacing-2)] rounded-[var(--radius-lg)] bg-[var(--color-background-soft)] px-[var(--spacing-5)] py-[var(--spacing-4)] text-center border border-transparent bg-gradient-to-br from-transparent to-transparent hover:border-[var(--color-brand-primary)] transition-all duration-[var(--transition-base)] hover:shadow-[var(--shadow-md)] hover:-translate-y-1"
                style={{
                  backgroundImage: 'linear-gradient(var(--color-background-soft), var(--color-background-soft)), linear-gradient(135deg, var(--color-brand-primary), var(--color-brand-accent))',
                  backgroundOrigin: 'border-box',
                  backgroundClip: 'padding-box, border-box',
                }}
                aria-label={`${label}: ${value} - ${description}`}
              >
                <span className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[color-mix(in_srgb,_var(--color-muted)_62%,_transparent)]">
                  {label}
                </span>
                <span className="text-base font-semibold text-[color-mix(in_srgb,_var(--color-foreground)_86%,_transparent)]">
                  {value}
                </span>
                <span className="text-[0.7rem] leading-5 text-[color-mix(in_srgb,_var(--color-foreground)_58%,_transparent)]">
                  {description}
                </span>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
