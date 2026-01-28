import { ActionResult } from "@/types/action-result";
import { Weather } from "@/types/weather";

const WEATHER_API_BASE = "https://weather.lexlink.se/forecast/location/";

export async function getWeatherData(
  location: string,
): Promise<ActionResult<Weather>> {
  const trimmedLocation = location.trim();

  if (
    trimmedLocation.length === 0 ||
    !/^[a-zA-Z0-9\s,.-]+$/.test(trimmedLocation)
  ) {
    return {
      success: false,
      message: "Invalid location format",
    };
  }

  const encodedLocation = encodeURIComponent(trimmedLocation);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8_000);

  try {
    const response = await fetch(`${WEATHER_API_BASE}${encodedLocation}`, {
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

    const data: unknown = await response.json();
    if (data === null || typeof data !== "object") {
      return {
        success: false,
        message: "Invalid API response structure",
      };
    }
    const candidate = data as {
      timeseries?: unknown;
      location?: unknown;
      lat?: unknown;
      lon?: unknown;
    };
    if (
      !Array.isArray(candidate.timeseries) ||
      typeof candidate.location !== "object" ||
      candidate.location === null ||
      typeof candidate.lat !== "number" ||
      typeof candidate.lon !== "number"
    ) {
      return {
        success: false,
        message: "Invalid or incomplete weather data from API",
      };
    }
    const weatherData = data as Weather;
    return {
      success: true,
      data: weatherData,
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
