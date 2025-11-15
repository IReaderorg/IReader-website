import type { ReactElement } from "react";
import { Smartphone, Monitor } from "lucide-react";

interface Platform {
  readonly icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  readonly name: string;
  readonly description: string;
  readonly features: readonly string[];
  readonly systemRequirements?: readonly string[];
}

const platforms: Platform[] = [
  {
    icon: Smartphone,
    name: "Android",
    description:
      "Full-featured mobile reading experience with extension support and offline capabilities.",
    features: [
      "Install extensions for unlimited content sources",
      "Download chapters for offline reading",
      "Customizable themes and reading modes",
      "Track reading progress across your library",
      "Backup and restore your data locally",
    ],
  },
  {
    icon: Monitor,
    name: "Desktop",
    description:
      "Enhanced reading on Windows, macOS, and Linux with exclusive Text-to-Speech powered by Piper TTS.",
    features: [
      "All Android features plus Text-to-Speech",
      "Natural AI voices with word highlighting",
      "Offline voice models in multiple languages",
      "Keyboard shortcuts for efficient navigation",
      "Larger screen optimized reading layouts",
    ],
    systemRequirements: [
      "Windows 10 or later",
      "macOS 10.15 (Catalina) or later",
      "Linux with ALSA or PulseAudio",
      "4GB RAM minimum",
      "500MB available disk space",
    ],
  },
];

export default function PlatformSection(): ReactElement {
  return (
    <section className="py-[var(--spacing-20)] bg-[var(--color-background)]">
      <div className="page-shell">
        <div className="flex flex-col gap-[var(--spacing-12)]">
          <div className="flex flex-col gap-[var(--spacing-4)] max-w-3xl">
            <span className="badge">Platforms</span>
            <h2 className="text-3xl sm:text-[2.4rem] font-semibold tracking-[-0.025em]">
              Read anywhere, on any device
            </h2>
            <p className="text-base sm:text-lg text-[color-mix(in_srgb,_var(--color-foreground)_70%,_transparent)] leading-relaxed">
              IReader brings a consistent reading experience to both mobile and desktop, with platform-specific enhancements that take advantage of each device&apos;s capabilities.
            </p>
          </div>

          <div className="grid gap-[var(--spacing-8)] md:grid-cols-2">
            {platforms.map(({ icon: Icon, name, description, features, systemRequirements }) => (
              <article
                key={name}
                className="flex flex-col gap-[var(--spacing-4)] rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-[var(--spacing-6)] transition-all duration-[var(--transition-base)] hover:shadow-[var(--shadow-lg)] hover:border-[var(--color-brand-primary)] hover:scale-[1.01]"
              >
                <div className="flex items-center gap-[var(--spacing-3)]">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-accent-soft)] text-[var(--color-accent-strong)]">
                    <Icon strokeWidth={1.5} className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="text-xl font-semibold text-[color-mix(in_srgb,_var(--color-foreground)_90%,_transparent)]">
                    {name}
                  </h3>
                </div>

                <p className="text-sm text-[color-mix(in_srgb,_var(--color-foreground)_70%,_transparent)] leading-relaxed">
                  {description}
                </p>

                <div className="flex flex-col gap-[var(--spacing-2)]">
                  <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-brand-primary)]">
                    Features
                  </h4>
                  <ul className="flex flex-col gap-[var(--spacing-2)]">
                    {features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-[var(--spacing-2)] text-sm text-[color-mix(in_srgb,_var(--color-foreground)_75%,_transparent)]"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-brand-primary)]" aria-hidden="true" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {systemRequirements && (
                  <div className="flex flex-col gap-[var(--spacing-2)] border-t border-[var(--color-border)] pt-[var(--spacing-4)]">
                    <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-brand-primary)]">
                      System Requirements
                    </h4>
                    <ul className="flex flex-col gap-[var(--spacing-1)]">
                      {systemRequirements.map((requirement) => (
                        <li
                          key={requirement}
                          className="text-xs text-[color-mix(in_srgb,_var(--color-foreground)_68%,_transparent)]"
                        >
                          {requirement}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
