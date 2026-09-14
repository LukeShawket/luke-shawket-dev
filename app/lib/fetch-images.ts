import { FrameItem } from "../ui/gallery-frame";

export interface ImageMetadata {
  category: "photos" | "drawings" | "gadgets" | "games";
  fileName: string;
  title: string;
  date?: string;
  description?: string;
  tag?: string;
}

export interface InternalFrameItem extends FrameItem {
  timestamp: number;
}

const GITHUB_USER = "LukeShawket";
const GITHUB_REPO = "images";
const BRANCH = "main";

/**
 * Formats standard ISO dates ("YYYY-MM-DD") to readable strings ("MMM DD, YYYY")
 */
function formatDate(dateStr?: string): string {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return isNaN(date.getTime())
    ? dateStr
    : date.toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      });
}

/**
 * Parses date string into Unix timestamp (defaults to 0 if missing/invalid)
 */
function parseTimestamp(dateStr?: string): number {
  if (!dateStr) return 0;
  const time = new Date(dateStr).getTime();
  return isNaN(time) ? 0 : time;
}

/**
 * Fetches the root metadata.json file directly from GitHub without Next.js caching delays.
 */
export async function fetchAllGalleryCategories(): Promise<{
  photos: FrameItem[];
  drawings: FrameItem[];
  gadgets: FrameItem[];
  games: FrameItem[];
}> {
  const emptyResult = { photos: [], drawings: [], gadgets: [], games: [] };

  try {
    const rawJsonUrl = `https://raw.githubusercontent.com/${GITHUB_USER}/${GITHUB_REPO}/${BRANCH}/metadata.json?t=${Date.now()}`;

    const res = await fetch(rawJsonUrl, {
      cache: "no-store",
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
      },
    });

    if (!res.ok) {
      console.warn(`[Metadata Warning] Failed to fetch root metadata.json (${res.status}).`);
      return emptyResult;
    }

    const items: ImageMetadata[] = await res.json();

    if (!Array.isArray(items)) {
      console.warn("[Metadata Error] Root metadata.json is not an array.");
      return emptyResult;
    }

    const result = {
      photos: [] as FrameItem[],
      drawings: [] as FrameItem[],
      gadgets: [] as FrameItem[],
      games: [] as FrameItem[],
    };

    items.forEach((item) => {
      if (!item.category || !item.fileName) return;

      const formattedDate = formatDate(item.date);
      const encodedCategory = encodeURIComponent(item.category);
      const encodedFileName = encodeURIComponent(item.fileName);

      const imageUrl = `https://raw.githubusercontent.com/${GITHUB_USER}/${GITHUB_REPO}/${BRANCH}/${encodedCategory}/${encodedFileName}`;

      // Badge priority: Formatted Date -> Custom Tag -> Category Fallback
      let metaTag = "";
      if (formattedDate) {
        metaTag = formattedDate;
      } else if (item.tag) {
        metaTag = item.tag;
      } else {
        metaTag = item.category.toUpperCase();
      }

      const frameItem: InternalFrameItem = {
        id: `${item.category}/${item.fileName}`,
        title: item.title || item.fileName,
        image: imageUrl,
        description: item.description || item.title || item.fileName,
        tag: metaTag,
        timestamp: parseTimestamp(item.date),
      };

      if (result[item.category]) {
        result[item.category].push(frameItem);
      }
    });

    return result;
  } catch (error) {
    console.error("[Fetch Exception] Failed loading gallery metadata:", error);
    return emptyResult;
  }
}

/**
 * Fetches, sorts by newest date, and returns the top N images across all categories.
 */
export async function fetchLatestGalleryItems(limit: number = 4): Promise<FrameItem[]> {
  const categories = await fetchAllGalleryCategories();

  const allItems = (
    [
      ...categories.photos,
      ...categories.drawings,
      ...categories.gadgets,
      ...categories.games,
    ] as InternalFrameItem[]
  );

  allItems.sort((a, b) => b.timestamp - a.timestamp);

  return allItems.slice(0, limit).map(({ timestamp, ...item }) => item);
}