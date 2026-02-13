"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import { useState, useEffect } from "react";
import type { FocusEvent, MouseEvent } from "react";
import { ChevronDown, Download, Github, ExternalLink } from "lucide-react";

import NavigationDrawer from "./navigation-drawer";
import { ThemeToggle } from "@/components/theme-toggle";

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
  { href: "/docs/getting-started", label: "Getting Started" },
  { href: "/docs/faq", label: "FAQ" },
  { href: "/comparison", label: "Compare" },
  { href: "https://github.com/IReaderorg/IReader", label: "GitHub" },
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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      {/* Header */}
      <header
        className={clsx(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-[var(--surface-glass)] backdrop-blur-xl border-b border-[var(--border)] shadow-sm"
            : "bg-transparent"
        )}
      >
        <div className="page-shell">
          <div className="flex items-center justify-between gap-5 py-4">
            {/* Logo */}
            <Link href="/" className="group flex items-center gap-3 hover:opacity-90 transition-opacity">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl blur opacity-40 group-hover:opacity-60 transition-opacity" />
                <Image 
                  src="/icon-32x32.png" 
                  alt="IReader Logo" 
                  width={40} 
                  height={40} 
                  className="relative shrink-0 rounded-xl"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                  IReader
                </span>
                <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400 hidden sm:block">
                  Open source reader
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
              {stableNavLinks.map(({ href, label }) => {
                const isActive = pathname === href || pathname.startsWith(`${href}/`);

                return (
                  <Link
                    key={href}
                    href={href}
                    className={clsx(
                      "relative px-4 py-2.5 rounded-xl transition-all min-h-[44px] flex items-center justify-center",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2",
                      isActive
                        ? "bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-lg shadow-purple-500/25"
                        : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    )}
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
                      "flex items-center gap-1.5 px-4 py-2.5 rounded-xl min-h-[44px]",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2",
                      toolsNavLink.children?.some(({ href }) =>
                        pathname.startsWith(`${href}`)
                      )
                        ? "bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-lg shadow-purple-500/25"
                        : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    )}
                    aria-haspopup="menu"
                    aria-expanded={toolsOpen}
                  >
                    {toolsNavLink.label}
                    <ChevronDown
                      size={16}
                      className={clsx("transition-transform duration-200")}
                      style={{ transform: toolsOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                    />
                  </button>
                  <div className="absolute left-0 right-0 top-full h-3" aria-hidden="true" onMouseEnter={() => setToolsOpen(true)} />
                  <div
                    className={clsx(
                      "absolute right-0 top-[calc(100%+0.5rem)] z-50 w-56 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-xl shadow-xl",
                      toolsOpen ? "opacity-100 visible scale-100" : "pointer-events-none opacity-0 invisible scale-95"
                    )}
                    style={{ transition: "all 200ms cubic-bezier(0.4, 0, 0.2, 1)" }}
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
                            className="flex items-center px-4 py-3 text-sm min-h-[44px] text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-purple-500"
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
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl min-h-[44px] text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2"
                >
                  {label}
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <Link
                href="https://github.com/IReaderorg/IReader/releases"
                className="hidden sm:inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-500 px-5 py-2.5 min-h-[44px] text-sm font-semibold text-white shadow-lg shadow-purple-500/25 transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
              >
                <Download className="w-4 h-4" />
                Download
              </Link>

              <Link
                href="/docs/getting-started"
                className="md:hidden inline-flex items-center justify-center rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-4 py-2.5 min-h-[44px] text-sm font-semibold text-neutral-900 dark:text-white hover:bg-neutral-50 dark:hover:bg-neutral-800"
              >
                Docs
              </Link>

              <NavigationDrawer
                links={[
                  ...stableNavLinks,
                  ...(toolsNavLink?.children ?? []),
                  ...externalNavLinks,
                ]
                  .filter(
                    (link): link is { readonly href: string; readonly label: string } =>
                      typeof link.href === "string"
                  )
                  .map(({ href, label }) => ({ href, label }))}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-20">
        <div className={clsx("page-shell", containerClassName ?? "flex flex-col gap-18 md:gap-20")}>
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto relative overflow-hidden border-t border-[var(--border)] bg-[var(--background)]">
        <div className="page-shell">
          <div className="py-12 md:py-16 flex flex-col gap-8">
            
            {/* Top Section */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
              {/* Brand */}
              <div className="flex flex-col gap-4 max-w-sm">
                <Link href="/" className="flex items-center gap-3 w-fit">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg blur opacity-40" />
                    <Image src="/icon-32x32.png" alt="IReader Logo" width={32} height={32} className="relative shrink-0 rounded-lg" />
                  </div>
                  <span className="text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                    IReader
                  </span>
                </Link>
                <p className="text-sm text-[var(--foreground-muted)] leading-relaxed">
                  Open source reader app for Android and Desktop. Read light novels, web novels, and ebooks with complete privacy.
                </p>
                <div className="flex items-center gap-3">
                  <a
                    href="https://github.com/IReaderorg/IReader"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-9 h-9 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-colors"
                    aria-label="GitHub"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a
                    href="https://discord.gg/HBU6zD8c5v"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-9 h-9 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-colors"
                    aria-label="Discord"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                    </svg>
                  </a>
                </div>
              </div>

              {/* Links */}
              <nav className="flex flex-wrap gap-x-8 gap-y-4" aria-label="Footer navigation">
                {footerLinks.map(({ href, label }) => (
                  <a
                    key={href}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                  >
                    {label}
                  </a>
                ))}
              </nav>
            </div>

            {/* Bottom Section */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-neutral-200 dark:border-neutral-800">
              <div className="text-sm text-neutral-500 dark:text-neutral-400">
                © {currentYear} IReader. Apache 2.0 Licensed.
              </div>
              <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
                <span>Made with</span>
                <span className="text-purple-500">purple</span>
                <span>&</span>
                <span className="text-blue-500">blue</span>
                <span>by the community</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
