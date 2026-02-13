"use client";

import Link from "next/link";
import Image from "next/image";
import { Download, Github, ArrowRight, Star, Users, BookOpen, Sparkles, Zap, Globe } from "lucide-react";
import type { ReactElement } from "react";
import { useState, useEffect, useRef } from "react";

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
    case "windows": return `${baseUrl}/IReader-windows-x64-2.0.1.msi`;
    case "linux": return `${baseUrl}/IReader-x86_64.AppImage`;
    case "android": return `${baseUrl}/IReader-arm64-v8a.apk`;
    default: return "https://github.com/IReaderorg/IReader/releases";
  }
};

const platformIcons: Record<Platform, string> = {
  windows: "🖥️",
  macos: "🍎",
  linux: "🐧",
  android: "📱",
  unknown: "📦"
};

// Animated Counter Component
function AnimatedCounter({ 
  value, 
  suffix = "", 
  duration = 2000 
}: { 
  value: number; 
  suffix?: string; 
  duration?: number;
}): ReactElement {
  const [displayValue, setDisplayValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 4);
      setDisplayValue(Math.floor(value * easeOut));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isVisible, value, duration]);

  return <span ref={ref} className="tabular-nums">{displayValue.toLocaleString()}{suffix}</span>;
}

const stats = [
  { label: "Active Users", value: 50000, suffix: "+", icon: Users },
  { label: "Extensions", value: 200, suffix: "+", icon: Zap },
  { label: "GitHub Stars", value: 1200, suffix: "+", icon: Star },
  { label: "Contributors", value: 50, suffix: "+", icon: Globe },
];

const features = [
  { icon: BookOpen, label: "Light Novels" },
  { icon: Sparkles, label: "AI-Powered TTS" },
  { icon: Globe, label: "200+ Sources" },
];

export default function FeatureHero(): ReactElement {
  const [platform, setPlatform] = useState<Platform>("unknown");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setPlatform(getPlatform());
    setMounted(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[var(--background)]">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Mesh */}
        <div className="absolute inset-0" style={{ background: 'var(--gradient-mesh)' }} />
        
        {/* Floating Orbs */}
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-purple-400/20 to-blue-400/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-purple-300/10 to-blue-300/10 rounded-full blur-3xl" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 grid-pattern opacity-[0.3] dark:opacity-[0.1]" />
        
        {/* Gradient Lines */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-purple-500/20 to-transparent" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-blue-500/20 to-transparent" />
      </div>

      <div className="page-shell relative z-10 py-20 md:py-32">
        <div className="flex flex-col items-center text-center gap-12 md:gap-16">
          
          {/* Badge */}
          <div className={`transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 border border-purple-200/50 dark:border-purple-500/20 text-sm font-medium text-purple-700 dark:text-purple-300">
              <Sparkles className="w-4 h-4" />
              Open Source • Free Forever • No Ads
            </span>
          </div>

          {/* Main Headline */}
          <div className={`flex flex-col gap-6 max-w-4xl transition-all duration-700 delay-100 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] text-balance">
              <span className="text-[var(--foreground)]">Read Your Way with</span>
              <br />
              <span className="bg-gradient-to-r from-purple-600 via-violet-500 to-blue-500 bg-clip-text text-transparent">
                IReader
              </span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-[var(--foreground-muted)] max-w-2xl mx-auto leading-relaxed">
              The ultimate open-source reader for{" "}
              <span className="text-[var(--foreground)] font-medium">light novels</span>,{" "}
              <span className="text-[var(--foreground)] font-medium">web novels</span>, and{" "}
              <span className="text-[var(--foreground)] font-medium">ebooks</span>
            </p>
          </div>

          {/* Feature Pills */}
          <div className={`flex flex-wrap justify-center gap-3 transition-all duration-700 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {features.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800 text-sm font-medium text-neutral-700 dark:text-neutral-300 shadow-sm hover:border-purple-300 dark:hover:border-purple-700 transition-colors"
              >
                <Icon className="w-4 h-4 text-purple-500" />
                {label}
              </span>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className={`flex flex-col sm:flex-row items-center gap-4 transition-all duration-700 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <Link
              href={getDownloadUrl(platform)}
              className="group relative inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-purple-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/30 hover:scale-[1.02]"
            >
              <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              <Download className="w-5 h-5 relative" />
              <span className="relative">Download for {platform === "unknown" ? "Free" : platform.charAt(0).toUpperCase() + platform.slice(1)}</span>
              <span className="relative text-lg">{platformIcons[platform]}</span>
            </Link>
            
            <Link
              href="https://github.com/IReaderorg/IReader"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-white dark:bg-neutral-900 border-2 border-neutral-200 dark:border-neutral-800 px-8 py-4 text-base font-semibold text-neutral-900 dark:text-white transition-all duration-300 hover:border-purple-300 dark:hover:border-purple-700 hover:bg-purple-50 dark:hover:bg-purple-950/30"
            >
              <Github className="w-5 h-5" />
              <span>Star on GitHub</span>
              <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
            </Link>
          </div>

          {/* Stats Grid */}
          <div className={`w-full max-w-4xl transition-all duration-700 delay-400 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="group relative flex flex-col items-center gap-3 p-6 rounded-2xl bg-white/80 dark:bg-neutral-900/80 border border-neutral-200/50 dark:border-neutral-800/50 shadow-sm hover:shadow-lg hover:border-purple-200 dark:hover:border-purple-800 transition-all duration-300"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/50 dark:to-blue-900/50 text-purple-600 dark:text-purple-400">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white">
                        <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                      </span>
                      <span className="text-sm text-neutral-500 dark:text-neutral-400">{stat.label}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* App Preview */}
          <div className={`w-full max-w-5xl transition-all duration-700 delay-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="relative rounded-3xl bg-[var(--surface)] border border-[var(--border)] shadow-2xl overflow-hidden p-8">
              <div className="flex flex-col items-center justify-center gap-6 text-center">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                  <div className="flex flex-col items-center gap-3 p-4 rounded-xl bg-[var(--background)] border border-[var(--border)]">
                    <span className="text-4xl">📚</span>
                    <span className="font-medium text-[var(--foreground)]">Library</span>
                  </div>
                  <div className="flex flex-col items-center gap-3 p-4 rounded-xl bg-[var(--background)] border border-[var(--border)]">
                    <span className="text-4xl">📖</span>
                    <span className="font-medium text-[var(--foreground)]">Reader</span>
                  </div>
                  <div className="flex flex-col items-center gap-3 p-4 rounded-xl bg-[var(--background)] border border-[var(--border)]">
                    <span className="text-4xl">🎨</span>
                    <span className="font-medium text-[var(--foreground)]">Themes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--background)] to-transparent pointer-events-none" />
    </section>
  );
}
