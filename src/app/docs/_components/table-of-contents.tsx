"use client";

import type { FC } from "react";
import { useEffect, useMemo, useState } from "react";
import { clsx } from "clsx";

import type { DocHeading } from "@/lib/docs/mdx";

interface TableOfContentsProps {
  readonly headings: ReadonlyArray<DocHeading>;
}

const SCROLL_OFFSET = 80;

const TableOfContents: FC<TableOfContentsProps> = ({ headings }) => {
  const [activeId, setActiveId] = useState<string | null>(null);

  const items = useMemo(
    () => headings.filter((heading) => heading.level > 1),
    [headings]
  );

  useEffect(() => {
    if (items.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: `-${SCROLL_OFFSET}px 0px -50% 0px`,
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    items.forEach((item) => {
      const element = document.getElementById(item.id);

      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [items]);

  if (items.length === 0) {
    return <div className="hidden xl:block" />;
  }

  return (
    <aside className="sticky top-28 hidden h-fit max-h-[80vh] overflow-y-auto border-l border-[var(--border-strong)] pl-6 xl:block">
      <span className="text-xs font-semibold uppercase tracking-wider text-[var(--foreground-muted)]">
        On this page
      </span>
      <nav className="mt-4 flex flex-col gap-2 text-sm text-[var(--foreground-muted)]">
        {items.map((heading) => (
          <a
            key={heading.id}
            href={`#${heading.id}`}
            className={clsx(
              "block border-l-2 border-transparent py-1 pl-3 transition-all duration-200",
              heading.level > 2 ? "ml-3" : "ml-0",
              activeId === heading.id
                ? "border-[var(--brand-primary)] font-semibold text-[var(--brand-primary)]"
                : "hover:text-[var(--foreground)] hover:border-[var(--border-strong)]"
            )}
          >
            {heading.title}
          </a>
        ))}
      </nav>
    </aside>
  );
};

export default TableOfContents;
