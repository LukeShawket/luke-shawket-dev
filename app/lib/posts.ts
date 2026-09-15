import matter from "gray-matter";

export interface BlogPost {
  title: string;
  slug: string;
  date: string;
  category: string;
  snippet: string;
  tags: string[];
  published: boolean;
  featured: boolean;
  content?: string;
}

export async function getLatestPosts(limit: number = 10): Promise<BlogPost[]> {
  const posts = await getAllPosts();
  return posts.slice(0, limit);
}

/**
 * Converts strings or file names with spaces/uppercase into clean URL-safe slugs
 */
export function slugify(text: string): string {
  return decodeURIComponent(text)
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\.mdx?$/, "") // Remove file extension
    .replace(/\s+/g, "-") // Convert spaces to hyphens
    .replace(/[^\w\-]+/g, "") // Remove remaining non-word characters
    .replace(/\-\-+/g, "-"); // Collapse multiple hyphens
}

export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    const headers: HeadersInit = {
      Accept: "application/vnd.github.v3+json",
    };

    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const res = await fetch(
      "https://api.github.com/repos/LukeShawket/blogs/git/trees/main?recursive=1",
      {
        headers,
        cache: "no-store",
      }
    );

    if (!res.ok) return [];

    const data = await res.json();
    const tree: { path: string; type: string }[] = data.tree || [];

    const markdownFiles = tree.filter((file) => {
      const isFile = file.type === "blob";
      const isMarkdown = file.path.endsWith(".mdx") || file.path.endsWith(".md");
      const isReadme = file.path.toLowerCase().includes("readme");
      return isFile && isMarkdown && !isReadme;
    });

    const posts: (BlogPost | null)[] = await Promise.all(
      markdownFiles.map(async (file) => {
        const rawUrl = `https://raw.githubusercontent.com/LukeShawket/blogs/main/${file.path}`;
        const rawRes = await fetch(rawUrl, { cache: "no-store" });

        if (!rawRes.ok) return null;

        const rawContent = await rawRes.text();
        const { data: frontmatter, content } = matter(rawContent);

        const filename = file.path.split("/").pop() || file.path;
        const rawSlug = frontmatter.slug || filename;

        // Strip leading '#' from tags automatically
        const rawTags = Array.isArray(frontmatter.tags) ? frontmatter.tags : [];
        const cleanedTags = rawTags.map((tag: string) =>
          String(tag).replace(/^#/, "").trim()
        );

        return {
          title: frontmatter.title || "Untitled Post",
          slug: slugify(rawSlug), // Ensures every stored slug is normalized
          date: frontmatter.date ? String(frontmatter.date) : "Recent",
          category:
            frontmatter.category || cleanedTags[0] || "General",
          snippet: frontmatter.description || frontmatter.snippet || "",
          tags: cleanedTags,
          published: frontmatter.published !== false,
          featured: Boolean(frontmatter.featured),
          content: content || undefined,
        };
      })
    );

    return posts
      .filter((post): post is BlogPost => post !== null && post.published)
      .sort((a, b) => (Date.parse(b.date) || 0) - (Date.parse(a.date) || 0));
  } catch (error) {
    console.error("Error fetching posts from GitHub:", error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getAllPosts();
  const targetSlug = slugify(slug);
  return posts.find((p) => p.slug === targetSlug) || null;
}

/**
 * Fetches the specific '01-26' / 'about-my-website' post dynamically
 */
export async function getAboutWebsitePost(): Promise<BlogPost | null> {
  const posts = await getAllPosts();
  return (
    posts.find(
      (p) =>
        p.slug === "01-26" ||
        p.slug === "about-my-website" ||
        p.title.toLowerCase().includes("about my website")
    ) || null
  );
}