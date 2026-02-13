"use client";

import { useState } from "react";
import { clsx } from "clsx";
import Image from "next/image";

type PreviewType = "library" | "reader" | "book" | "tts" | "translation" | "settings" | "theme" | "leaderboard" | "static";

const previewConfigs: Record<PreviewType, { label: string }> = {
  library: { label: "Library" },
  reader: { label: "Reader" },
  book: { label: "Book" },
  tts: { label: "TTS" },
  translation: { label: "Translation" },
  settings: { label: "Settings" },
  theme: { label: "Themes" },
  leaderboard: { label: "Leaderboard" },
  static: { label: "Stats" },
};

const screenshots: Record<PreviewType, string> = {
  library: "/screens/library-screen.jpg",
  reader: "/screens/reader-screen.jpg",
  book: "/screens/book-screen.jpg",
  tts: "/screens/tts-screen.jpg",
  translation: "/screens/translation.jpg",
  settings: "/screens/settting-screen.jpg",
  theme: "/screens/theme-screen.jpg",
  leaderboard: "/screens/leaderboard-screen.jpg",
  static: "/screens/static-screen.jpg",
};

export default function AppPreviewSection() {
  const [activePreview, setActivePreview] = useState<PreviewType>("library");

  const previewTypes = Object.keys(previewConfigs) as PreviewType[];

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0" style={{ background: 'var(--gradient-background)' }} />
      
      <div className="page-shell relative z-10">
        {/* Feature Selector - Scrollable on mobile */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {previewTypes.map((preview) => (
            <button
              key={preview}
              onClick={() => setActivePreview(preview)}
              className={clsx(
                "flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all duration-200",
                activePreview === preview
                  ? "bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-secondary)] text-white shadow-lg"
                  : "bg-[var(--surface)] border border-[var(--border)] text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:border-[var(--border-strong)]"
              )}
            >
              <span>{previewConfigs[preview].label}</span>
            </button>
          ))}
        </div>

        {/* Preview Container - Phone Mockup with Real Screenshots */}
        <div className="flex justify-center">
          <div className="transition-all duration-500 scale-100">
            {/* Phone Frame */}
            <div className="relative mx-auto w-[280px] md:w-[320px]">
              {/* Phone Outer Frame */}
              <div className="relative rounded-[3rem] bg-gradient-to-br from-gray-800 to-gray-900 p-2 shadow-2xl">
                {/* Phone Inner Frame */}
                <div className="relative rounded-[2.5rem] bg-black overflow-hidden">
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-b-2xl z-20" />
                  
                  {/* Screen Content */}
                  <div className="relative h-[560px] md:h-[640px] overflow-hidden">
                    {/* Status Bar */}
                    <div className="absolute top-0 left-0 right-0 h-8 bg-black/50 backdrop-blur-sm z-10 flex items-center justify-between px-6 pt-1">
                      <span className="text-white text-xs font-medium">9:41</span>
                      <div className="flex items-center gap-1">
                        <div className="w-4 h-2 bg-white rounded-sm" />
                        <div className="w-4 h-2 bg-white rounded-sm" />
                        <div className="w-6 h-3 bg-white rounded-sm" />
                      </div>
                    </div>

                    {/* Screenshot Display */}
                    <div className="h-full pt-10">
                      <div className="absolute inset-0" style={{ top: '40px' }}>
                        <Image
                          src={screenshots[activePreview]}
                          alt={previewConfigs[activePreview].label}
                          fill
                          className="object-cover"
                          sizes="280px"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Home Indicator */}
                  <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/30 rounded-full" />
                </div>
              </div>

              {/* Reflection Effect */}
              <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
