export interface Project {
  title: string;
  slug: string;
  description: string;
  category: string;
  stars: number;
  forks: number;
  url: string;
  language: string;
  updatedAt: string;
  topics: string[];
}

// Repositories you want to exclude (use exact GitHub repo names or lowercase)
const IGNORED_REPOS = ["LukeShawket", "blogs", "images"];

/**
 * Fetches repositories from GitHub, sorted by most recently updated.
 * Uses pagination parameters to fetch in chunks (e.g., 10 per page).
 */
export async function getGitHubRepos(page: number = 1, perPage: number = 10): Promise<Project[]> {
  try {
    const headers: HeadersInit = {
      Accept: "application/vnd.github.v3+json",
    };

    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    // Fetches user repos sorted by last updated date, with per_page limit
    const res = await fetch(
      `https://api.github.com/users/LukeShawket/repos?sort=updated&direction=desc&per_page=${perPage}&page=${page}`,
      {
        headers,
        next: { revalidate: 3600 }, // Cache on Vercel for 1 hour
      }
    );

    if (!res.ok) {
      console.error(`GitHub Repos API Error: ${res.status} ${res.statusText}`);
      return [];
    }

    const repos = await res.json();

    // Filter out forks and any repositories defined in IGNORED_REPOS
    const publicProjects = repos.filter(
      (repo: any) =>
        !repo.fork &&
        !IGNORED_REPOS.includes(repo.name.toLowerCase())
    );

    return publicProjects.map((repo: any) => {
      // Formats repo names like "data-prep-toolkit" to "Data Prep Toolkit"
      const formattedTitle = repo.name
        .replace(/[-_]/g, " ")
        .replace(/\b\w/g, (char: string) => char.toUpperCase());

      // Use GitHub topics or primary language as the category
      const primaryCategory =
        repo.topics && repo.topics.length > 0
          ? repo.topics[0].toUpperCase()
          : repo.language || "Software Development";

      return {
        title: formattedTitle,
        slug: repo.name,
        description: repo.description || "No description provided.",
        category: primaryCategory,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        url: repo.html_url,
        language: repo.language || "Code",
        updatedAt: repo.updated_at,
        topics: repo.topics || [],
      };
    });
  } catch (error) {
    console.error("Error fetching projects from GitHub:", error);
    return [];
  }
}

/**
 * Utility to fetch the top N latest updated repositories (default: 10)
 */
export async function getLatestProjects(limit: number = 10): Promise<Project[]> {
  return getGitHubRepos(1, limit);
}