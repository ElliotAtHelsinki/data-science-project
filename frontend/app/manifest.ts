import type { MetadataRoute } from 'next'

const manifest = (): MetadataRoute.Manifest => {
  return {
    name: 'HSL Bike Helper',
    short_name: 'HSL',
    description: 'An app that makes prediction based on Open Data from the Helsinki Bike System.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
export default manifest
