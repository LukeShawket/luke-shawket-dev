import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://lukeshawket.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/$',         // Allows homepage
          '/blogs',     // Allows main blog listing page
          '/blogs/*',   // Allows all individual blog post articles
        ],
        disallow: [
          '/*',         // Blocks Google from crawling every other page
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}