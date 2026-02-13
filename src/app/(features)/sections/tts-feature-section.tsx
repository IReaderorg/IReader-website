"use client";

import type { ReactElement } from "react";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import {
  Mic,
  Wifi,
  Languages,
  Highlighter,
  Settings,
  Check,
  Volume2,
  Play,
  ArrowRight,
  Sparkles,
  Headphones,
  Pause,
} from "lucide-react";

interface TTSFeature {
  readonly icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  readonly title: string;
  readonly description: string;
  readonly gradient: string;
}

const ttsFeatures: TTSFeature[] = [
  {
    icon: Mic,
    title: "Neural AI Voices",
    description: "Natural-sounding AI voices powered by Piper TTS across multiple quality levels.",
    gradient: "from-violet-500 to-purple-500",
  },
  {
    icon: Wifi,
    title: "100% Offline",
    description: "All voice models run locally on your device. No internet required after setup.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Languages,
    title: "Multi-Language",
    description: "Dozens of languages and regional accents to match your reading preferences.",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    icon: Highlighter,
    title: "Word Highlighting",
    description: "Follow along visually as each word is highlighted in sync with narration.",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    icon: Settings,
    title: "Full Control",
    description: "Adjust speed, pitch, and volume to create your perfect listening experience.",
    gradient: "from-pink-500 to-rose-500",
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

export default function TTSFeatureSection(): ReactElement {
  const { ref, isVisible } = useScrollAnimation();
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section ref={ref} className="relative py-24 md:py-32 overflow-hidden bg-neutral-50 dark:bg-neutral-900/50">
      {/* Background */}
      <div className="absolute inset-0 dotted-pattern opacity-50" />
      
      {/* Sound Wave Animation Background */}
      <div className="absolute inset-0 overflow-hidden opacity-[0.03] dark:opacity-[0.05]">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute left-1/2 -translate-x-1/2 rounded-full border border-purple-500"
            style={{
              width: `${(i + 1) * 250}px`,
              height: `${(i + 1) * 250}px`,
              top: `calc(50% - ${(i + 1) * 125}px)`,
              animation: `pulse ${4 + i * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.4}s`,
            }}
          />
        ))}
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-200/30 to-blue-200/30 dark:from-purple-900/20 dark:to-blue-900/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-br from-blue-200/30 to-purple-200/30 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full blur-3xl" />

      <div className="page-shell relative z-10">
        <div className="flex flex-col gap-12 lg:gap-16">
          
          {/* Section Header */}
          <div className={`flex flex-col items-center gap-4 text-center max-w-3xl mx-auto transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 border border-purple-200/50 dark:border-purple-500/20 text-sm font-medium text-purple-700 dark:text-purple-300">
              <Headphones className="w-4 h-4" />
              Desktop Feature
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white">
              Immersive{" "}
              <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                Text-to-Speech
              </span>
            </h2>
            <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Transform your reading experience with natural AI narration powered by Piper TTS. 
              High-quality, offline, with word-level highlighting.
            </p>
          </div>

          {/* Main Content */}
          <div className={`grid gap-8 lg:gap-12 lg:grid-cols-2 items-center transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            
            {/* Left: Interactive Demo */}
            <div className="order-2 lg:order-1">
              <div className="relative p-6 md:p-8 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xl overflow-hidden">
                {/* Gradient Border Effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 hover:opacity-100 transition-opacity duration-500" style={{ padding: '2px' }}>
                  <div className="absolute inset-[2px] rounded-3xl bg-white dark:bg-neutral-900" />
                </div>
                
                <div className="relative z-10 flex flex-col gap-6">
                  {/* Player Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 text-white shadow-lg">
                        <Volume2 className="w-6 h-6" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-semibold text-neutral-900 dark:text-white">Now Playing</span>
                        <span className="text-sm text-neutral-500 dark:text-neutral-400">Chapter 1: The Beginning</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg hover:scale-110 transition-transform duration-300"
                    >
                      {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                    </button>
                  </div>
                  
                  {/* Waveform Visualization */}
                  <div className="flex items-center justify-center gap-1 h-16 px-4">
                    {[...Array(40)].map((_, i) => (
                      <div
                        key={i}
                        className="w-1.5 rounded-full bg-gradient-to-t from-purple-500 to-blue-500 transition-all duration-150"
                        style={{
                          height: `${Math.sin(i * 0.5) * 30 + 35}%`,
                          animation: isPlaying ? `wave 1s ease-in-out infinite` : 'none',
                          animationDelay: `${i * 0.05}s`,
                        }}
                      />
                    ))}
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="flex flex-col gap-2">
                    <div className="h-1.5 rounded-full bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
                      <div className="h-full w-1/3 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300" />
                    </div>
                    <div className="flex justify-between text-xs text-neutral-500 dark:text-neutral-400">
                      <span>2:34</span>
                      <span>8:45</span>
                    </div>
                  </div>
                  
                  {/* Word Highlighting Demo */}
                  <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700">
                    <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                      <span>The </span>
                      <span className="text-purple-600 dark:text-purple-400 font-medium bg-purple-100 dark:bg-purple-900/30 px-1 rounded">ancient</span>
                      <span> library held secrets that had been </span>
                      <span className="text-neutral-900 dark:text-white">forgotten for centuries...</span>
                    </p>
                  </div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-purple-200/50 to-blue-200/50 dark:from-purple-800/30 dark:to-blue-800/30 rounded-full blur-2xl" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-blue-200/50 to-purple-200/50 dark:from-blue-800/30 dark:to-purple-800/30 rounded-full blur-2xl" />
              </div>
            </div>

            {/* Right: Feature List */}
            <div className="flex flex-col gap-6 order-1 lg:order-2">
              {/* Quick Features */}
              <div className="flex flex-wrap gap-2">
                {["Offline", "Natural Voices", "Multi-language", "Customizable"].map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400"
                  >
                    <Check className="w-3 h-3 text-emerald-500" />
                    {tag}
                  </span>
                ))}
              </div>

              {/* Feature Cards */}
              <div className="grid gap-3">
                {ttsFeatures.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div
                      key={feature.title}
                      className="group flex items-start gap-4 p-4 rounded-2xl bg-white/80 dark:bg-neutral-900/80 border border-neutral-200/50 dark:border-neutral-800/50 hover:bg-white dark:hover:bg-neutral-900 hover:border-purple-200 dark:hover:border-purple-800 transition-all duration-300"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className={`flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br ${feature.gradient} text-white shrink-0 transition-transform duration-300 group-hover:scale-110`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <h3 className="font-semibold text-neutral-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Link
                  href="/docs/tts-setup"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-500 px-6 py-3 min-h-[48px] text-sm font-semibold text-white shadow-lg shadow-purple-500/20 transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
                >
                  <Sparkles className="w-4 h-4" />
                  Setup Guide
                  <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </Link>
                <Link
                  href="/docs/tts-troubleshooting"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white dark:bg-neutral-900 border-2 border-neutral-200 dark:border-neutral-800 px-6 py-3 min-h-[48px] text-sm font-semibold text-neutral-900 dark:text-white transition-all duration-300 hover:border-purple-300 dark:hover:border-purple-700"
                >
                  Troubleshooting
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes wave {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(0.5); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.03; transform: translateX(-50%) scale(1); }
          50% { opacity: 0.06; transform: translateX(-50%) scale(1.05); }
        }
      `}</style>
    </section>
  );
}
