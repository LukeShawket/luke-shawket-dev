// app/sitemap.ts
import type { MetadataRoute } from 'next';
import { getAllPosts } from '@/app/lib/posts';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://lukeshawket.com';
  const posts = await getAllPosts();

  const blogUrls: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blogs/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : new Date(),
    changeFrequency: 'monthly',
    priority: 0.7, // Slightly lower than top-level pages
  }));

  const mainPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
  ];

  return [...mainPages, ...blogUrls];
}