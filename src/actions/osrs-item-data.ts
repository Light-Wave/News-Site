"use server";

import { ActionResult } from "@/types/action-result";
import { ItemSummary, Root } from "@/types/osrs";

const OSRS_API_BASE =
  "https://secure.runescape.com/m=itemdb_oldschool/api/catalogue/detail.json";

export async function getOsrsItemData(
  itemId: string,
): Promise<ActionResult<ItemSummary>> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8_000); // 8s timeout

  // Item IDs: 1333, 4151, 11804 (google item ID if you want other items)
  try {
    const response = await fetch(`${OSRS_API_BASE}?item=${itemId}`, {
      signal: controller.signal,

      // Next.js cache configuration
      cache: "force-cache", // or "no-store" if you always want fresh data
      next: {
        revalidate: 60 * 5, // revalidate every 5 minutes
      },
    });

    if (!response.ok) {
      return {
        success: false,
        message: `Failed to fetch item (status ${response.status})`,
      };
    }

    const data: Root = await response.json();

    if (!data?.item) {
      return {
        success: false,
        message: "Invalid API response structure",
      };
    }

    const { icon, icon_large, name, current, day30 } = data.item;

    return {
      success: true,
      data: { icon, icon_large, name, current, day30 },
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  } finally {
    clearTimeout(timeout);
  }
}
