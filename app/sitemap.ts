import { MetadataRoute } from 'next';
import { backends, categories, educationalContent } from '@/lib/backends';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://comparegamebackends.com';

  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/backends`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/learn`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ];

  const backendPages = backends.map((backend) => ({
    url: `${baseUrl}/backends/${backend.slug}`,
    lastModified: new Date(backend.lastUpdated),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const learnPages = educationalContent.map((content) => ({
    url: `${baseUrl}/learn/${content.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const gameTypePages = categories.map((category) => ({
    url: `${baseUrl}/games/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...backendPages, ...learnPages, ...gameTypePages];
}
