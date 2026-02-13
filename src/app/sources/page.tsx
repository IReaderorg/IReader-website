import type { Metadata } from "next";

import PageChrome from "@/app/(features)/components/page-chrome";
import SourcesExplorer from "@/app/sources/sources-explorer";
import RepositoryInstructions from "@/app/sources/repository-instructions";
import type { SourceSummary } from "@/app/sources/types";
import { BookOpen, Globe, Sparkles } from "lucide-react";

const sourcesRepositoryUrl =
  "https://raw.githubusercontent.com/IReaderorg/IReader-extensions/refs/heads/repo/index.min.json" as const;

const parseSources = (payload: unknown): SourceSummary[] => {
  if (!Array.isArray(payload)) {
    return [];
  }

  return payload
    .map((entry) => {
      if (entry === null || typeof entry !== "object") {
        return undefined;
      }

      const record = entry as Record<string, unknown>;
      const id = 
        typeof record.id === "string" 
          ? record.id.trim() 
          : typeof record.id === "number" 
          ? String(record.id) 
          : undefined;
      const name =
        typeof record.name === "string" ? record.name.trim() : undefined;
      const version =
        typeof record.version === "string" ? record.version.trim() : undefined;
      const lang =
        typeof record.lang === "string" ? record.lang.trim() : undefined;
      const apk =
        typeof record.apk === "string" ? record.apk.trim() : undefined;
      if (!id || !name || !version || !lang || !apk) {
        return undefined;
      }

      return { id, name, version, lang, apk } satisfies SourceSummary;
    })
    .filter((source): source is SourceSummary => Boolean(source))
    .sort((sourceA, sourceB) => sourceA.name.localeCompare(sourceB.name));
};

const fetchSources = async (): Promise<SourceSummary[]> => {
  const response = await fetch(sourcesRepositoryUrl, {
    next: { revalidate: 60 * 60 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch sources (${response.status})`);
  }

  const payload = (await response.json()) as unknown;
  return parseSources(payload);
};

export const metadata: Metadata = {
  title: "Sources",
  description:
    "Browse the official IReader sources repository and review available languages.",
};

export default async function SourcesPage() {
  let sources: SourceSummary[] = [];
  let errorMessage: string | undefined;

  try {
    sources = await fetchSources();
  } catch (error) {
    errorMessage =
      error instanceof Error
        ? error.message
        : "An unexpected error occurred while loading sources.";
  }

  return (
    <PageChrome containerClassName="w-full max-w-6xl mx-auto flex flex-col gap-10 pt-24 pb-16 px-6">
      {/* Hero Header */}
      <header className="flex flex-col gap-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[var(--brand-primary)]/10 to-[var(--brand-secondary)]/10 border border-[var(--brand-primary)]/20 w-fit">
          <Globe className="w-4 h-4 text-[var(--brand-primary)]" />
          <span className="text-sm font-medium text-[var(--brand-primary)]">Official Repository</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[var(--foreground)]">
          Sources
        </h1>
        <div className="flex flex-col gap-3 text-lg text-[var(--foreground-muted)] max-w-2xl">
          <p>
            By default, IReader comes without any sources. You can choose to
            read local content or include an external repository.
          </p>
          <p>
            Browse the available sources below and add the official repository to your IReader app.
          </p>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-gradient-to-br from-[var(--brand-primary)]/10 to-[var(--brand-secondary)]/10 border border-[var(--brand-primary)]/20">
          <div className="text-3xl font-bold text-[var(--brand-primary)]">{sources.length}</div>
          <div className="text-sm text-[var(--foreground-muted)]">Total Sources</div>
        </div>
        <div className="p-4 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
          <div className="text-3xl font-bold text-[var(--foreground)]">
            {new Set(sources.map(s => s.lang)).size}
          </div>
          <div className="text-sm text-[var(--foreground-muted)]">Languages</div>
        </div>
        <div className="p-4 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <span className="text-sm font-medium text-[var(--foreground)]">Free</span>
          </div>
          <div className="text-sm text-[var(--foreground-muted)]">All Sources</div>
        </div>
        <div className="p-4 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-500" />
            <span className="text-sm font-medium text-[var(--foreground)]">Active</span>
          </div>
          <div className="text-sm text-[var(--foreground-muted)]">Repository</div>
        </div>
      </div>

      <RepositoryInstructions repositoryUrl={sourcesRepositoryUrl} />

      {errorMessage ? (
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
            <span className="text-3xl">⚠️</span>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-semibold text-[var(--foreground)]">
              Unable to load sources
            </h3>
            <p className="text-[var(--foreground-muted)]">
              {errorMessage}
            </p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="rounded-xl bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-secondary)] px-6 py-3 text-sm font-medium text-white transition-all duration-200 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] focus:ring-offset-2"
            aria-label="Retry loading sources"
          >
            Retry
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-[var(--foreground)]">
              Available Sources
            </h2>
          </div>
          <SourcesExplorer sources={sources} />
        </div>
      )}
    </PageChrome>
  );
}
