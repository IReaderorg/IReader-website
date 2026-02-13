"use client";

import { useState, useEffect } from "react";
import { clsx } from "clsx";
import AppPreview from "@/components/app-preview";
import { Smartphone, Monitor, Tablet } from "lucide-react";

type DeviceType = "phone" | "tablet" | "desktop";

const deviceConfigs = {
  phone: {
    icon: Smartphone,
    label: "Phone",
    description: "Android app with full features",
  },
  tablet: {
    icon: Tablet,
    label: "Tablet",
    description: "Optimized for larger screens",
  },
  desktop: {
    icon: Monitor,
    label: "Desktop",
    description: "Windows, macOS, Linux",
  },
};

export default function AppPreviewSection() {
  const [activeDevice, setActiveDevice] = useState<DeviceType>("phone");

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-50/50 to-transparent dark:via-purple-950/20" />
      
      <div className="page-shell relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[var(--brand-primary)]/10 to-[var(--brand-secondary)]/10 border border-[var(--brand-primary)]/20 mb-6">
            <Smartphone className="w-4 h-4 text-[var(--brand-primary)]" />
            <span className="text-sm font-medium text-[var(--brand-primary)]">Interactive Preview</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-4">
            Experience IReader
          </h2>
          <p className="text-lg text-[var(--foreground-muted)] max-w-2xl mx-auto">
            Take a tour through the app interface. Click on different screens to explore the features.
          </p>
        </div>

        {/* Device Selector */}
        <div className="flex justify-center gap-3 mb-12">
          {(Object.keys(deviceConfigs) as DeviceType[]).map((device) => {
            const config = deviceConfigs[device];
            const Icon = config.icon;
            return (
              <button
                key={device}
                onClick={() => setActiveDevice(device)}
                className={clsx(
                  "flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all duration-200",
                  activeDevice === device
                    ? "bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-secondary)] text-white shadow-lg"
                    : "bg-[var(--surface)] border border-[var(--border)] text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:border-[var(--border-strong)]"
                )}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{config.label}</span>
              </button>
            );
          })}
        </div>

        {/* Preview Container */}
        <div className="flex justify-center">
          <div className={clsx(
            "transition-all duration-500",
            activeDevice === "phone" && "scale-100",
            activeDevice === "tablet" && "scale-110",
            activeDevice === "desktop" && "scale-125"
          )}>
            <AppPreview />
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="grid md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto">
          {[
            {
              title: "Library Management",
              description: "Organize your collection with categories, progress tracking, and smart filters.",
              emoji: "📚",
            },
            {
              title: "Reader Experience",
              description: "Customize fonts, themes, and reading modes for the perfect experience.",
              emoji: "📖",
            },
            {
              title: "Source Browser",
              description: "Access 200+ sources and discover new content from around the world.",
              emoji: "🌐",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)] hover:shadow-lg transition-all duration-300"
            >
              <div className="text-3xl mb-3">{feature.emoji}</div>
              <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-[var(--foreground-muted)]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
