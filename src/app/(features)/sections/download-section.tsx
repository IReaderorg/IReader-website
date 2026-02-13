"use client";

import Link from "next/link";
import type { ReactElement } from "react";
import { Download, Github, ExternalLink, Monitor, Smartphone, Terminal, ChevronRight, Sparkles, Check, ArrowRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const getAndroidDownloadUrl = (): string => {
  const baseUrl = "https://github.com/IReaderorg/IReader/releases/latest/download";
  if (typeof window === "undefined") return `${baseUrl}/IReader-arm64-v8a.apk`;
  const userAgent = window.navigator.userAgent.toLowerCase();
  if (/x86_64/.test(userAgent)) return `${baseUrl}/IReader-x86_64.apk`;
  if (/x86/.test(userAgent)) return `${baseUrl}/IReader-x86.apk`;
  if (/arm64|aarch64/.test(userAgent)) return `${baseUrl}/IReader-arm64-v8a.apk`;
  if (/armv7|arm/.test(userAgent)) return `${baseUrl}/IReader-armeabi-v7a.apk`;
  return `${baseUrl}/IReader-arm64-v8a.apk`;
};

const downloadOptions = [
  {
    category: "Mobile",
    icon: Smartphone,
    gradient: "from-emerald-500 to-teal-500",
    description: "Read on the go",
    items: [
      {
        label: "Android APK",
        getHref: getAndroidDownloadUrl,
        description: "Android 5.0+ • Auto-detects architecture",
        badge: "Popular",
        icon: "📱",
      },
    ],
  },
  {
    category: "Desktop",
    icon: Monitor,
    gradient: "from-blue-500 to-cyan-500",
    description: "Full-featured experience",
    items: [
      {
        label: "Windows",
        getHref: () => "https://github.com/IReaderorg/IReader/releases/latest/download/IReader-windows-x64-2.0.1.msi",
        description: "Windows 10+ • 64-bit MSI installer",
        badge: "Recommended",
        icon: "🖥️",
      },
      {
        label: "Linux AppImage",
        getHref: () => "https://github.com/IReaderorg/IReader/releases/latest/download/IReader-x86_64.AppImage",
        description: "Universal • No installation required",
        badge: null,
        icon: "🐧",
      },
      {
        label: "Linux DEB",
        getHref: () => "https://github.com/IReaderorg/IReader/releases/latest/download/ireader_2.0.1_amd64.deb",
        description: "Debian/Ubuntu • AMD64 package",
        badge: null,
        icon: "📦",
      },
    ],
  },
];

const requirements = [
  { platform: "Android", req: "Android 5.0 or later" },
  { platform: "Desktop", req: "4GB RAM, 500MB disk" },
  { platform: "TTS", req: "Desktop only feature" },
];

function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1, rootMargin: "50px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

export default function DownloadSection(): ReactElement {
  const [mounted, setMounted] = useState(false);
  const { ref, isVisible } = useScrollAnimation();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section ref={ref} className="relative py-24 md:py-32 overflow-hidden bg-white dark:bg-[#0a0a0b]">
      {/* Background */}
      <div className="absolute inset-0" style={{ background: 'var(--gradient-mesh)' }} />
      
      {/* Decorative Elements */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-gradient-to-br from-purple-300/20 to-blue-300/20 dark:from-purple-900/20 dark:to-blue-900/20 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-gradient-to-br from-blue-300/20 to-purple-300/20 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full blur-3xl" />

      <div className="page-shell relative z-10">
        <div className="flex flex-col gap-12 md:gap-16">
          
          {/* Section Header */}
          <div className={`flex flex-col items-center gap-4 text-center max-w-3xl mx-auto transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 border border-purple-200/50 dark:border-purple-500/20 text-sm font-medium text-purple-700 dark:text-purple-300">
              <Download className="w-4 h-4" />
              Get Started
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white">
              Download{" "}
              <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                IReader
              </span>
            </h2>
            <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Choose your platform and start reading in minutes. 
              Free forever, no account required.
            </p>
          </div>

          {/* Primary CTA */}
          <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Link
              href="https://github.com/IReaderorg/IReader/releases"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-purple-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/30 hover:scale-[1.02]"
            >
              <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              <Download className="w-5 h-5 relative" />
              <span className="relative">Download Latest Release</span>
              <ExternalLink className="w-4 h-4 relative opacity-70" />
            </Link>
            
            <Link
              href="https://github.com/IReaderorg/IReader"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-white dark:bg-neutral-900 border-2 border-neutral-200 dark:border-neutral-800 px-8 py-4 text-base font-semibold text-neutral-900 dark:text-white transition-all duration-300 hover:border-purple-300 dark:hover:border-purple-700 hover:bg-purple-50 dark:hover:bg-purple-950/30"
            >
              <Github className="w-5 h-5" />
              <span>View Source Code</span>
            </Link>
          </div>

          {/* Download Options */}
          <div className={`grid gap-6 md:gap-8 grid-cols-1 lg:grid-cols-2 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {downloadOptions.map((category, categoryIndex) => {
              const CategoryIcon = category.icon;
              return (
                <div
                  key={category.category}
                  className="flex flex-col gap-4"
                >
                  {/* Category Header */}
                  <div className="flex items-center gap-3 px-1">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br ${category.gradient} text-white shadow-lg`}>
                      <CategoryIcon className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col">
                      <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                        {category.category}
                      </h3>
                      <span className="text-sm text-neutral-500 dark:text-neutral-400">
                        {category.description}
                      </span>
                    </div>
                  </div>

                  {/* Download Items */}
                  <div className="flex flex-col gap-3">
                    {category.items.map((item) => {
                      const href = mounted ? item.getHref() : "https://github.com/IReaderorg/IReader/releases";
                      
                      return (
                        <Link
                          key={item.label}
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center gap-4 p-5 rounded-2xl bg-white/80 dark:bg-neutral-900/80 border border-neutral-200/50 dark:border-neutral-800/50 shadow-sm hover:shadow-lg hover:border-purple-200 dark:hover:border-purple-800 transition-all duration-300"
                        >
                          <span className="text-2xl">{item.icon}</span>
                          <div className="flex-1 flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-neutral-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                                {item.label}
                              </span>
                              {item.badge && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/50 dark:to-blue-900/50 text-purple-700 dark:text-purple-300">
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            <span className="text-sm text-neutral-500 dark:text-neutral-400">
                              {item.description}
                            </span>
                          </div>
                          <ChevronRight className="w-5 h-5 text-neutral-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Requirements */}
          <div className={`flex flex-wrap justify-center gap-6 text-sm text-neutral-500 dark:text-neutral-400 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {requirements.map(({ platform, req }) => (
              <div key={platform} className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500" />
                <span className="font-medium text-neutral-700 dark:text-neutral-300">{platform}:</span>
                <span>{req}</span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
