import type { ReactElement } from "react";

const highlights = [
  {
    title: "Transparent roadmap",
    description:
      "Feature requests and bug triage happen in the open on GitHub discussions and issues.",
  },
  {
    title: "Inspired evolution",
    description:
      "We draw inspiration from Tachiyomi and Mihon while charting IReader's own roadmap.",
  },
  {
    title: "Inclusive moderation",
    description:
      "Community guidelines ensure support spaces stay welcoming for new readers and contributors.",
  },
];

export default function CommunitySection(): ReactElement {
  return (
    <section className="py-[var(--spacing-20)] bg-[var(--color-background)]">
      <div className="page-shell">
        <div className="grid gap-[var(--spacing-8)] lg:grid-cols-[1.05fr_1fr] items-start">
          <div className="flex flex-col gap-[var(--spacing-6)]">
            <div className="flex flex-col gap-[var(--spacing-4)]">
              <span className="badge">Community</span>
              <h2 className="text-3xl sm:text-[2.4rem] font-semibold tracking-[-0.025em] text-balance">
                Built together with translators, extension authors, and readers worldwide
              </h2>
              <p className="text-base sm:text-lg text-[color-mix(in_srgb,_var(--color-foreground)_70%,_transparent)] leading-relaxed">
                IReader has been open source since day one. Join the Discord, share
                feedback, and ship your own improvements. Our maintainers review
                contributions quickly and help new contributors succeed.
              </p>
            </div>
            <div className="grid gap-[var(--spacing-4)]">
              {highlights.map(({ title, description }) => (
                <div key={title} className="flex flex-col gap-[var(--spacing-2)] p-[var(--spacing-4)] rounded-[var(--radius-lg)] bg-[var(--color-surface)] border border-[var(--color-border)] transition-all duration-[var(--transition-base)] hover:shadow-[var(--shadow-md)] hover:border-[var(--color-brand-primary)] hover:scale-[1.01]">
                  <h3 className="text-base font-semibold text-[color-mix(in_srgb,_var(--color-foreground)_88%,_transparent)]">
                    {title}
                  </h3>
                  <p className="text-sm text-[color-mix(in_srgb,_var(--color-foreground)_70%,_transparent)] leading-relaxed">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-[var(--spacing-6)] text-sm text-[color-mix(in_srgb,_var(--color-foreground)_68%,_transparent)]">
            <div className="flex flex-col gap-[var(--spacing-3)] p-[var(--spacing-5)] rounded-[var(--radius-lg)] bg-[var(--color-surface)] border border-[var(--color-border)] transition-all duration-[var(--transition-base)] hover:shadow-[var(--shadow-md)]">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-brand-primary)]">
                Contributor stats
              </span>
              <ul className="grid gap-[var(--spacing-2)]">
                <li className="flex items-start gap-[var(--spacing-2)]">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-brand-primary)]" aria-hidden="true" />
                  <span>50+ contributors merged in the past year</span>
                </li>
                <li className="flex items-start gap-[var(--spacing-2)]">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-brand-primary)]" aria-hidden="true" />
                  <span>3k+ GitHub stars · Active development</span>
                </li>
                <li className="flex items-start gap-[var(--spacing-2)]">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-brand-primary)]" aria-hidden="true" />
                  <span>Active Discord with extension authors &amp; maintainers</span>
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-[var(--spacing-3)] p-[var(--spacing-5)] rounded-[var(--radius-lg)] bg-[var(--color-surface)] border border-[var(--color-border)] transition-all duration-[var(--transition-base)] hover:shadow-[var(--shadow-md)]">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-brand-primary)]">
                How to participate
              </span>
              <ul className="grid gap-[var(--spacing-2)]">
                <li className="flex items-start gap-[var(--spacing-2)]">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-brand-primary)]" aria-hidden="true" />
                  <span>Submit PRs and review code in our GitHub repository</span>
                </li>
                <li className="flex items-start gap-[var(--spacing-2)]">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-brand-primary)]" aria-hidden="true" />
                  <span>Help localize UI strings through Weblate</span>
                </li>
                <li className="flex items-start gap-[var(--spacing-2)]">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-brand-primary)]" aria-hidden="true" />
                  <span>Share novel recommendations in the Discord community</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
