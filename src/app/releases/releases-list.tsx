"use client";

import { Download, FileCode, Calendar, Hash, Package } from "lucide-react";

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
    <section className="grid gap-8 lg:grid-cols-[240px_1fr]">
      {/* Sidebar Navigation */}
      <aside className="hidden lg:flex flex-col gap-4 self-start sticky top-28">
        <div className="flex items-center gap-2 px-3">
          <Package className="w-4 h-4 text-[var(--brand-primary)]" />
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--foreground-muted)]">
            Versions
          </span>
        </div>
        <nav className="flex flex-col gap-1">
          {releases.map((release, index) => (
            <a
              key={release.id}
              href={`#${release.anchor}`}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                index === 0
                  ? "bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-secondary)] text-white"
                  : "text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:bg-[var(--background-soft)]"
              }`}
            >
              {release.tagName}
            </a>
          ))}
        </nav>
      </aside>

      {/* Releases List */}
      <div className="flex flex-col gap-6">
        {releases.map((release, index) => (
          <article
            key={release.id}
            id={release.anchor}
            className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            {/* Gradient accent for latest */}
            {index === 0 && (
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-secondary)]" />
            )}
            
            <div className="p-6 md:p-8">
              {/* Header */}
              <header className="flex flex-col gap-4 mb-6">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex items-center gap-3">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-xl ${
                      index === 0
                        ? "bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-secondary)] text-white"
                        : "bg-[var(--background-soft)] text-[var(--foreground-muted)]"
                    }`}>
                      <FileCode className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[var(--foreground)]">
                        {release.name}
                      </h3>
                      <span className="text-sm text-[var(--foreground-muted)]">
                        {release.tagName}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[var(--foreground-muted)]">
                    <Calendar className="w-4 h-4" />
                    <time>{release.publishedAt}</time>
                  </div>
                </div>

                {/* Latest badge */}
                {index === 0 && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-[var(--brand-primary)]/10 to-[var(--brand-secondary)]/10 border border-[var(--brand-primary)]/20 w-fit">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-semibold text-[var(--brand-primary)]">Latest Release</span>
                  </div>
                )}
              </header>

              {/* Assets Table */}
              <div className="overflow-x-auto rounded-xl border border-[var(--border)] bg-[var(--background-soft)]">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[var(--border)] bg-[var(--surface)]">
                      <th className="px-4 py-3 text-left font-semibold text-[var(--foreground)]">
                        <div className="flex items-center gap-2">
                          <Download className="w-4 h-4" />
                          File
                        </div>
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-[var(--foreground)]">
                        <div className="flex items-center gap-2">
                          <Hash className="w-4 h-4" />
                          SHA256
                        </div>
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-[var(--foreground)]">Size</th>
                      <th className="px-4 py-3 text-left font-semibold text-[var(--foreground)]">Released</th>
                    </tr>
                  </thead>
                  <tbody>
                    {release.assets.map((asset) => (
                      <tr
                        key={asset.url}
                        className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--surface)] transition-colors"
                      >
                        <td className="px-4 py-3">
                          <a
                            href={asset.url}
                            className="inline-flex items-center gap-2 font-medium text-[var(--brand-primary)] hover:text-[var(--brand-secondary)] transition-colors"
                          >
                            <Download size={14} />
                            {asset.label}
                          </a>
                        </td>
                        <td className="px-4 py-3">
                          {asset.sha256 ? (
                            <code className="text-xs font-mono text-[var(--foreground-muted)] bg-[var(--surface)] px-2 py-1 rounded" title={asset.sha256}>
                              {asset.sha256.slice(0, 8)}...
                            </code>
                          ) : (
                            <span className="text-[var(--foreground-subtle)]">—</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-[var(--foreground-muted)]">
                          {asset.size}
                        </td>
                        <td className="px-4 py-3 text-[var(--foreground-muted)]">
                          {getRelativeTime(release.publishedAtRaw)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Release Notes */}
              {release.notes && (
                <div className="mt-6 pt-6 border-t border-[var(--border)]">
                  <h4 className="text-sm font-semibold text-[var(--foreground)] mb-3">Release Notes</h4>
                  <Markdown
                    markdown={release.notes}
                    className="prose prose-sm prose-slate dark:prose-invert max-w-none
                      prose-headings:text-[var(--foreground)]
                      prose-p:text-[var(--foreground-muted)]
                      prose-a:text-[var(--brand-primary)]
                      prose-code:text-[var(--brand-primary)] prose-code:bg-[var(--background-soft)] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
                      prose-li:text-[var(--foreground-muted)]
                    "
                  />
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
