import Link from "next/link";
import type { ReactElement } from "react";

const sourceHighlights: Array<{
  readonly title: string;
  readonly detail: string;
}> = [
  {
    title: "Global catalogue",
    detail:
      "200+ community-maintained extensions covering EN, JP, VN, FR, ES, and more.",
  },
  {
    title: "Self-hosted extensions",
    detail:
      "Host your own extension repository or fork existing extensions to tailor your sources.",
  },
  {
    title: "One-tap updates",
    detail:
      "Refresh entire lists to fetch new chapters and track release schedules instantly.",
  },
];

export default function FeatureSources(): ReactElement {
  return (
    <section className="py-[var(--spacing-20)] bg-[var(--color-background-soft)]">
      <div className="page-shell">
        <div className="flex flex-col gap-[var(--spacing-8)]">
          <div className="flex flex-col gap-[var(--spacing-4)] max-w-3xl">
            <span className="badge">Sources</span>
            <h2 className="text-3xl sm:text-[2.4rem] font-semibold tracking-[-0.025em] text-balance">
              Powered by open extensions maintained by the IReader community
            </h2>
            <p className="text-base sm:text-lg text-[color-mix(in_srgb,_var(--color-foreground)_70%,_transparent)] leading-relaxed">
              Extensions mirror the Tachiyomi and Mihon experience while being built
              specifically for IReader. Install only what you need, audit the code,
              and contribute improvements back.
            </p>
          </div>

          <div className="grid gap-[var(--spacing-4)] md:grid-cols-3">
            {sourceHighlights.map(({ title, detail }) => (
              <div key={title} className="flex flex-col gap-[var(--spacing-2)] p-[var(--spacing-5)] rounded-[var(--radius-lg)] bg-[var(--color-surface)] border border-[var(--color-border)] transition-all duration-[var(--transition-base)] hover:shadow-[var(--shadow-md)] hover:border-[var(--color-brand-primary)] hover:scale-[1.01]">
                <h3 className="text-base font-semibold text-[color-mix(in_srgb,_var(--color-foreground)_88%,_transparent)]">
                  {title}
                </h3>
                <p className="text-sm text-[color-mix(in_srgb,_var(--color-foreground)_70%,_transparent)] leading-relaxed">
                  {detail}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-[var(--spacing-4)] sm:flex-row sm:items-center sm:justify-between p-[var(--spacing-5)] rounded-[var(--radius-lg)] bg-[var(--color-surface)] border border-[var(--color-border)] transition-all duration-[var(--transition-base)] hover:shadow-[var(--shadow-md)]">
            <div className="text-sm text-[color-mix(in_srgb,_var(--color-foreground)_70%,_transparent)]">
              Maintained at
              <Link
                href="https://github.com/IReaderorg/IReader-extensions"
                className="ml-2 font-semibold text-[var(--color-brand-primary)] hover:text-[var(--color-brand-primary-light)] transition-colors duration-[var(--transition-base)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)] focus-visible:ring-offset-2 rounded-sm"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View IReader extensions repository on GitHub (opens in new tab)"
              >
                IReaderorg/IReader-extensions
              </Link>
            </div>
            <Link
              href="https://github.com/IReaderorg/IReader-extensions/issues"
              className="inline-flex items-center justify-center rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-background)] px-[var(--spacing-4)] py-[var(--spacing-2)] min-h-[44px] text-sm font-semibold text-[var(--color-brand-primary)] hover:bg-[var(--color-brand-primary)] hover:text-white hover:border-[var(--color-brand-primary)] hover:scale-105 transition-all duration-[var(--transition-base)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)] focus-visible:ring-offset-2"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Request a new source on GitHub (opens in new tab)"
            >
              Request a source
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
