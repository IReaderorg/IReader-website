import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'IReader - Open Source Reader App for Android & Desktop',
    short_name: 'IReader',
    description: 'Free open-source reader app for novels, light novels, and web novels. No ads, offline reading, customizable themes.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#106e81',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    categories: ['books', 'education', 'productivity'],
    orientation: 'portrait',
    lang: 'en',
  }
}
