import type { Metadata } from "next";

import PageChrome from "@/app/(features)/components/page-chrome";
import SourcesExplorer from "@/app/sources/sources-explorer";
import RepositoryInstructions from "@/app/sources/repository-instructions";
import type { SourceSummary } from "@/app/sources/types";

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
    <PageChrome containerClassName="w-full max-w-6xl mx-auto flex flex-col gap-10 pt-20 pb-16">
      <header className="flex flex-col gap-3">
        <h1 className="text-[1.95rem] font-semibold tracking-[-0.02em] text-[var(--foreground)]">
          Sources
        </h1>
        <div className="flex flex-col gap-2 text-sm text-[var(--foreground-muted)]">
          <p>
            By default, IReader comes without any sources. You can choose to
            read local content or include an external repository.
          </p>
          <p>
            Browse the available sources below and add the official repository to your IReader app.
          </p>
        </div>
      </header>

      <RepositoryInstructions repositoryUrl={sourcesRepositoryUrl} />

      {errorMessage ? (
        <div className="flex flex-col items-center gap-4 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-8 text-center">
          <div className="text-5xl opacity-50">⚠️</div>
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold text-[var(--foreground)]">
              Unable to load sources
            </h3>
            <p className="text-sm text-[var(--foreground-muted)]">
              {errorMessage}
            </p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="rounded-[var(--radius-md)] bg-[var(--brand-primary)] px-4 py-2 min-h-[44px] text-sm font-medium text-white transition-all duration-[var(--transition-base)] hover:bg-[var(--brand-primary-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] focus:ring-offset-2"
            aria-label="Retry loading sources"
          >
            Retry
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-[var(--foreground)]">
              Available Sources
            </h2>
          </div>
          <SourcesExplorer sources={sources} />
        </div>
      )}
    </PageChrome>
  );
}
