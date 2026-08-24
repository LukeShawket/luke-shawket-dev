import { FrameItem } from "../ui/gallery-frame";

interface GitHubContentItem {
  name: string;
  path: string;
  type: string;
}

const GITHUB_USER = "LukeShawket";
const GITHUB_REPO = "images";
const BRANCH = "main";

function parseDateString(dateStr: string): string {
  if (dateStr.length !== 6) return dateStr;
  const month = parseInt(dateStr.substring(0, 2), 10) - 1;
  const day = parseInt(dateStr.substring(2, 4), 10);
  const year = 2000 + parseInt(dateStr.substring(4, 6), 10);

  const date = new Date(year, month, day);
  return isNaN(date.getTime())
    ? dateStr
    : date.toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      });
}

export async function fetchImagesFromFolder(
  folderName: string,
  defaultTag: string
): Promise<FrameItem[]> {
  try {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "LukeShawket-Website",
    };

    // Use token if available in .env.local to avoid rate limits
    if (process.env.GITHUB_TOKEN) {
      headers["Authorization"] = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const apiUrl = `https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPO}/contents/${folderName}?ref=${BRANCH}`;
    
    const res = await fetch(apiUrl, {
      next: { revalidate: 3600 },
      headers,
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error(
        `[GitHub API Error] Folder: "${folderName}" | Status: ${res.status} ${res.statusText}`
      );
      console.error(`[GitHub API Details]:`, errorText);
      return [];
    }

    const data: GitHubContentItem[] = await res.json();

    if (!Array.isArray(data)) {
      console.warn(`[GitHub API Warning] ${folderName} did not return an array. Data:`, data);
      return [];
    }

    const imageExtensions = [".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"];
    const imageFiles = data.filter(
      (file) =>
        file.type === "file" &&
        imageExtensions.some((ext) => file.name.toLowerCase().endsWith(ext))
    );

    console.log(`[Gallery Success] Folder "${folderName}": found ${imageFiles.length} images.`);

    return imageFiles.map((file) => {
      const fileNameWithoutExt = file.name.replace(/\.[^/.]+$/, "");
      const parts = fileNameWithoutExt.split("-");

      let formattedDate = "";
      let location = "";
      let rawDescription = fileNameWithoutExt;

      if (parts.length >= 3) {
        formattedDate = parseDateString(parts[0].trim());
        location = parts[1].trim().toUpperCase();
        rawDescription = parts.slice(2).join(" ").trim();
      } else if (parts.length === 2) {
        location = parts[0].trim().toUpperCase();
        rawDescription = parts[1].trim();
      }

      const title = rawDescription.replace(/\b\w/g, (c) => c.toUpperCase());

      // Safely encode paths containing spaces or special characters
      const encodedPath = file.path
        .split("/")
        .map((segment) => encodeURIComponent(segment))
        .join("/");

      const imageUrl = `https://raw.githubusercontent.com/${GITHUB_USER}/${GITHUB_REPO}/${BRANCH}/${encodedPath}`;

      const metaTag = location
        ? `${location}${formattedDate ? ` • ${formattedDate}` : ""}`
        : defaultTag;

      return {
        id: file.path,
        title,
        image: imageUrl,
        description: location
          ? `Captured in ${location}${formattedDate ? ` on ${formattedDate}` : ""}.`
          : title,
        tag: metaTag,
      };
    });
  } catch (error) {
    console.error(`[Fetch Exception] Failed to fetch folder "${folderName}":`, error);
    return [];
  }
}