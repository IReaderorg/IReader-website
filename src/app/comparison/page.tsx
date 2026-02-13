import { Metadata } from 'next'
import PageChrome from "@/app/(features)/components/page-chrome"

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

export default function ComparisonPage() {
  return (
    <PageChrome>
      <div className="py-20">
        <div className="page-shell max-w-4xl">
          <h1 className="text-4xl font-bold mb-6">
            IReader vs Other Reader Apps: Complete Comparison
          </h1>
          
          <p className="text-lg text-gray-600 mb-12">
            Choosing the right reader app can make a huge difference in your reading experience. 
            Here&apos;s how IReader compares to other popular reader apps for Android and Desktop.
          </p>

          <section className="mb-12">
            <h2 className="text-3xl font-semibold mb-6">Why Choose IReader?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-green-50 rounded-lg border border-green-200">
                <h3 className="text-xl font-semibold mb-3 text-green-900">✅ 100% Free & Open Source</h3>
                <p className="text-gray-700">
                  Unlike commercial reader apps, IReader is completely free with no ads, no tracking, 
                  and no premium features locked behind paywalls.
                </p>
              </div>
              
              <div className="p-6 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="text-xl font-semibold mb-3 text-blue-900">🔒 Privacy-Focused</h3>
                <p className="text-gray-700">
                  Your reading data stays on your device. No data collection, no analytics, 
                  no cloud sync requirements.
                </p>
              </div>
              
              <div className="p-6 bg-purple-50 rounded-lg border border-purple-200">
                <h3 className="text-xl font-semibold mb-3 text-purple-900">🎨 Highly Customizable</h3>
                <p className="text-gray-700">
                  Customize every aspect of your reading experience - themes, fonts, spacing, 
                  gestures, and more.
                </p>
              </div>
              
              <div className="p-6 bg-orange-50 rounded-lg border border-orange-200">
                <h3 className="text-xl font-semibold mb-3 text-orange-900">📱 Cross-Platform</h3>
                <p className="text-gray-700">
                  Works on Android, Windows, macOS, and Linux. Sync your library across all devices.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-semibold mb-6">Feature Comparison</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-3 text-left">Feature</th>
                    <th className="border p-3 text-center">IReader</th>
                    <th className="border p-3 text-center">Moon+ Reader</th>
                    <th className="border p-3 text-center">ReadEra</th>
                    <th className="border p-3 text-center">FBReader</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-3 font-semibold">Price</td>
                    <td className="border p-3 text-center bg-green-50">Free</td>
                    <td className="border p-3 text-center">Free + Pro</td>
                    <td className="border p-3 text-center">Free + Pro</td>
                    <td className="border p-3 text-center">Free + Premium</td>
                  </tr>
                  <tr>
                    <td className="border p-3 font-semibold">Open Source</td>
                    <td className="border p-3 text-center bg-green-50">✅ Yes</td>
                    <td className="border p-3 text-center">❌ No</td>
                    <td className="border p-3 text-center">❌ No</td>
                    <td className="border p-3 text-center">✅ Yes</td>
                  </tr>
                  <tr>
                    <td className="border p-3 font-semibold">No Ads</td>
                    <td className="border p-3 text-center bg-green-50">✅ Yes</td>
                    <td className="border p-3 text-center">⚠️ Pro only</td>
                    <td className="border p-3 text-center">⚠️ Pro only</td>
                    <td className="border p-3 text-center">⚠️ Premium only</td>
                  </tr>
                  <tr>
                    <td className="border p-3 font-semibold">Offline Reading</td>
                    <td className="border p-3 text-center bg-green-50">✅ Yes</td>
                    <td className="border p-3 text-center">✅ Yes</td>
                    <td className="border p-3 text-center">✅ Yes</td>
                    <td className="border p-3 text-center">✅ Yes</td>
                  </tr>
                  <tr>
                    <td className="border p-3 font-semibold">Text-to-Speech</td>
                    <td className="border p-3 text-center bg-green-50">✅ AI-powered</td>
                    <td className="border p-3 text-center">✅ Basic</td>
                    <td className="border p-3 text-center">❌ No</td>
                    <td className="border p-3 text-center">✅ Basic</td>
                  </tr>
                  <tr>
                    <td className="border p-3 font-semibold">Multi-Source Support</td>
                    <td className="border p-3 text-center bg-green-50">✅ Extensions</td>
                    <td className="border p-3 text-center">❌ No</td>
                    <td className="border p-3 text-center">❌ No</td>
                    <td className="border p-3 text-center">❌ No</td>
                  </tr>
                  <tr>
                    <td className="border p-3 font-semibold">Desktop Version</td>
                    <td className="border p-3 text-center bg-green-50">✅ Yes</td>
                    <td className="border p-3 text-center">❌ No</td>
                    <td className="border p-3 text-center">❌ No</td>
                    <td className="border p-3 text-center">✅ Yes</td>
                  </tr>
                  <tr>
                    <td className="border p-3 font-semibold">Customization</td>
                    <td className="border p-3 text-center bg-green-50">⭐⭐⭐⭐⭐</td>
                    <td className="border p-3 text-center">⭐⭐⭐⭐</td>
                    <td className="border p-3 text-center">⭐⭐⭐</td>
                    <td className="border p-3 text-center">⭐⭐⭐</td>
                  </tr>
                  <tr>
                    <td className="border p-3 font-semibold">Privacy</td>
                    <td className="border p-3 text-center bg-green-50">⭐⭐⭐⭐⭐</td>
                    <td className="border p-3 text-center">⭐⭐⭐</td>
                    <td className="border p-3 text-center">⭐⭐⭐</td>
                    <td className="border p-3 text-center">⭐⭐⭐⭐</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-semibold mb-6">Detailed Comparisons</h2>
            
            <div className="space-y-8">
              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="text-2xl font-semibold mb-3">IReader vs Moon+ Reader</h3>
                <p className="text-gray-700 mb-3">
                  Moon+ Reader is a popular commercial reader app with a free version that includes ads. 
                  While it offers good customization, IReader provides similar features without ads and 
                  with complete source code transparency.
                </p>
                <p className="text-gray-700">
                  <strong>Choose IReader if:</strong> You want a completely free, ad-free experience with 
                  open-source transparency and cross-platform support.
                </p>
              </div>

              <div className="border-l-4 border-green-500 pl-6">
                <h3 className="text-2xl font-semibold mb-3">IReader vs ReadEra</h3>
                <p className="text-gray-700 mb-3">
                  ReadEra is known for its clean interface and support for multiple formats. However, 
                  it&apos;s closed-source and includes ads in the free version. IReader offers similar format 
                  support with additional features like Text-to-Speech and multi-source novel access.
                </p>
                <p className="text-gray-700">
                  <strong>Choose IReader if:</strong> You want more features, better privacy, and the 
                  ability to access novels from multiple online sources.
                </p>
              </div>

              <div className="border-l-4 border-purple-500 pl-6">
                <h3 className="text-2xl font-semibold mb-3">IReader vs FBReader</h3>
                <p className="text-gray-700 mb-3">
                  FBReader is another open-source reader app with a long history. While both are open-source, 
                  IReader offers a more modern interface, better customization options, and unique features 
                  like AI-powered Text-to-Speech and extension support for online novel sources.
                </p>
                <p className="text-gray-700">
                  <strong>Choose IReader if:</strong> You want a modern, actively developed open-source 
                  reader app with advanced features and cross-platform support.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12 bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-lg">
            <h2 className="text-3xl font-semibold mb-4">The Verdict</h2>
            <p className="text-lg text-gray-700 mb-4">
              If you&apos;re looking for the best reader app that&apos;s completely free, respects your privacy, 
              and offers extensive customization, IReader is the clear choice. It combines the best 
              features of commercial apps with the transparency and freedom of open-source software.
            </p>
            <div className="flex gap-4 mt-6">
              <a 
                href="https://github.com/IReaderorg/IReader/releases" 
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Download IReader
              </a>
              <a 
                href="https://github.com/IReaderorg/IReader" 
                className="inline-block bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-900 transition"
              >
                View on GitHub
              </a>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-semibold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">Which reader app is best for Android?</h3>
                <p className="text-gray-700">
                  IReader is the best open-source reader app for Android, offering offline reading, 
                  customizable themes, no ads, and complete privacy. It&apos;s perfect for light novel and 
                  web novel enthusiasts.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-2">Is IReader better than Moon+ Reader?</h3>
                <p className="text-gray-700">
                  IReader offers all the features of Moon+ Reader Pro but completely free, with no ads, 
                  better privacy, and open-source transparency. It also includes unique features like 
                  AI-powered TTS and multi-source support.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-2">What&apos;s the best free reader app without ads?</h3>
                <p className="text-gray-700">
                  IReader is the best free reader app with no ads. Unlike other &quot;free&quot; reader apps that 
                  show ads or require premium purchases, IReader is completely free forever with all 
                  features unlocked.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </PageChrome>
  )
}
