import type { Metadata } from "next";
import PageChrome from "@/app/(features)/components/page-chrome";
import { fetchReleases } from "@/lib/github/releases";
import ReleasesList from "./releases-list";
import { Tag, Download, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Releases",
  description: "Keep up with the latest IReader releases pulled from GitHub.",
};

export default async function ReleasesPage() {
  const { releases, updatedAt } = await fetchReleases();

  return (
    <PageChrome containerClassName="w-full px-6 md:px-10 lg:px-16 flex flex-col gap-10 pt-24 pb-16">
      {/* Hero Header */}
      <header className="flex flex-col gap-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[var(--brand-primary)]/10 to-[var(--brand-secondary)]/10 border border-[var(--brand-primary)]/20 mx-auto">
          <Tag className="w-4 h-4 text-[var(--brand-primary)]" />
          <span className="text-sm font-medium text-[var(--brand-primary)]">Version History</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[var(--foreground)]">
          Releases
        </h1>
        <p className="text-lg text-[var(--foreground-muted)] max-w-2xl mx-auto">
          Keep up with the latest IReader releases. Download the newest version or explore previous releases.
        </p>
      </header>

      {/* Stats */}
      <div className="flex justify-center gap-4 flex-wrap">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
          <Download className="w-4 h-4 text-[var(--brand-primary)]" />
          <span className="text-sm font-medium text-[var(--foreground)]">{releases.length} Releases</span>
        </div>
        {updatedAt && (
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
            <Clock className="w-4 h-4 text-[var(--brand-secondary)]" />
            <span className="text-sm text-[var(--foreground-muted)]">Updated {updatedAt}</span>
          </div>
        )}
      </div>

      <ReleasesList releases={releases} updatedAt={updatedAt} />
    </PageChrome>
  );
}
