"use client";

import { Download } from "lucide-react";

import { Markdown } from "@/components/markdown";
import type { GitHubRelease, GitHubAsset } from "@/lib/github/releases";

interface ReleasesListProps {
  readonly releases: GitHubRelease[];
  readonly updatedAt: string | null;
}

function getRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins} minute${diffMins === 1 ? "" : "s"} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays === 1 ? "" : "s"} ago`;
  if (diffWeeks < 4) return `${diffWeeks} week${diffWeeks === 1 ? "" : "s"} ago`;
  if (diffMonths < 12) return `${diffMonths} month${diffMonths === 1 ? "" : "s"} ago`;
  return `${diffYears} year${diffYears === 1 ? "" : "s"} ago`;
}

export default function ReleasesList({
  releases,
  updatedAt,
}: ReleasesListProps) {
  return (
    <section className="grid gap-6 lg:grid-cols-[200px_1fr]">
      <aside className="flex flex-col gap-2 self-start border-r border-[var(--color-border)] pr-4 text-xs text-[color-mix(in_srgb,_var(--color-muted)_65%,_transparent)]">
        <span className="px-1 font-semibold uppercase tracking-[0.14em] text-[color-mix(in_srgb,_var(--color-muted)_70%,_transparent)]">
          Versions
        </span>
        <nav className="flex flex-col gap-1">
          {releases.map((release) => (
            <a
              key={release.id}
              href={`#${release.anchor}`}
              className="rounded-sm px-1.5 py-1 hover:bg-[var(--color-accent-soft)] hover:text-[var(--color-accent-strong)]"
            >
              {release.tagName}
            </a>
          ))}
        </nav>
      </aside>

      <div className="grid gap-6">
        {updatedAt ? (
          <p className="text-xs text-[color-mix(in_srgb,_var(--color-muted)_65%,_transparent)]">
            Updated {updatedAt}
          </p>
        ) : null}

        <div className="grid gap-6">
          {releases.map((release) => (
            <article
              key={release.id}
              id={release.anchor}
              className="flex flex-col gap-3 rounded-sm bg-[var(--color-background-soft)] px-5 py-5"
            >
              <header className="flex flex-col gap-1">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-sm font-semibold text-[color-mix(in_srgb,_var(--color-foreground)_82%,_transparent)]">
                    {release.name}
                  </span>
                  <time className="text-xs text-[color-mix(in_srgb,_var(--color-muted)_70%,_transparent)]">
                    {release.publishedAt}
                  </time>
                </div>
                <span className="text-xs text-[color-mix(in_srgb,_var(--color-muted)_70%,_transparent)]">
                  {release.tagName}
                </span>
                <div className="mt-3 overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-[var(--color-border)] text-left text-[color-mix(in_srgb,_var(--color-muted)_70%,_transparent)]">
                        <th className="pb-2 pr-4 font-medium">File</th>
                        <th className="pb-2 pr-4 font-medium">SHA256</th>
                        <th className="pb-2 pr-4 font-medium">Size</th>
                        <th className="pb-2 font-medium">Released</th>
                      </tr>
                    </thead>
                    <tbody>
                      {release.assets.map((asset) => (
                        <tr
                          key={asset.url}
                          className="border-b border-[var(--color-border)] last:border-b-0"
                        >
                          <td className="py-2 pr-4">
                            <a
                              href={asset.url}
                              className="inline-flex items-center gap-1.5 text-[var(--color-accent-strong)] hover:underline"
                            >
                              <Download size={12} strokeWidth={1.5} />
                              {asset.label}
                            </a>
                          </td>
                          <td className="py-2 pr-4 font-mono text-[color-mix(in_srgb,_var(--color-muted)_70%,_transparent)]">
                            {asset.sha256 ? (
                              <span title={asset.sha256}>
                                sha256:{asset.sha256.slice(0, 8)}...
                              </span>
                            ) : (
                              <span className="text-[color-mix(in_srgb,_var(--color-muted)_50%,_transparent)]">
                                —
                              </span>
                            )}
                          </td>
                          <td className="py-2 pr-4 text-[color-mix(in_srgb,_var(--color-muted)_70%,_transparent)]">
                            {asset.size}
                          </td>
                          <td className="py-2 text-[color-mix(in_srgb,_var(--color-muted)_70%,_transparent)]">
                            {getRelativeTime(release.publishedAtRaw)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </header>

              <Markdown
                markdown={release.notes}
                className="text-xs leading-6"
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
