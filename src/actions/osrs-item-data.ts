"use server";

import { ActionResult } from "@/types/action-result";
import { ItemSummary, Root } from "@/types/osrs";

export async function itemData(url: string): Promise<ActionResult<ItemSummary>> {
  // Example URL: https://secure.runescape.com/m=itemdb_oldschool/api/catalogue/detail.json?item=4151 (google item id if you want other items, I picked 1333, 4151, 11804)
  try {
    const response = await fetch(`${url}`);

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
  }
}
