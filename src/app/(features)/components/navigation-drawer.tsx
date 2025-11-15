"use client";

import { useState, useEffect, useRef } from "react";
import type { ReactElement } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
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

  // Handle escape key to close drawer
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };

    if (open) {
      document.addEventListener("keydown", handleEscape);
      // Focus first link when drawer opens
      const firstLink = drawerRef.current?.querySelector("a");
      firstLink?.focus();
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  // Handle click outside to close drawer
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

  return (
    <div className="md:hidden relative">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-label="Toggle navigation"
        onClick={() => setOpen((current) => !current)}
        className="inline-flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-sm border border-[color-mix(in_srgb,_var(--color-border)_70%,_transparent)] bg-[color-mix(in_srgb,_var(--color-surface)_70%,_transparent)] text-[var(--color-foreground)] hover:bg-[color-mix(in_srgb,_var(--color-surface)_60%,_transparent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)] focus-visible:ring-offset-2"
        style={{
          transition: "all var(--transition-base)"
        }}
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>
      <div
        ref={drawerRef}
        className={clsx(
          "absolute right-0 top-14 z-50 w-64 rounded-[var(--radius-lg)] border border-[color-mix(in_srgb,_var(--color-border)_75%,_transparent)] bg-[color-mix(in_srgb,_var(--color-surface)_96%,_transparent)] backdrop-blur-xl shadow-xl overflow-hidden",
          open
            ? "opacity-100 visible translate-y-0"
            : "pointer-events-none opacity-0 invisible -translate-y-2"
        )}
        style={{
          transition: "all var(--transition-slow)"
        }}
        role="menu"
        aria-label="Mobile navigation"
      >
        <ul className="flex flex-col py-2">
          {links.map(({ href, label }, index) => (
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
                className="block px-4 py-3 min-h-[44px] flex items-center text-sm text-[color-mix(in_srgb,_var(--color-foreground)_78%,_transparent)] hover:text-[var(--color-foreground)] hover:bg-gradient-to-r hover:from-[rgba(16,110,129,0.08)] hover:to-[rgba(129,140,248,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--brand-primary)]"
                style={{
                  transition: "all var(--transition-base)",
                  animationDelay: `${index * 30}ms`,
                  animation: open ? "slideIn var(--transition-base) ease-out forwards" : "none"
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
  );
}
