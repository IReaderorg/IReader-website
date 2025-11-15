"use client";

import { useCallback, useEffect, useState } from "react";
import type { FC } from "react";
import { Check, Copy } from "lucide-react";

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
    <div className="flex flex-col gap-6 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-md)]">
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold text-[var(--foreground)]">
          Official Repository
        </h2>
        <p className="text-sm text-[var(--foreground-muted)]">
          Add the official IReader sources repository to access all available content sources.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 rounded-[var(--radius-md)] border border-[var(--border-strong)] bg-[var(--surface-muted)] p-3">
          <code className="flex-1 overflow-x-auto text-sm font-medium text-[var(--foreground)]">
            {repositoryUrl}
          </code>
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1.5 rounded-[var(--radius-sm)] bg-[var(--brand-primary)] px-3 py-1.5 min-h-[44px] text-xs font-medium text-white transition-all duration-[var(--transition-base)] hover:bg-[var(--brand-primary-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] focus:ring-offset-2"
            aria-label={copied ? "Repository URL copied to clipboard" : "Copy repository URL to clipboard"}
            aria-live="polite"
          >
            {copied ? (
              <>
                <Check size={14} aria-hidden="true" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy size={14} aria-hidden="true" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-semibold text-[var(--foreground)]">
          How to Add Repository
        </h3>
        <ol className="flex flex-col gap-2 pl-5 text-sm text-[var(--foreground-muted)]">
          <li className="list-decimal">Open the IReader app on your device</li>
          <li className="list-decimal">Navigate to <strong className="font-medium text-[var(--foreground)]">Browse → Sources</strong></li>
          <li className="list-decimal">Tap the <strong className="font-medium text-[var(--foreground)]">&quot;+&quot;</strong> button in the top right corner</li>
          <li className="list-decimal">Paste the repository URL from above</li>
          <li className="list-decimal">Tap <strong className="font-medium text-[var(--foreground)]">&quot;Add&quot;</strong> to complete the setup</li>
        </ol>
      </div>

      <div className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--background-soft)] p-3">
        <p className="text-xs text-[var(--foreground-muted)]">
          <strong className="font-medium text-[var(--foreground)]">Note:</strong> This is the only official repository maintained by IReader. Any other repositories are unofficial and have no affiliation with us.
        </p>
      </div>
    </div>
  );
};

export default RepositoryInstructions;
