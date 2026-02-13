"use client";

import { useState, useEffect, useRef } from "react";
import type { ReactElement } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ExternalLink, Download, ArrowRight } from "lucide-react";
import { clsx } from "clsx";

interface NavigationDrawerProps {
  readonly links: Array<{ readonly href: string; readonly label: string }>;
}

export default function NavigationDrawer({
  links,
}: NavigationDrawerProps): ReactElement {
  const [open, setOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };

    if (open) {
      document.addEventListener("keydown", handleEscape);
      const firstLink = drawerRef.current?.querySelector("a");
      firstLink?.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        open &&
        drawerRef.current &&
        !drawerRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div className="md:hidden relative">
      {/* Menu Button */}
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-label="Toggle navigation"
        onClick={() => setOpen((current) => !current)}
        className="relative inline-flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white hover:bg-neutral-50 dark:hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 transition-all duration-200"
      >
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        <div className="relative w-5 h-5">
          <Menu 
            size={20} 
            className={clsx(
              "absolute inset-0 transition-all duration-200",
              open ? "opacity-0 rotate-90 scale-75" : "opacity-100 rotate-0 scale-100"
            )}
          />
          <X 
            size={20} 
            className={clsx(
              "absolute inset-0 transition-all duration-200",
              open ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-75"
            )}
          />
        </div>
      </button>

      {/* Backdrop */}
      <div
        className={clsx(
          "fixed inset-0 z-40 bg-black/10 backdrop-blur-sm transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div
        ref={drawerRef}
        className={clsx(
          "fixed top-0 right-0 bottom-0 z-50 w-80 max-w-[85vw] bg-white dark:bg-neutral-900 border-l border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-y-auto transition-transform duration-300 ease-out",
          open ? "translate-x-0" : "translate-x-full"
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        {/* Drawer Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
          <span className="text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
            IReader
          </span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="p-4">
          <ul className="flex flex-col gap-1">
            {links.map(({ href, label }) => {
              const isExternal = href.startsWith("http");
              const isActive = pathname === href || pathname.startsWith(`${href}/`);
              
              return (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setOpen(false)}
                    onKeyDown={(e) => {
                      if (e.key === "Escape") {
                        setOpen(false);
                        buttonRef.current?.focus();
                      }
                    }}
                    className={clsx(
                      "group flex items-center justify-between gap-3 px-4 py-3.5 rounded-xl min-h-[48px] text-base font-medium transition-all duration-200",
                      isActive
                        ? "bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-lg shadow-purple-500/25"
                        : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    )}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                  >
                    <span>{label}</span>
                    {isExternal && (
                      <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Drawer Footer */}
        <div className="sticky bottom-0 p-4 border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
          <Link
            href="https://github.com/IReaderorg/IReader/releases"
            className="group flex items-center justify-center gap-2 w-full rounded-xl bg-gradient-to-r from-purple-600 to-blue-500 px-6 py-3.5 min-h-[52px] text-base font-semibold text-white shadow-lg shadow-purple-500/25 transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
          >
            <Download className="w-5 h-5" />
            Download IReader
            <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
          </Link>
        </div>
      </div>
    </div>
  );
}
