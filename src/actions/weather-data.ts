import { ActionResult } from "@/types/action-result";
import { Series, Weather } from "@/types/weather";

const WEATHER_API_BASE = "https://weather.lexlink.se/forecast/location/";

export async function getWeatherData(
  location: string,
): Promise<ActionResult<Weather>> {

  if (!isValidLocationInput(location)) {
    return {
      success: false,
      message: "Invalid location format",
    };
  }

  const encodedLocation = encodeURIComponent(location);
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
    if (!isValidWeather(data)) {
      return {
        success: false,
        message: "Invalid or incomplete weather data from API",
      };
    }

    return {
      success: true,
      data: data,
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

function isValidSeries(series: unknown): series is Series {
  if (typeof series !== "object" || series === null) {
    return false;
  }

  const s = series as Partial<Series>;

  return (
    typeof s.validTime === "string" &&
    typeof s.temp === "number" &&
    typeof s.windSpeed === "number" &&
    typeof s.humidity === "number" &&
    typeof s.symbol === "number" &&
    typeof s.summary === "string"
  );
}

function isValidWeather(data: unknown): data is Weather {
  if (typeof data !== "object" || data === null) {
    return false;
  }

  const w = data as Partial<Weather>;

  return (
    typeof w.lat === "number" &&
    typeof w.lon === "number" &&
    typeof w.referenceTime === "string" &&
    typeof w.approvedTime === "string" &&
    Array.isArray(w.timeseries) &&
    w.timeseries.length > 0 &&
    w.timeseries.every(isValidSeries) &&
    typeof w.location === "object" &&
    w.location !== null
  );
}

function isValidLocationInput(location: string): location is string {
  return (
    location.trim().length > 0 && /^[\p{L}\p{M}0-9\s,.'-]+$/u.test(location)
  );
}
