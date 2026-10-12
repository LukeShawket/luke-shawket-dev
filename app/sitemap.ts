import type { MetadataRoute } from 'next';
import { getAllPosts } from '@/app/lib/posts';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://lukeshawket.com';

  // Fetch all published posts from your GitHub repo
  const posts = await getAllPosts();

  // Dynamically map every individual blog post URL
  const blogUrls: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blogs/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  // ONLY allow main landing page and blogs directory
  const allowedStaticUrls: MetadataRoute.Sitemap = [
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
  ];

  return [...allowedStaticUrls, ...blogUrls];
}