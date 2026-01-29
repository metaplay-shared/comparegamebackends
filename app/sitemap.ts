import { MetadataRoute } from 'next';
import { backends, categories } from '@/lib/backends';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://gamebackends.com';

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

  const categoryPages = categories.map((category) => ({
    url: `${baseUrl}/categories/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...backendPages, ...categoryPages];
}
