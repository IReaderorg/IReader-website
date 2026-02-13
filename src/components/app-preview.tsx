"use client";

import { useState, useEffect } from "react";
import { clsx } from "clsx";
import { 
  BookOpen, 
  Settings, 
  Search, 
  Library, 
  Bookmark, 
  Sun, 
  Moon,
  Volume2,
  List,
  ChevronLeft,
  ChevronRight,
  Home,
  Grid,
  User
} from "lucide-react";

interface AppPreviewProps {
  className?: string;
}

type Screen = "library" | "reader" | "settings" | "browse";

const mockBooks = [
  { id: 1, title: "The Beginning After The End", author: "TurtleMe", cover: "📚", progress: 67, color: "from-purple-500 to-blue-500" },
  { id: 2, title: "Solo Leveling", author: "Chugong", cover: "⚔️", progress: 45, color: "from-red-500 to-orange-500" },
  { id: 3, title: "Omniscient Reader", author: "Sing Shong", cover: "📖", progress: 89, color: "from-emerald-500 to-teal-500" },
  { id: 4, title: "Shadow Slave", author: "Guiltythree", cover: "🌑", progress: 23, color: "from-gray-600 to-gray-800" },
];

const mockChapter = {
  title: "Chapter 142: The Final Stand",
  content: `The battlefield stretched endlessly before him, a vast expanse of broken earth and scattered debris. Arthur stood at the precipice, his eyes scanning the horizon where dark clouds gathered like an approaching storm.

"You've come far," the voice echoed across the emptiness, resonating with ancient power. "But this is where your journey ends."

Arthur smiled, his hand tightening around the hilt of his sword. The weapon pulsed with ethereal light, responding to his determination.

"I've heard those words before," he replied, his voice steady despite the overwhelming pressure. "Yet here I stand, stronger than ever."

The air crackled with energy as two forces prepared to clash. This would be the battle that decided the fate of everything...`,
};

export function AppPreview({ className }: AppPreviewProps) {
  const [currentScreen, setCurrentScreen] = useState<Screen>("library");
  const [readerTheme, setReaderTheme] = useState<"light" | "dark" | "sepia">("dark");
  const [fontSize, setFontSize] = useState(16);
  const [selectedBook, setSelectedBook] = useState(mockBooks[0]);
  const [currentPage, setCurrentPage] = useState(1);

  // Auto-rotate screens for demo
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentScreen((prev) => {
        if (prev === "library") return "reader";
        if (prev === "reader") return "browse";
        if (prev === "browse") return "settings";
        return "library";
      });
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const readerBgColors = {
    light: "bg-white text-gray-900",
    dark: "bg-gray-900 text-gray-100",
    sepia: "bg-amber-50 text-amber-900",
  };

  return (
    <div className={clsx("relative", className)}>
      {/* Phone Frame */}
      <div className="relative mx-auto w-[280px] md:w-[320px]">
        {/* Phone Outer Frame */}
        <div className="relative rounded-[3rem] bg-gradient-to-br from-gray-800 to-gray-900 p-2 shadow-2xl">
          {/* Phone Inner Frame */}
          <div className="relative rounded-[2.5rem] bg-black overflow-hidden">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-b-2xl z-20" />
            
            {/* Screen Content */}
            <div className="relative h-[560px] md:h-[640px] overflow-hidden">
              {/* Status Bar */}
              <div className="absolute top-0 left-0 right-0 h-8 bg-black/50 backdrop-blur-sm z-10 flex items-center justify-between px-6 pt-1">
                <span className="text-white text-xs font-medium">9:41</span>
                <div className="flex items-center gap-1">
                  <div className="w-4 h-2 bg-white rounded-sm" />
                  <div className="w-4 h-2 bg-white rounded-sm" />
                  <div className="w-6 h-3 bg-white rounded-sm" />
                </div>
              </div>

              {/* Library Screen */}
              {currentScreen === "library" && (
                <div className="h-full bg-gradient-to-b from-[var(--brand-primary)] to-[var(--brand-secondary)] pt-10">
                  {/* Header */}
                  <div className="px-4 py-3">
                    <h2 className="text-white text-lg font-bold">My Library</h2>
                    <p className="text-white/70 text-xs">4 books in your collection</p>
                  </div>

                  {/* Search Bar */}
                  <div className="px-4 mb-4">
                    <div className="flex items-center gap-2 bg-white/20 rounded-xl px-3 py-2">
                      <Search className="w-4 h-4 text-white/70" />
                      <span className="text-white/50 text-sm">Search library...</span>
                    </div>
                  </div>

                  {/* Books Grid */}
                  <div className="flex-1 bg-white dark:bg-gray-900 rounded-t-3xl p-4">
                    <div className="grid grid-cols-2 gap-3">
                      {mockBooks.map((book) => (
                        <button
                          key={book.id}
                          onClick={() => {
                            setSelectedBook(book);
                            setCurrentScreen("reader");
                          }}
                          className="text-left group"
                        >
                          <div className={clsx(
                            "aspect-[3/4] rounded-xl bg-gradient-to-br flex items-center justify-center text-3xl mb-2 group-hover:scale-105 transition-transform shadow-lg",
                            book.color
                          )}>
                            {book.cover}
                          </div>
                          <h3 className="text-xs font-semibold text-gray-900 dark:text-white truncate">
                            {book.title}
                          </h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                            {book.author}
                          </p>
                          {/* Progress Bar */}
                          <div className="mt-1 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-secondary)]"
                              style={{ width: `${book.progress}%` }}
                            />
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Reader Screen */}
              {currentScreen === "reader" && (
                <div className={clsx("h-full pt-8 flex flex-col", readerBgColors[readerTheme])}>
                  {/* Reader Header */}
                  <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                    <button onClick={() => setCurrentScreen("library")} className="p-1">
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <div className="text-center">
                      <p className="text-xs font-medium truncate max-w-[140px]">{selectedBook.title}</p>
                      <p className="text-xs opacity-60">{mockChapter.title}</p>
                    </div>
                    <button className="p-1">
                      <List className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Reader Content */}
                  <div className="flex-1 overflow-auto p-4" style={{ fontSize: `${fontSize}px` }}>
                    <p className="leading-relaxed text-justify">{mockChapter.content}</p>
                  </div>

                  {/* Reader Footer */}
                  <div className="border-t border-gray-200 dark:border-gray-700 p-3">
                    {/* Progress */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs opacity-60">Page {currentPage}</span>
                      <div className="flex-1 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-secondary)]"
                          style={{ width: `${(currentPage / 10) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs opacity-60">10</span>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center justify-around">
                      <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                        <ChevronLeft className="w-5 h-5" onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                        <Volume2 className="w-5 h-5" />
                      </button>
                      <button 
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                        onClick={() => setReaderTheme(readerTheme === "dark" ? "light" : readerTheme === "light" ? "sepia" : "dark")}
                      >
                        {readerTheme === "dark" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                      </button>
                      <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                        <Bookmark className="w-5 h-5" />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                        <ChevronRight className="w-5 h-5" onClick={() => setCurrentPage(Math.min(10, currentPage + 1))} />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Browse Screen */}
              {currentScreen === "browse" && (
                <div className="h-full bg-white dark:bg-gray-900 pt-10">
                  {/* Header */}
                  <div className="px-4 py-3">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">Browse Sources</h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Discover new novels</p>
                  </div>

                  {/* Search */}
                  <div className="px-4 mb-4">
                    <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-xl px-3 py-2">
                      <Search className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-400 text-sm">Search sources...</span>
                    </div>
                  </div>

                  {/* Sources List */}
                  <div className="px-4 space-y-3">
                    {[
                      { name: "NovelUpdates", icon: "📖", count: "50K+ novels" },
                      { name: "Royal Road", icon: "👑", count: "40K+ novels" },
                      { name: "Scribble Hub", icon: "✍️", count: "30K+ novels" },
                      { name: "Webnovel", icon: "🌐", count: "100K+ novels" },
                    ].map((source, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                        <span className="text-2xl">{source.icon}</span>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{source.name}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{source.count}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Settings Screen */}
              {currentScreen === "settings" && (
                <div className="h-full bg-white dark:bg-gray-900 pt-10">
                  {/* Header */}
                  <div className="px-4 py-3">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">Settings</h2>
                  </div>

                  {/* Settings List */}
                  <div className="px-4 space-y-2">
                    {[
                      { icon: User, label: "Account", desc: "Sync your data" },
                      { icon: BookOpen, label: "Reader", desc: "Font, theme, layout" },
                      { icon: Library, label: "Library", desc: "Categories, updates" },
                      { icon: Volume2, label: "Text-to-Speech", desc: "Voice, speed" },
                      { icon: Moon, label: "Appearance", desc: "Dark mode, colors" },
                      { icon: Grid, label: "Backup", desc: "Export, import" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                        <item.icon className="w-5 h-5 text-[var(--brand-primary)]" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{item.label}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{item.desc}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Bottom Navigation */}
              <div className="absolute bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 px-4 py-2 flex justify-around">
                {[
                  { icon: Library, label: "Library", screen: "library" as Screen },
                  { icon: Search, label: "Browse", screen: "browse" as Screen },
                  { icon: Settings, label: "Settings", screen: "settings" as Screen },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => setCurrentScreen(item.screen)}
                    className={clsx(
                      "flex flex-col items-center gap-1 p-2 rounded-xl transition-colors",
                      currentScreen === item.screen
                        ? "text-[var(--brand-primary)]"
                        : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="text-xs">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Home Indicator */}
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/30 rounded-full" />
          </div>
        </div>

        {/* Reflection Effect */}
        <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
      </div>

      {/* Screen Labels */}
      <div className="flex justify-center gap-2 mt-6">
        {["library", "reader", "browse", "settings"].map((screen) => (
          <button
            key={screen}
            onClick={() => setCurrentScreen(screen as Screen)}
            className={clsx(
              "px-3 py-1.5 rounded-full text-xs font-medium transition-all",
              currentScreen === screen
                ? "bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-secondary)] text-white"
                : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
            )}
          >
            {screen.charAt(0).toUpperCase() + screen.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}

export default AppPreview;
