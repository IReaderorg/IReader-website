import type { ReactElement } from "react";
import {
  CloudDownload,
  Palette,
  Monitor,
  Volume2,
  ShieldCheck,
  Puzzle,
} from "lucide-react";

interface Highlight {
  readonly icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  readonly title: string;
  readonly description: string;
}

const highlights: Highlight[] = [
  {
    icon: Monitor,
    title: "Cross-Platform",
    description:
      "Read on Android and Desktop with synchronized progress.",
  },
  {
    icon: Volume2,
    title: "Text-to-Speech",
    description:
      "Natural AI voices with word highlighting (Desktop only).",
  },
  {
    icon: Puzzle,
    title: "Extension Support",
    description:
      "Install community extensions to add new content sources.",
  },
  {
    icon: ShieldCheck,
    title: "Privacy First",
    description:
      "No analytics, no ads, no tracking. Everything runs locally.",
  },
];

export default function FeatureHighlights(): ReactElement {
  return (
    <section className="py-[var(--spacing-20)] bg-[var(--color-background-soft)]">
      <div className="page-shell">
        <div className="relative flex flex-col gap-[var(--spacing-12)]">
          <div className="absolute right-[-12%] top-0 h-72 w-72 rounded-full bg-[radial-gradient(circle,_rgba(16,110,129,0.18),transparent_70%)] blur-2xl" />
          <div className="flex flex-col gap-[var(--spacing-4)] max-w-3xl">
            <span className="badge">Capability</span>
            <h2 className="text-3xl sm:text-[2.4rem] font-semibold tracking-[-0.025em]">
              Everything you need for reading
            </h2>
            <p className="text-base sm:text-lg text-[color-mix(in_srgb,_var(--color-foreground)_70%,_transparent)] leading-relaxed">
              Cross-platform support, Text-to-Speech, extensions, and privacy-first design.
            </p>
          </div>

          <div className="grid gap-[var(--spacing-6)] grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {highlights.map(({ icon: Icon, title, description }) => (
              <article 
                key={title} 
                className="flex flex-col items-start gap-[var(--spacing-4)] p-[var(--spacing-6)] rounded-[var(--radius-lg)] bg-[var(--color-surface)] border border-[var(--color-border)] shadow-[var(--shadow-sm)] transition-all duration-[var(--transition-base)] hover:scale-[1.02] hover:shadow-[var(--shadow-md)]"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)] bg-gradient-to-br from-[var(--color-brand-primary)] to-[var(--color-brand-accent)] text-white shrink-0">
                  <Icon strokeWidth={1.5} className="h-6 w-6" aria-hidden="true" />
                </div>
                <div className="flex flex-col gap-[var(--spacing-2)]">
                  <h3 className="text-lg font-semibold text-[color-mix(in_srgb,_var(--color-foreground)_88%,_transparent)]">
                    {title}
                  </h3>
                  <p className="text-sm text-[color-mix(in_srgb,_var(--color-foreground)_70%,_transparent)] leading-relaxed">
                    {description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
