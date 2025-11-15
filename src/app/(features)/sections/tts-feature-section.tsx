import type { ReactElement } from "react";
import Link from "next/link";
import {
  Mic,
  Wifi,
  Languages,
  Highlighter,
  Settings,
  Check,
} from "lucide-react";

interface TTSFeature {
  readonly icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  readonly title: string;
  readonly description: string;
}

const ttsFeatures: TTSFeature[] = [
  {
    icon: Mic,
    title: "High-Quality Neural Voices",
    description:
      "Powered by Piper TTS with natural-sounding AI voices across multiple quality levels.",
  },
  {
    icon: Wifi,
    title: "Offline-First",
    description:
      "All voice models run locally on your device—no internet connection required after setup.",
  },
  {
    icon: Languages,
    title: "Multi-Language Support",
    description:
      "Choose from dozens of languages and regional accents to match your reading preferences.",
  },
  {
    icon: Highlighter,
    title: "Word Highlighting",
    description:
      "Follow along visually as each word is highlighted in sync with the narration.",
  },
  {
    icon: Settings,
    title: "Customizable Playback",
    description:
      "Adjust speed, pitch, and volume to create your perfect listening experience.",
  },
];

export default function TTSFeatureSection(): ReactElement {
  return (
    <section className="py-[var(--spacing-20)] bg-[var(--color-background-soft)]">
      <div className="page-shell">
        <div className="relative flex flex-col gap-[var(--spacing-12)]">
          <div className="absolute left-[-10%] top-0 h-64 w-64 rounded-full bg-[radial-gradient(circle,_rgba(16,110,129,0.15),transparent_70%)] blur-2xl" />
          
          <div className="grid gap-[var(--spacing-12)] lg:grid-cols-2 items-center">
            {/* Text Content */}
            <div className="flex flex-col gap-[var(--spacing-6)]">
              <div className="flex flex-col gap-[var(--spacing-4)]">
                <span className="badge">Desktop Feature</span>
                <h2 className="text-3xl sm:text-[2.4rem] font-semibold tracking-[-0.025em]">
                  Immersive Text-to-Speech with Piper TTS
                </h2>
                <p className="text-base sm:text-lg text-[color-mix(in_srgb,_var(--color-foreground)_70%,_transparent)] leading-relaxed">
                  Transform your reading experience with natural AI narration. IReader Desktop integrates Piper TTS to deliver high-quality, offline text-to-speech with word-level highlighting and full playback control.
                </p>
              </div>

              <div className="flex flex-col gap-[var(--spacing-3)]">
                {ttsFeatures.map(({ title }) => (
                  <div key={title} className="flex items-center gap-[var(--spacing-3)]">
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-brand-primary)] text-white shrink-0">
                      <Check strokeWidth={2.5} className="h-3 w-3" aria-hidden="true" />
                    </span>
                    <span className="text-sm font-medium text-[color-mix(in_srgb,_var(--color-foreground)_85%,_transparent)]">
                      {title}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-[var(--spacing-3)] sm:flex-row">
                <Link
                  href="/docs/tts-setup"
                  className="inline-flex items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-brand-primary)] px-[var(--spacing-5)] py-[var(--spacing-3)] min-h-[44px] text-sm font-semibold tracking-tight text-white transition-all duration-[var(--transition-base)] hover:bg-[var(--color-brand-primary-dark)] hover:shadow-[var(--shadow-md)] hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)] focus-visible:ring-offset-2"
                  aria-label="Read Text-to-Speech setup guide"
                >
                  TTS Setup Guide
                </Link>
                <Link
                  href="/docs/tts-troubleshooting"
                  className="inline-flex items-center justify-center rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] px-[var(--spacing-5)] py-[var(--spacing-3)] min-h-[44px] text-sm font-semibold tracking-tight text-[color-mix(in_srgb,_var(--color-foreground)_75%,_transparent)] hover:text-[var(--color-foreground)] hover:bg-[var(--color-background-soft)] hover:border-[var(--color-brand-primary)] transition-all duration-[var(--transition-base)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)] focus-visible:ring-offset-2"
                  aria-label="Read Text-to-Speech troubleshooting guide"
                >
                  Troubleshooting
                </Link>
              </div>
            </div>

            {/* Visual/Feature Details */}
            <div className="grid gap-[var(--spacing-4)]">
              {ttsFeatures.map(({ icon: Icon, title, description }) => (
                <article key={title} className="flex items-start gap-[var(--spacing-3)] p-[var(--spacing-4)] rounded-[var(--radius-lg)] bg-[var(--color-surface)] border border-[var(--color-border)] transition-all duration-[var(--transition-base)] hover:shadow-[var(--shadow-md)] hover:border-[var(--color-brand-primary)] hover:scale-[1.01]">
                  <span className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-[var(--radius-sm)] bg-[var(--color-accent-soft)] text-[var(--color-accent-strong)] shrink-0">
                    <Icon strokeWidth={1.5} className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div className="flex flex-col gap-[var(--spacing-1)]">
                    <h3 className="text-sm font-semibold text-[color-mix(in_srgb,_var(--color-foreground)_88%,_transparent)]">
                      {title}
                    </h3>
                    <p className="text-xs text-[color-mix(in_srgb,_var(--color-foreground)_70%,_transparent)] leading-relaxed">
                      {description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
