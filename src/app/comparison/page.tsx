import { Metadata } from 'next'
import PageChrome from "@/app/(features)/components/page-chrome"
import { Check, X, Star, Download, Github, Shield, Palette, Smartphone, Sparkles } from 'lucide-react'

export const metadata: Metadata = {
  title: 'IReader vs Other Reader Apps - Comparison Guide',
  description: 'Compare IReader with Moon+ Reader, ReadEra, FBReader, and other popular reader apps. See why IReader is the best open-source reader app for Android and Desktop.',
  keywords: [
    'reader app comparison',
    'best reader app',
    'ireader vs moon reader',
    'ireader vs readera',
    'open source reader app comparison',
    'android reader app comparison',
  ],
}

const features = [
  { name: 'Price', ireader: 'Free', lnreader: 'Free', moon: 'Free + Pro', readera: 'Free + Pro', fbreader: 'Free + Premium' },
  { name: 'Open Source', ireader: true, lnreader: true, moon: false, readera: false, fbreader: true },
  { name: 'No Ads', ireader: true, lnreader: true, moon: 'pro', readera: 'pro', fbreader: 'premium' },
  { name: 'Offline Reading', ireader: true, lnreader: true, moon: true, readera: true, fbreader: true },
  { name: 'Text-to-Speech', ireader: 'ai', lnreader: 'basic', moon: 'basic', readera: false, fbreader: 'basic' },
  { name: 'Multi-Source Support', ireader: true, lnreader: true, moon: false, readera: false, fbreader: false },
  { name: 'Desktop Version', ireader: true, lnreader: false, moon: false, readera: false, fbreader: true },
  { name: 'AI-Powered TTS', ireader: true, lnreader: false, moon: false, readera: false, fbreader: false },
  { name: 'Custom Themes', ireader: true, lnreader: true, moon: true, readera: true, fbreader: true },
  { name: 'Reading Statistics', ireader: true, lnreader: true, moon: true, readera: false, fbreader: false },
  { name: 'Customization', ireader: 5, lnreader: 4, moon: 4, readera: 3, fbreader: 3 },
  { name: 'Privacy', ireader: 5, lnreader: 5, moon: 3, readera: 3, fbreader: 4 },
]

const whyChooseFeatures = [
  {
    icon: Shield,
    title: '100% Free & Open Source',
    description: 'Unlike commercial reader apps, IReader is completely free with no ads, no tracking, and no premium features locked behind paywalls.',
    gradient: 'from-emerald-500 to-teal-500',
    bg: 'bg-emerald-50 dark:bg-emerald-950/30',
  },
  {
    icon: Shield,
    title: 'Privacy-Focused',
    description: 'Your reading data stays on your device. No data collection, no analytics, no cloud sync requirements.',
    gradient: 'from-blue-500 to-cyan-500',
    bg: 'bg-blue-50 dark:bg-blue-950/30',
  },
  {
    icon: Palette,
    title: 'Highly Customizable',
    description: 'Customize every aspect of your reading experience - themes, fonts, spacing, gestures, and more.',
    gradient: 'from-purple-500 to-pink-500',
    bg: 'bg-purple-50 dark:bg-purple-950/30',
  },
  {
    icon: Smartphone,
    title: 'Cross-Platform',
    description: 'Works on Android, Windows, macOS, and Linux. Sync your library across all devices.',
    gradient: 'from-orange-500 to-amber-500',
    bg: 'bg-orange-50 dark:bg-orange-950/30',
  },
]

const detailedComparisons = [
  {
    title: 'IReader vs LNReader',
    description: "LNReader is a popular open-source reader focused on light novels with multi-source support. While both apps share similar foundations, IReader offers additional features like AI-powered Text-to-Speech, desktop support, and more advanced customization options.",
    recommendation: 'Choose IReader if you want desktop support, AI-powered TTS, and more frequent updates with additional features.',
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    title: 'IReader vs Moon+ Reader',
    description: 'Moon+ Reader is a popular commercial reader app with a free version that includes ads. While it offers good customization, IReader provides similar features without ads and with complete source code transparency.',
    recommendation: 'Choose IReader if you want a completely free, ad-free experience with open-source transparency and cross-platform support.',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'IReader vs ReadEra',
    description: "ReadEra is known for its clean interface and support for multiple formats. However, it's closed-source and includes ads in the free version. IReader offers similar format support with additional features like Text-to-Speech and multi-source novel access.",
    recommendation: 'Choose IReader if you want more features, better privacy, and the ability to access novels from multiple online sources.',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    title: 'IReader vs FBReader',
    description: 'FBReader is another open-source reader app with a long history. While both are open-source, IReader offers a more modern interface, better customization options, and unique features like AI-powered Text-to-Speech and extension support for online novel sources.',
    recommendation: 'Choose IReader if you want a modern, actively developed open-source reader app with advanced features and cross-platform support.',
    gradient: 'from-orange-500 to-amber-500',
  },
]

const faqs = [
  {
    question: 'Which reader app is best for Android?',
    answer: "IReader is the best open-source reader app for Android, offering offline reading, customizable themes, no ads, and complete privacy. It's perfect for light novel and web novel enthusiasts.",
  },
  {
    question: 'Is IReader better than Moon+ Reader?',
    answer: 'IReader offers all the features of Moon+ Reader Pro but completely free, with no ads, better privacy, and open-source transparency. It also includes unique features like AI-powered TTS and multi-source support.',
  },
  {
    question: "What's the best free reader app without ads?",
    answer: 'IReader is the best free reader app with no ads. Unlike other "free" reader apps that show ads or require premium purchases, IReader is completely free forever with all features unlocked.',
  },
]

function renderValue(value: boolean | string | number | undefined) {
  if (value === true) {
    return <Check className="w-5 h-5 text-emerald-500 mx-auto" />
  }
  if (value === false) {
    return <X className="w-5 h-5 text-red-400 mx-auto" />
  }
  if (value === 'ai') {
    return <span className="inline-flex items-center gap-1 text-sm font-medium text-[var(--brand-primary)]"><Sparkles className="w-4 h-4" /> AI-powered</span>
  }
  if (value === 'basic') {
    return <span className="text-sm text-[var(--foreground-muted)]">Basic</span>
  }
  if (value === 'pro' || value === 'premium') {
    return <span className="text-sm text-[var(--foreground-muted)]">Paid only</span>
  }
  if (typeof value === 'number') {
    return (
      <div className="flex justify-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className={`w-4 h-4 ${i < value ? 'text-amber-400 fill-amber-400' : 'text-gray-300 dark:text-gray-600'}`} />
        ))}
      </div>
    )
  }
  return <span className="text-sm font-medium text-[var(--foreground)]">{value}</span>
}

export default function ComparisonPage() {
  return (
    <PageChrome>
      <div className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[var(--brand-primary)]/10 to-[var(--brand-secondary)]/10 border border-[var(--brand-primary)]/20 mb-6">
              <Sparkles className="w-4 h-4 text-[var(--brand-primary)]" />
              <span className="text-sm font-medium text-[var(--brand-primary)]">Complete Comparison Guide</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[var(--foreground)]">
              IReader vs Other Reader Apps
            </h1>
            <p className="text-lg text-[var(--foreground-muted)] max-w-2xl mx-auto">
              Choosing the right reader app can make a huge difference in your reading experience. 
              Here's how IReader compares to other popular reader apps for Android and Desktop.
            </p>
          </div>

          {/* Why Choose Section */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold mb-8 text-center text-[var(--foreground)]">Why Choose IReader?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {whyChooseFeatures.map((feature, index) => (
                <div
                  key={index}
                  className={`group p-6 rounded-2xl ${feature.bg} border border-[var(--border)] hover:shadow-lg transition-all duration-300`}
                >
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} text-white mb-4`}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-[var(--foreground)]">{feature.title}</h3>
                  <p className="text-[var(--foreground-muted)]">{feature.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Feature Comparison Table */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold mb-8 text-center text-[var(--foreground)]">Feature Comparison</h2>
            <div className="overflow-x-auto rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-lg">
              <table className="w-full">
                <thead>
                  <tr className="bg-[var(--background-soft)] border-b border-[var(--border)]">
                    <th className="p-4 text-left font-semibold text-[var(--foreground)]">Feature</th>
                    <th className="p-4 text-center">
                      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-secondary)] text-white text-sm font-semibold">
                        IReader
                      </span>
                    </th>
                    <th className="p-4 text-center">
                      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-sm font-semibold">
                        LNReader
                      </span>
                    </th>
                    <th className="p-4 text-center font-medium text-[var(--foreground-muted)]">Moon+ Reader</th>
                    <th className="p-4 text-center font-medium text-[var(--foreground-muted)]">ReadEra</th>
                    <th className="p-4 text-center font-medium text-[var(--foreground-muted)]">FBReader</th>
                  </tr>
                </thead>
                <tbody>
                  {features.map((feature, index) => (
                    <tr key={index} className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--background-soft)] transition-colors">
                      <td className="p-4 font-medium text-[var(--foreground)]">{feature.name}</td>
                      <td className="p-4 bg-gradient-to-b from-[var(--brand-primary)]/5 to-transparent">
                        {renderValue(feature.ireader)}
                      </td>
                      <td className="p-4 bg-gradient-to-b from-emerald-500/5 to-transparent">
                        {renderValue(feature.lnreader)}
                      </td>
                      <td className="p-4">{renderValue(feature.moon)}</td>
                      <td className="p-4">{renderValue(feature.readera)}</td>
                      <td className="p-4">{renderValue(feature.fbreader)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Detailed Comparisons */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold mb-8 text-center text-[var(--foreground)]">Detailed Comparisons</h2>
            <div className="space-y-6">
              {detailedComparisons.map((comparison, index) => (
                <div
                  key={index}
                  className="relative pl-6 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:rounded-full before:bg-gradient-to-b before:from-[var(--brand-primary)] before:to-[var(--brand-secondary)]"
                >
                  <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)] hover:shadow-lg transition-all duration-300">
                    <h3 className="text-2xl font-semibold mb-3 text-[var(--foreground)]">{comparison.title}</h3>
                    <p className="text-[var(--foreground-muted)] mb-4">{comparison.description}</p>
                    <p className="text-[var(--foreground)]">
                      <strong className="text-[var(--brand-primary)]">Recommendation:</strong> {comparison.recommendation}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Verdict CTA */}
          <section className="mb-20 relative overflow-hidden rounded-3xl bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-secondary)] p-8 md:p-12 text-white">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIwOS0xLjc5MS00LTQtNHMtNCAxLjc5MS00IDQgMS43OTEgNCA0IDQgNC0xLjc5MSA0LTR6bTAtMThjMC0yLjIwOS0xLjc5MS00LTQtNHMtNCAxLjc5MS00IDQgMS43OTEgNCA0IDQgNC0xLjc5MSA0LTR6bTE4IDBjMC0yLjIwOS0xLjc5MS00LTQtNHMtNCAxLjc5MS00IDQgMS43OTEgNCA0IDQgNC0xLjc5MSA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">The Verdict</h2>
              <p className="text-lg text-white/90 mb-8 max-w-2xl">
                If you're looking for the best reader app that's completely free, respects your privacy, 
                and offers extensive customization, IReader is the clear choice. It combines the best 
                features of commercial apps with the transparency and freedom of open-source software.
              </p>
              <div className="flex flex-wrap gap-4">
                <a 
                  href="https://github.com/IReaderorg/IReader/releases" 
                  className="inline-flex items-center gap-2 bg-white text-[var(--brand-primary)] px-6 py-3 rounded-xl font-semibold hover:bg-white/90 transition shadow-lg"
                >
                  <Download className="w-5 h-5" />
                  Download IReader
                </a>
                <a 
                  href="https://github.com/IReaderorg/IReader" 
                  className="inline-flex items-center gap-2 bg-white/20 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/30 transition border border-white/30"
                >
                  <Github className="w-5 h-5" />
                  View on GitHub
                </a>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section>
            <h2 className="text-3xl font-bold mb-8 text-center text-[var(--foreground)]">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)] hover:shadow-lg transition-all duration-300"
                >
                  <h3 className="text-xl font-semibold mb-2 text-[var(--foreground)]">{faq.question}</h3>
                  <p className="text-[var(--foreground-muted)]">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </PageChrome>
  )
}
