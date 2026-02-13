"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import type { ReactElement } from "react";

interface DocsSidebarProps {
  readonly sections: ReadonlyArray<{
    readonly title: string;
    readonly links: ReadonlyArray<{
      readonly href: string;
      readonly label: string;
    }>;
  }>;
}

export default function DocsSidebar({
  sections,
}: DocsSidebarProps): ReactElement {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-6">
      {sections.map(({ title, links }) => (
        <div key={title} className="flex flex-col gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--foreground-muted)]">
            {title}
          </span>
          <nav className="flex flex-col gap-1">
            {links.map(({ href, label }) => {
              const isActive = pathname === href;

              return (
                <Link
                  key={href}
                  href={href}
                  className={clsx(
                    "px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-secondary)] text-white shadow-md"
                      : "text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:bg-[var(--background-soft)]"
                  )}
                >
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>
      ))}
    </div>
  );
}
