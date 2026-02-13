"use client";

import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "./theme-provider";
import { useState, useRef, useEffect } from "react";
import { clsx } from "clsx";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const options = [
    { value: "light", label: "Light", icon: Sun },
    { value: "dark", label: "Dark", icon: Moon },
    { value: "system", label: "System", icon: Monitor },
  ] as const;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-colors"
        aria-label="Toggle theme"
      >
        {resolvedTheme === "dark" ? (
          <Moon className="w-5 h-5" />
        ) : (
          <Sun className="w-5 h-5" />
        )}
      </button>

      <div
        className={clsx(
          "absolute right-0 top-full mt-2 w-36 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xl transition-all duration-200 z-50",
          isOpen ? "opacity-100 visible scale-100" : "opacity-0 invisible scale-95"
        )}
      >
        <ul className="flex flex-col py-1">
          {options.map(({ value, label, icon: Icon }) => (
            <li key={value}>
              <button
                onClick={() => {
                  setTheme(value);
                  setIsOpen(false);
                }}
                className={clsx(
                  "flex items-center gap-3 w-full px-3 py-2.5 text-sm transition-colors",
                  theme === value
                    ? "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20"
                    : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-50 dark:hover:bg-neutral-800"
                )}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
