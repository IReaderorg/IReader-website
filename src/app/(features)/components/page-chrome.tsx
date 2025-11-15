"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import { useState } from "react";
import type { FocusEvent, MouseEvent } from "react";
import { ChevronDown } from "lucide-react";

import NavigationDrawer from "./navigation-drawer";

interface PageChromeProps {
  readonly children: React.ReactNode;
  readonly containerClassName?: string;
}

interface NavigationLink {
  readonly label: string;
  readonly href?: string;
  readonly children?: ReadonlyArray<{
    readonly href: string;
    readonly label: string;
  }>;
}

const navigationLinks: ReadonlyArray<NavigationLink> = [
  { href: "/", label: "Features" },
  { href: "/sources", label: "Sources" },
  { href: "/releases", label: "Releases" },
  { href: "/docs/getting-started", label: "Docs" },
  { href: "https://github.com/IReaderorg/IReader", label: "GitHub" },
];

const footerLinks: Array<{ readonly href: string; readonly label: string }> = [
  { href: "https://github.com/IReaderorg/IReader", label: "Contribute" },
  { href: "https://github.com/IReaderorg/IReader/releases", label: "Releases" },
  { href: "https://discord.gg/HBU6zD8c5v", label: "Discord" },
];

const stableNavLinks = navigationLinks.filter(
  (link): link is NavigationLink & { readonly href: string } =>
    typeof link.href === "string" && link.href.startsWith("/")
);

const toolsNavLink = navigationLinks.find(
  (
    link
  ): link is NavigationLink & {
    readonly children: NavigationLink["children"];
  } => Array.isArray(link.children) && link.children.length > 0
);

const externalNavLinks = navigationLinks.filter(
  (link): link is NavigationLink & { readonly href: string } =>
    typeof link.href === "string" && link.href.startsWith("http")
);

const currentYear = new Date().getFullYear();

export default function PageChrome({
  children,
  containerClassName,
}: PageChromeProps) {
  const pathname = usePathname();
  const [toolsOpen, setToolsOpen] = useState(false);

  const handleToolsBlur = (event: FocusEvent<HTMLDivElement>) => {
    const nextFocus = event.relatedTarget as Node | null;
    if (!event.currentTarget.contains(nextFocus)) {
      setToolsOpen(false);
    }
  };

  const handleToolsMouseLeave = (event: MouseEvent<HTMLDivElement>) => {
    const nextTarget = event.relatedTarget as Node | null;
    if (!event.currentTarget.contains(nextTarget)) {
      setToolsOpen(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="page-shell pt-9 pb-6 flex items-center justify-between gap-5">
        <Link href="/" className="group flex items-center gap-3">
          <Image 
            src="/icon-32x32.png" 
            alt="IReader Logo" 
            width={36} 
            height={36} 
            className="shrink-0 rounded-sm"
          />
          <div className="flex flex-col">
            <span className="text-base font-semibold tracking-tight">
              IReader
            </span>
            <span className="text-xs font-medium text-[color-mix(in_srgb,_var(--color-muted)_65%,_transparent)]">
              Open source novel reader for Android & Desktop
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
          {stableNavLinks.map(({ href, label }) => {
            const isActive =
              pathname === href || pathname.startsWith(`${href}/`);

            return (
              <Link
                key={href}
                href={href}
                className={clsx(
                  "relative px-3.5 py-2 rounded-md transition-all min-h-[44px] min-w-[44px] flex items-center justify-center",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)] focus-visible:ring-offset-2",
                  isActive
                    ? "bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-accent)] text-white shadow-md"
                    : "text-[color-mix(in_srgb,_var(--color-foreground)_68%,_transparent)] hover:text-[var(--color-foreground)]",
                  !isActive && "hover:bg-gradient-to-r hover:from-[rgba(16,110,129,0.08)] hover:to-[rgba(129,140,248,0.08)]"
                )}
                style={{
                  transition: "all var(--transition-base)"
                }}
              >
                {label}
              </Link>
            );
          })}
          {toolsNavLink ? (
            <div
              className="relative"
              onMouseEnter={() => setToolsOpen(true)}
              onMouseLeave={handleToolsMouseLeave}
              onBlur={handleToolsBlur}
            >
              <button
                type="button"
                onClick={() => setToolsOpen((current) => !current)}
                className={clsx(
                  "flex items-center gap-1 px-3.5 py-2 rounded-md min-h-[44px] min-w-[44px]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)] focus-visible:ring-offset-2",
                  toolsNavLink.children?.some(({ href }) =>
                    pathname.startsWith(`${href}`)
                  )
                    ? "bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-accent)] text-white shadow-md"
                    : "text-[color-mix(in_srgb,_var(--color-foreground)_68%,_transparent)] hover:text-[var(--color-foreground)] hover:bg-gradient-to-r hover:from-[rgba(16,110,129,0.08)] hover:to-[rgba(129,140,248,0.08)]"
                )}
                style={{
                  transition: "all var(--transition-base)"
                }}
                aria-haspopup="menu"
                aria-expanded={toolsOpen}
              >
                {toolsNavLink.label}
                <ChevronDown
                  size={16}
                  className={clsx(
                    "transition-transform"
                  )}
                  style={{
                    transform: toolsOpen ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform var(--transition-base)"
                  }}
                />
              </button>
              <div
                className="absolute left-0 right-0 top-full h-3"
                aria-hidden="true"
                onMouseEnter={() => setToolsOpen(true)}
              />
              <div
                className={clsx(
                  "absolute right-0 top-[calc(100%+0.375rem)] z-50 w-56 rounded-[var(--radius-lg)] border border-[color-mix(in_srgb,_var(--color-border)_70%,_transparent)] bg-[color-mix(in_srgb,_var(--color-surface)_96%,_transparent)] shadow-xl backdrop-blur-xl",
                  toolsOpen
                    ? "opacity-100 visible scale-100"
                    : "pointer-events-none opacity-0 invisible scale-95"
                )}
                style={{
                  transition: "all var(--transition-base)"
                }}
                role="menu"
                aria-label="Tools"
              >
                <ul className="flex flex-col py-2">
                  {toolsNavLink.children?.map(({ href, label }) => (
                    <li key={href}>
                      <Link
                        href={href}
                        onClick={() => setToolsOpen(false)}
                        onKeyDown={(e) => {
                          if (e.key === "Escape") {
                            setToolsOpen(false);
                            e.currentTarget.blur();
                          }
                        }}
                        className="block px-4 py-2.5 text-sm min-h-[44px] flex items-center text-[color-mix(in_srgb,_var(--color-foreground)_78%,_transparent)] hover:text-[var(--color-foreground)] hover:bg-gradient-to-r hover:from-[rgba(16,110,129,0.08)] hover:to-[rgba(129,140,248,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--brand-primary)]"
                        style={{
                          transition: "all var(--transition-base)"
                        }}
                        role="menuitem"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : null}
          {externalNavLinks.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-full min-h-[44px] min-w-[44px] flex items-center justify-center text-[color-mix(in_srgb,_var(--color-foreground)_70%,_transparent)] hover:text-[var(--color-foreground)] hover:bg-gradient-to-r hover:from-[rgba(16,110,129,0.08)] hover:to-[rgba(129,140,248,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)] focus-visible:ring-offset-2"
              style={{
                transition: "all var(--transition-base)"
              }}
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/docs/getting-started"
            className="md:hidden inline-flex items-center justify-center rounded-sm border border-[color-mix(in_srgb,_var(--color-border)_70%,_transparent)] bg-[color-mix(in_srgb,_var(--color-surface)_70%,_transparent)] px-4 py-2 min-h-[44px] text-sm font-semibold text-[var(--color-foreground)] hover:bg-[color-mix(in_srgb,_var(--color-surface)_60%,_transparent)] hover:text-[var(--color-foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)] focus-visible:ring-offset-2"
            style={{
              transition: "all var(--transition-base)"
            }}
          >
            Docs
          </Link>

          <Link
            href="https://github.com/IReaderorg/IReader/releases"
            className="hidden sm:inline-flex items-center gap-2 rounded-sm bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-accent)] px-4 py-2 min-h-[44px] text-xs font-semibold tracking-tight text-white shadow-md hover:shadow-lg hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)] focus-visible:ring-offset-2"
            style={{
              transition: "all var(--transition-base)"
            }}
          >
            Download
          </Link>

          <NavigationDrawer
            links={[
              ...stableNavLinks,
              ...(toolsNavLink?.children ?? []),
              ...externalNavLinks,
            ]
              .filter(
                (
                  link
                ): link is { readonly href: string; readonly label: string } =>
                  typeof link.href === "string"
              )
              .map(({ href, label }) => ({ href, label }))}
          />
        </div>
      </header>

      <main className="flex-1 pb-20">
        <div
          className={clsx(
            "page-shell",
            containerClassName ?? "flex flex-col gap-18 md:gap-20"
          )}
        >
          {children}
        </div>
      </main>

      <footer className="mt-auto border-t border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="page-shell py-7 flex flex-col gap-4 md:flex-row md:items-center md:justify-between text-xs text-[color-mix(in_srgb,_var(--color-muted)_65%,_transparent)]">
          <div className="flex flex-col gap-1">
            <span className="text-[color-mix(in_srgb,_var(--color-foreground)_75%,_transparent)]">
              IReader is built by the community.
            </span>
            <span>{currentYear} · Apache 2.0 Licensed</span>
          </div>
          <nav className="flex items-center gap-5 flex-wrap" aria-label="Footer navigation">
            {footerLinks.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={
                  href.startsWith("http") ? "noopener noreferrer" : undefined
                }
                className="rounded-sm px-1.5 py-0.5 min-h-[44px] flex items-center hover:text-[var(--color-foreground)] hover:bg-[var(--color-accent-soft)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)] focus-visible:ring-offset-2"
                aria-label={href.startsWith("http") ? `${label} (opens in new tab)` : label}
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      </footer>
    </div>
  );
}
