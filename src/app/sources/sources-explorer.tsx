"use client";

import { useMemo, useState, useEffect } from "react";
import type { FC } from "react";
import { Search, X, Languages, ArrowUpDown, Download } from "lucide-react";

import type { SourceSummary } from "@/app/sources/types";

interface SourcesExplorerProps {
  readonly sources: readonly SourceSummary[];
}

const normalize = (value: string) => value.trim().toLowerCase();

// Language code to flag emoji mapping
const getLanguageFlag = (langCode: string): string => {
  const flagMap: Record<string, string> = {
    en: "🇬🇧",
    es: "🇪🇸",
    fr: "🇫🇷",
    de: "🇩🇪",
    it: "🇮🇹",
    pt: "🇵🇹",
    ru: "🇷🇺",
    ja: "🇯🇵",
    ko: "🇰🇷",
    zh: "🇨🇳",
    ar: "🇸🇦",
    hi: "🇮🇳",
    tr: "🇹🇷",
    pl: "🇵🇱",
    nl: "🇳🇱",
    id: "🇮🇩",
    th: "🇹🇭",
    vi: "🇻🇳",
  };
  return flagMap[langCode.toLowerCase()] || "🌐";
};

// Skeleton loading component
const SkeletonCard: FC = () => (
  <div className="animate-pulse rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-4">
    <div className="flex items-start gap-3">
      <div className="h-10 w-10 rounded-[var(--radius-md)] bg-[var(--surface-muted)]" />
      <div className="flex-1">
        <div className="mb-2 h-5 w-3/4 rounded bg-[var(--surface-muted)]" />
        <div className="mb-3 h-4 w-1/2 rounded bg-[var(--surface-muted)]" />
        <div className="flex gap-2">
          <div className="h-5 w-16 rounded-full bg-[var(--surface-muted)]" />
          <div className="h-5 w-12 rounded-full bg-[var(--surface-muted)]" />
        </div>
      </div>
    </div>
  </div>
);

// Source card component
const SourceCard: FC<{ readonly source: SourceSummary }> = ({ source }) => {
  const { name, version, lang, id, apk } = source;
  const flag = getLanguageFlag(lang);
  const downloadUrl = `https://raw.githubusercontent.com/IReaderorg/IReader-extensions/refs/heads/repo/apk/${apk}`;

  return (
    <div className="group rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-4 transition-all duration-[var(--transition-base)] hover:-translate-y-1 hover:shadow-[var(--shadow-lg)]">
      <div className="flex flex-col gap-3">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-accent)] text-xl shrink-0">
            {flag}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="mb-1 truncate text-base font-semibold text-[var(--foreground)] group-hover:text-[var(--brand-primary)] transition-colors duration-[var(--transition-base)]">
              {name}
            </h3>
            <p className="mb-3 truncate text-xs text-[var(--foreground-subtle)]">
              {id}
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-[var(--brand-primary)] bg-opacity-10 px-2.5 py-0.5 text-xs font-medium text-[var(--brand-primary)]">
                <Languages size={12} />
                {lang.toUpperCase()}
              </span>
              <span className="inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--surface-muted)] px-2.5 py-0.5 text-xs font-medium text-[var(--foreground-muted)]">
                v{version}
              </span>
            </div>
          </div>
        </div>
        <a
          href={downloadUrl}
          download={apk}
          className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-md)] bg-[var(--brand-primary)] px-3 py-2 min-h-[44px] text-sm font-medium text-white transition-all duration-[var(--transition-base)] hover:bg-[var(--brand-primary-dark)] hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)] focus-visible:ring-offset-2"
          aria-label={`Download ${name} v${version}`}
        >
          <Download size={16} />
          Download
        </a>
      </div>
    </div>
  );
};

// Empty state component
const EmptyState: FC = () => (
  <div className="flex flex-col items-center justify-center rounded-[var(--radius-lg)] border border-dashed border-[var(--border)] bg-[var(--surface)] p-12 text-center">
    <div className="mb-4 text-6xl opacity-50">📚</div>
    <h3 className="mb-2 text-lg font-semibold text-[var(--foreground)]">
      No sources found
    </h3>
    <p className="text-sm text-[var(--foreground-muted)]">
      Try adjusting your filters or search query
    </p>
  </div>
);

type SortOption = "name" | "language";

const SourcesExplorer: FC<SourcesExplorerProps> = ({ sources }) => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [language, setLanguage] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("name");
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => setIsVisible(true), 50);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  const availableLanguages = useMemo(() => {
    const unique = new Set<string>();
    for (const source of sources) {
      if (source.lang) {
        unique.add(source.lang);
      }
    }
    return Array.from(unique).sort((langA, langB) =>
      langA.localeCompare(langB)
    );
  }, [sources]);

  const filteredAndSortedSources = useMemo(() => {
    const normalizedQuery = normalize(debouncedQuery);
    const normalizedLanguage = normalize(language);

    let filtered = sources.filter((source) => {
      const matchesLanguage =
        normalizedLanguage.length === 0
          ? true
          : normalize(source.lang) === normalizedLanguage;

      if (!matchesLanguage) {
        return false;
      }

      if (normalizedQuery.length === 0) {
        return true;
      }

      const haystack =
        `${source.name} ${source.id} ${source.lang}`.toLowerCase();

      return haystack.includes(normalizedQuery);
    });

    // Sort sources
    if (sortBy === "name") {
      filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "language") {
      filtered = [...filtered].sort((a, b) => {
        const langCompare = a.lang.localeCompare(b.lang);
        return langCompare !== 0 ? langCompare : a.name.localeCompare(b.name);
      });
    }

    return filtered;
  }, [sources, debouncedQuery, language, sortBy]);

  const handleClearFilters = () => {
    setQuery("");
    setDebouncedQuery("");
    setLanguage("");
    setSortBy("name");
  };

  const hasActiveFilters = query || language || sortBy !== "name";

  return (
    <div className="flex flex-col gap-6">
      {/* Sticky filter bar */}
      <div className="sticky top-0 z-10 -mx-4 bg-[var(--background)] px-4 py-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0">
        <div className="flex flex-col gap-3 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-4 shadow-[var(--shadow-sm)]">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            {/* Search input */}
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--foreground-subtle)]"
                size={18}
                aria-hidden="true"
              />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search sources by name or ID..."
                className="w-full rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface-muted)] py-2 pl-10 pr-3 min-h-[44px] text-sm text-[var(--foreground)] placeholder-[var(--foreground-subtle)] transition-all duration-[var(--transition-base)] focus:border-[var(--brand-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] focus:ring-opacity-20"
                aria-label="Search sources by name or ID"
              />
            </div>

            {/* Language filter */}
            <div className="relative w-full lg:w-48">
              <Languages
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--foreground-subtle)]"
                size={18}
                aria-hidden="true"
              />
              <select
                value={language}
                onChange={(event) => setLanguage(event.target.value)}
                className="w-full appearance-none rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface-muted)] py-2 pl-10 pr-8 min-h-[44px] text-sm text-[var(--foreground)] transition-all duration-[var(--transition-base)] focus:border-[var(--brand-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] focus:ring-opacity-20"
                aria-label="Filter sources by language"
              >
                <option value="">All languages</option>
                {availableLanguages.map((code) => (
                  <option key={code} value={code}>
                    {getLanguageFlag(code)} {code.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort dropdown */}
            <div className="relative w-full lg:w-48">
              <ArrowUpDown
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--foreground-subtle)]"
                size={18}
                aria-hidden="true"
              />
              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value as SortOption)}
                className="w-full appearance-none rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface-muted)] py-2 pl-10 pr-8 min-h-[44px] text-sm text-[var(--foreground)] transition-all duration-[var(--transition-base)] focus:border-[var(--brand-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] focus:ring-opacity-20"
                aria-label="Sort sources"
              >
                <option value="name">Sort by name</option>
                <option value="language">Sort by language</option>
              </select>
            </div>

            {/* Clear filters button */}
            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleClearFilters}
                className="flex items-center gap-2 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] px-4 py-2 min-h-[44px] text-sm font-medium text-[var(--foreground-muted)] transition-all duration-[var(--transition-base)] hover:border-[var(--border-strong)] hover:text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)] focus-visible:ring-offset-2 lg:w-auto"
                aria-label="Clear all filters"
              >
                <X size={16} aria-hidden="true" />
                <span>Clear</span>
              </button>
            )}
          </div>

          {/* Results count */}
          <div className="text-xs text-[var(--foreground-subtle)]">
            Showing {filteredAndSortedSources.length} of {sources.length} sources
          </div>
        </div>
      </div>

      {/* Sources grid */}
      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : filteredAndSortedSources.length === 0 ? (
        <EmptyState />
      ) : (
        <div
          className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-3 transition-opacity duration-[var(--transition-slow)] ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          {filteredAndSortedSources.map((source) => (
            <SourceCard key={source.id} source={source} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SourcesExplorer;
