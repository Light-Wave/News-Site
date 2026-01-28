import { ActionResult } from "@/types/action-result";
import { Weather } from "@/types/weather";

const WEATHER_API_BASE = "https://weather.lexlink.se/forecast/location/";

export async function getWeatherData(
  location: string,
): Promise<ActionResult<Weather>> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8_000);
  try {
    const response = await fetch(`${WEATHER_API_BASE}${location}`, {
      signal: controller.signal,
      next: {
        revalidate: 60 * 5, // revalidate every 5 minutes
      },
    });
    if (!response.ok) {
      return {
        success: false,
        message: `Failed to fetch weather (status ${response.status})`,
      };
    }

    const data: Weather = await response.json();

    if (!data) {
      return {
        success: false,
        message: "Invalid API response structure",
      };
    }
    if (
      typeof data !== "object" ||
      data === null ||
      !Array.isArray(data.timeseries) ||
      typeof data.location !== "object" ||
      data.location === null ||
      typeof data.lat !== "number" ||
      typeof data.lon !== "number"
    ) {
      return {
        success: false,
        message: "Invalid or incomplete weather data from API",
      };
    }
    return {
      success: true,
      data,
    };
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      return {
        success: false,
        message: "Request timed out after 8 seconds",
      };
    }
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  } finally {
    clearTimeout(timeout);
  }
}
