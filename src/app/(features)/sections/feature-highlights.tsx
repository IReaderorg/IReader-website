"use client";

import type { ReactElement } from "react";
import { useEffect, useState, useRef } from "react";
import {
  Monitor,
  Volume2,
  Puzzle,
  ShieldCheck,
  Palette,
  CloudDownload,
  ArrowRight,
  Sparkles,
  Moon,
  BookOpen,
  Headphones,
} from "lucide-react";

interface Feature {
  readonly icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  readonly title: string;
  readonly description: string;
  readonly gradient: string;
  readonly bgGradient: string;
  readonly features: readonly string[];
  readonly size?: "normal" | "large";
}

const features: Feature[] = [
  {
    icon: Monitor,
    title: "Cross-Platform",
    description: "Seamlessly switch between Android and Desktop with synchronized reading progress across all your devices.",
    gradient: "from-violet-500 to-purple-500",
    bgGradient: "from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/30",
    features: ["Android 5.0+", "Windows 10+", "Linux", "macOS"],
    size: "large",
  },
  {
    icon: Volume2,
    title: "AI Text-to-Speech",
    description: "Natural AI voices powered by Piper TTS with real-time word highlighting for immersive listening.",
    gradient: "from-blue-500 to-cyan-500",
    bgGradient: "from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30",
    features: ["Piper TTS", "Word Highlighting", "Offline"],
    size: "large",
  },
  {
    icon: Puzzle,
    title: "200+ Extensions",
    description: "Install community extensions to unlock content sources from around the world.",
    gradient: "from-emerald-500 to-teal-500",
    bgGradient: "from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30",
    features: ["Easy Install", "Auto Updates"],
    size: "normal",
  },
  {
    icon: ShieldCheck,
    title: "Privacy First",
    description: "No analytics, no ads, no tracking. Your reading data stays on your device.",
    gradient: "from-amber-500 to-orange-500",
    bgGradient: "from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30",
    features: ["No Tracking", "Open Source"],
    size: "normal",
  },
  {
    icon: Moon,
    title: "Custom Themes",
    description: "Dark mode, light mode, and custom color schemes to match your style.",
    gradient: "from-indigo-500 to-violet-500",
    bgGradient: "from-indigo-50 to-violet-50 dark:from-indigo-950/30 dark:to-violet-950/30",
    features: ["Dark Mode", "Custom Colors"],
    size: "normal",
  },
  {
    icon: CloudDownload,
    title: "Offline Reading",
    description: "Download chapters for offline access. Read anywhere, anytime.",
    gradient: "from-pink-500 to-rose-500",
    bgGradient: "from-pink-50 to-rose-50 dark:from-pink-950/30 dark:to-rose-950/30",
    features: ["Auto Download", "Background Sync"],
    size: "normal",
  },
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

export default function FeatureHighlights(): ReactElement {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="relative py-24 md:py-32 overflow-hidden bg-neutral-50 dark:bg-neutral-900/50">
      {/* Background */}
      <div className="absolute inset-0 dotted-pattern opacity-50" />
      
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-purple-200/30 to-blue-200/30 dark:from-purple-900/20 dark:to-blue-900/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-200/30 to-purple-200/30 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full blur-3xl" />

      <div className="page-shell relative z-10">
        <div className="flex flex-col gap-16 md:gap-20">
          
          {/* Section Header */}
          <div className={`flex flex-col items-center gap-4 text-center max-w-3xl mx-auto transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 border border-purple-200/50 dark:border-purple-500/20 text-sm font-medium text-purple-700 dark:text-purple-300">
              <Sparkles className="w-4 h-4" />
              Features
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white">
              Everything you need for{" "}
              <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                reading
              </span>
            </h2>
            <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Powerful features designed for the ultimate reading experience. 
              Cross-platform, customizable, and completely private.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const isLarge = feature.size === "large";
              
              return (
                <article
                  key={feature.title}
                  className={`group relative flex flex-col gap-4 p-6 md:p-8 rounded-3xl bg-gradient-to-br ${feature.bgGradient} border border-neutral-200/50 dark:border-neutral-800/50 transition-all duration-500 hover:shadow-xl hover:scale-[1.02] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${isLarge ? 'md:col-span-1 lg:col-span-1' : ''}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center rounded-2xl bg-gradient-to-br ${feature.gradient} text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 ${isLarge ? 'w-14 h-14' : 'w-12 h-12'}`}>
                    <Icon className={isLarge ? "w-7 h-7" : "w-6 h-6"} />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col gap-2">
                    <h3 className="text-xl font-semibold text-neutral-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      {feature.title}
                    </h3>
                    <p className={`text-neutral-600 dark:text-neutral-400 leading-relaxed ${isLarge ? 'text-base' : 'text-sm'}`}>
                      {feature.description}
                    </p>
                  </div>

                  {/* Feature Tags */}
                  <div className="flex flex-wrap gap-2 mt-auto pt-2">
                    {feature.features.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/80 dark:bg-neutral-900/80 text-neutral-600 dark:text-neutral-400 border border-neutral-200/50 dark:border-neutral-700/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Hover Arrow */}
                  <div className="absolute bottom-6 right-6 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    <ArrowRight className="w-5 h-5 text-purple-500" />
                  </div>
                </article>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <div className={`flex flex-col items-center gap-6 text-center transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-neutral-600 dark:text-neutral-400">
              And many more features to discover...
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/docs/getting-started"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold shadow-lg shadow-purple-500/25 hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
              >
                <BookOpen className="w-5 h-5" />
                Get Started Guide
              </a>
              <a
                href="/comparison"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-neutral-900 border-2 border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white font-semibold hover:border-purple-300 dark:hover:border-purple-700 transition-all duration-300"
              >
                Compare with Others
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
