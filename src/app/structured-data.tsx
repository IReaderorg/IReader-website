export function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "@id": "https://ireaderorg.netlify.app/#software",
        "name": "IReader",
        "alternateName": "IReader - Open Source Reader App",
        "description": "Free open-source reader app for Android and Desktop. Read light novels, web novels, and ebooks offline with customizable themes, no ads, and complete privacy.",
        "applicationCategory": "BookApplication",
        "operatingSystem": ["Android 7.0+", "Windows", "macOS", "Linux"],
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock"
        },
        "downloadUrl": "https://github.com/IReaderorg/IReader/releases",
        "softwareVersion": "2.0.1",
        "releaseNotes": "https://github.com/IReaderorg/IReader/releases",
        "screenshot": "https://ireaderorg.netlify.app/screens/reader-screen.jpg",
        "featureList": [
          "Offline reading",
          "Customizable themes",
          "Text-to-Speech",
          "Multi-source support",
          "No ads",
          "Open source",
          "Cross-platform"
        ],
        "author": {
          "@type": "Organization",
          "@id": "https://ireaderorg.netlify.app/#organization",
          "name": "IReader Team",
          "url": "https://github.com/IReaderorg"
        },
        "publisher": {
          "@id": "https://ireaderorg.netlify.app/#organization"
        },
        "license": "https://www.apache.org/licenses/LICENSE-2.0",
        "inLanguage": "en",
        "keywords": "reader app, android reader app, open source reader app, novel reader app, light novel reader, web novel reader, ebook reader app, free reader app, offline reader app"
      },
      {
        "@type": "Organization",
        "@id": "https://ireaderorg.netlify.app/#organization",
        "name": "IReader",
        "url": "https://ireaderorg.netlify.app",
        "logo": {
          "@type": "ImageObject",
          "url": "https://ireaderorg.netlify.app/icon-512x512.png",
          "width": 512,
          "height": 512
        },
        "sameAs": [
          "https://github.com/IReaderorg/IReader"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://ireaderorg.netlify.app/#website",
        "url": "https://ireaderorg.netlify.app",
        "name": "IReader - Open Source Reader App",
        "description": "Download the best free reader app for Android and Desktop",
        "publisher": {
          "@id": "https://ireaderorg.netlify.app/#organization"
        },
        "inLanguage": "en",
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://github.com/IReaderorg/IReader/search?q={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "WebPage",
        "@id": "https://ireaderorg.netlify.app/#webpage",
        "url": "https://ireaderorg.netlify.app",
        "name": "IReader - Open Source Reader App for Android & Desktop | Free Novel Reader",
        "description": "Download IReader, the best free open-source reader app for Android and Desktop. Read light novels, web novels, and ebooks offline with customizable themes, no ads, and complete privacy.",
        "isPartOf": {
          "@id": "https://ireaderorg.netlify.app/#website"
        },
        "about": {
          "@id": "https://ireaderorg.netlify.app/#software"
        },
        "primaryImageOfPage": {
          "@type": "ImageObject",
          "url": "https://ireaderorg.netlify.app/icon-512x512.png"
        },
        "datePublished": "2024-01-01",
        "dateModified": new Date().toISOString().split('T')[0],
        "inLanguage": "en"
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Is IReader really free?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes! IReader is completely free and open source. No ads, no subscriptions, no hidden costs. You can download it from GitHub and use all features without any limitations."
            }
          },
          {
            "@type": "Question",
            "name": "What platforms does this reader app support?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "IReader is a cross-platform reader app that works on Android (7.0+), Windows, macOS, and Linux. Download the appropriate version for your device from our GitHub releases page."
            }
          },
          {
            "@type": "Question",
            "name": "Can I read novels offline with IReader?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes! IReader supports offline reading. Download chapters from your favorite novels and read them without an internet connection. Perfect for commuting or traveling."
            }
          },
          {
            "@type": "Question",
            "name": "How is IReader different from other reader apps?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "IReader is 100% free and open source with no ads or tracking. It offers extensive customization, supports multiple novel sources through extensions, includes AI-powered Text-to-Speech, and respects your privacy completely."
            }
          },
          {
            "@type": "Question",
            "name": "Where can I download IReader?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Download IReader from our GitHub releases page at https://github.com/IReaderorg/IReader/releases. Choose the version for your platform (Android APK, Windows MSI, Linux AppImage, or macOS)."
            }
          }
        ]
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
