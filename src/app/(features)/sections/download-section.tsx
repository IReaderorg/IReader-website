"use client";

import Link from "next/link";
import type { ReactElement } from "react";
import { Download, Github } from "lucide-react";
import { useState, useEffect } from "react";

const getAndroidDownloadUrl = (): string => {
  const baseUrl = "https://github.com/IReaderorg/IReader/releases/latest/download";
  
  // Try to detect architecture
  if (typeof window === "undefined") {
    return `${baseUrl}/IReader-arm64-v8a-release.apk`;
  }
  
  const userAgent = window.navigator.userAgent.toLowerCase();
  
  // Check for 64-bit support
  if (/arm64|aarch64/.test(userAgent)) {
    return `${baseUrl}/IReader-arm64-v8a-release.apk`;
  }
  
  // Default to universal/arm64 as it's most common on modern devices
  return `${baseUrl}/IReader-arm64-v8a-release.apk`;
};

const downloadLinks = [
  {
    label: "Android APK",
    getHref: getAndroidDownloadUrl,
    description: "For Android 5.0+ devices (auto-detects best version).",
  },
  {
    label: "Windows Desktop",
    getHref: () => "https://github.com/IReaderorg/IReader/releases/latest/download/IReader-windows-x64.zip",
    description: "Desktop app for Windows 10 and later with TTS support.",
  },
  {
    label: "macOS Desktop",
    getHref: () => "https://github.com/IReaderorg/IReader/releases/latest/download/IReader-macos-universal.dmg",
    description: "Desktop app for macOS 10.15+ with TTS support.",
  },
  {
    label: "Linux Desktop",
    getHref: () => "https://github.com/IReaderorg/IReader/releases/latest/download/IReader-linux-x64.AppImage",
    description: "Desktop app for Linux (ALSA/PulseAudio) with TTS support.",
  },
  {
    label: "Source code",
    getHref: () => "https://github.com/IReaderorg/IReader",
    description: "Clone, audit, and customize the app to your needs.",
  },
];

export default function DownloadSection(): ReactElement {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <section className="py-[var(--spacing-20)] bg-[var(--color-background-soft)]">
      <div className="page-shell">
        <div className="flex flex-col gap-[var(--spacing-8)]">
          <div className="flex flex-col gap-[var(--spacing-4)] text-center max-w-3xl mx-auto">
            <span className="badge mx-auto">Get started</span>
            <h2 className="text-3xl sm:text-[2.4rem] font-semibold tracking-[-0.025em]">
              Download IReader
            </h2>
            <p className="text-base sm:text-lg text-[color-mix(in_srgb,_var(--color-foreground)_70%,_transparent)] leading-relaxed">
              Install the latest build for your platform and explore the docs to configure extensions, set up TTS, automate backups, and join the community.
            </p>
            <p className="text-sm text-[color-mix(in_srgb,_var(--color-foreground)_60%,_transparent)] leading-relaxed">
              Desktop requirements: 4GB RAM, 500MB disk space. TTS features available on Desktop only.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-[var(--spacing-4)] justify-center items-center">
            <Link
              href="https://github.com/IReaderorg/IReader/releases"
              className="inline-flex items-center justify-center gap-[var(--spacing-2)] rounded-[var(--radius-md)] bg-[var(--color-brand-primary)] px-[var(--spacing-6)] py-[var(--spacing-3)] min-h-[44px] text-base font-semibold tracking-tight text-white transition-all duration-[var(--transition-base)] hover:bg-[var(--color-brand-primary-dark)] hover:shadow-[var(--shadow-lg)] hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)] focus-visible:ring-offset-2"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download IReader latest release from GitHub (opens in new tab)"
            >
              <Download strokeWidth={2} className="h-5 w-5" aria-hidden="true" />
              Download Latest Release
            </Link>
            <Link
              href="https://github.com/IReaderorg/IReader"
              className="inline-flex items-center justify-center gap-[var(--spacing-2)] rounded-[var(--radius-md)] border-2 border-[var(--color-border)] bg-[var(--color-surface)] px-[var(--spacing-6)] py-[var(--spacing-3)] min-h-[44px] text-base font-semibold tracking-tight text-[color-mix(in_srgb,_var(--color-foreground)_80%,_transparent)] hover:text-[var(--color-foreground)] hover:bg-[var(--color-background)] hover:border-[var(--color-brand-primary)] hover:scale-105 transition-all duration-[var(--transition-base)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)] focus-visible:ring-offset-2"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View IReader source code on GitHub (opens in new tab)"
            >
              <Github strokeWidth={2} className="h-5 w-5" aria-hidden="true" />
              View Source Code
            </Link>
          </div>

          <div className="grid gap-[var(--spacing-4)] sm:grid-cols-2 lg:grid-cols-3">
            {downloadLinks.map(({ label, description, getHref }) => {
              const href = mounted ? getHref() : "https://github.com/IReaderorg/IReader/releases";
              const isSourceCode = label === "Source code";
              
              return (
                <Link
                  key={label}
                  href={href}
                  className="flex flex-col gap-[var(--spacing-2)] p-[var(--spacing-5)] min-h-[44px] rounded-[var(--radius-lg)] bg-[var(--color-surface)] border border-[var(--color-border)] transition-all duration-[var(--transition-base)] hover:shadow-[var(--shadow-md)] hover:border-[var(--color-brand-primary)] hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)] focus-visible:ring-offset-2"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${isSourceCode ? 'View' : 'Download'} ${label}: ${description}`}
                >
                  <h3 className="text-base font-semibold text-[color-mix(in_srgb,_var(--color-foreground)_88%,_transparent)]">
                    {label}
                  </h3>
                  <p className="text-sm text-[color-mix(in_srgb,_var(--color-foreground)_70%,_transparent)] leading-relaxed">
                    {description}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
