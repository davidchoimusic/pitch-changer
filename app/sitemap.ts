import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://pitchchanger.io'
  const currentDate = new Date().toISOString()

  return [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    // Tool Landing Pages (High Priority)
    {
      url: `${baseUrl}/audio-speed-changer`,
      lastModified: '2025-11-25',
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/mp3-pitch-changer`,
      lastModified: '2025-11-25',
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/slow-down-audio`,
      lastModified: '2025-11-25',
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/speed-up-audio`,
      lastModified: '2025-11-25',
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    // Resource Pages (Medium Priority)
    {
      url: `${baseUrl}/how-to-change-the-key-of-a-song`,
      lastModified: '2025-11-25',
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/how-to-slow-down-audio`,
      lastModified: '2025-11-25',
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/how-to-speed-up-audio`,
      lastModified: '2025-11-25',
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/change-pitch-vs-change-speed`,
      lastModified: '2025-11-25',
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // Resources Hub
    {
      url: `${baseUrl}/resources`,
      lastModified: '2025-11-25',
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    // Legal Pages
    {
      url: `${baseUrl}/privacy`,
      lastModified: '2025-11-24',
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: '2025-11-24',
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: '2025-11-24',
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: '2025-11-24',
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ]
}
