"use client";

import { useCallback, useEffect, useState } from "react";
import type { FC } from "react";
import { Check, Copy, ExternalLink, Github } from "lucide-react";

interface RepositoryInstructionsProps {
  readonly repositoryUrl: string;
}

const RepositoryInstructions: FC<RepositoryInstructionsProps> = ({
  repositoryUrl,
}) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setCopied(false);
    }, 2000);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [copied]);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(repositoryUrl);
      setCopied(true);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  }, [repositoryUrl]);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-lg">
      {/* Gradient accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-secondary)]" />
      
      <div className="p-6 md:p-8">
        <div className="flex flex-col gap-6">
          <div className="flex items-start gap-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-secondary)] text-white shrink-0">
              <Github className="w-6 h-6" />
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-bold text-[var(--foreground)]">
                Official Repository
              </h2>
              <p className="text-[var(--foreground-muted)]">
                Add the official IReader sources repository to access all available content sources.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--background-soft)] p-4">
              <code className="flex-1 overflow-x-auto text-sm font-mono text-[var(--foreground)]">
                {repositoryUrl}
              </code>
              <button
                type="button"
                onClick={handleCopy}
                className={`flex items-center gap-2 rounded-lg px-4 py-2.5 min-h-[44px] text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  copied
                    ? "bg-emerald-500 text-white focus:ring-emerald-500"
                    : "bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-secondary)] text-white hover:opacity-90 focus:ring-[var(--brand-primary)]"
                }`}
                aria-label={copied ? "Repository URL copied to clipboard" : "Copy repository URL to clipboard"}
                aria-live="polite"
              >
                {copied ? (
                  <>
                    <Check size={16} aria-hidden="true" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={16} aria-hidden="true" />
                    <span>Copy URL</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold text-[var(--foreground)]">
              How to Add Repository
            </h3>
            <div className="grid gap-3">
              {[
                { step: 1, text: "Open the IReader app on your device" },
                { step: 2, text: "Navigate to Browse → Sources" },
                { step: 3, text: 'Tap the "+" button in the top right corner' },
                { step: 4, text: "Paste the repository URL from above" },
                { step: 5, text: 'Tap "Add" to complete the setup' },
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-secondary)] text-white text-sm font-bold shrink-0">
                    {item.step}
                  </div>
                  <p className="text-[var(--foreground-muted)] pt-1">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20 p-4">
            <p className="text-sm text-amber-800 dark:text-amber-200">
              <strong className="font-semibold">Note:</strong> This is the only official repository maintained by IReader. Any other repositories are unofficial and have no affiliation with us.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepositoryInstructions;
