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

function isValidSeries(series: unknown): series is Series {
  if (typeof series !== "object" || series === null) {
    return false;
  }

  const s = series as Partial<Series>;

  return (
    typeof s.validTime === "string" &&
    typeof s.airPressure === "number" &&
    typeof s.temp === "number" &&
    typeof s.visibility === "number" &&
    typeof s.windDirection === "number" &&
    typeof s.windSpeed === "number" &&
    typeof s.humidity === "number" &&
    typeof s.thunderProbability === "number" &&
    typeof s.cloudCover === "number" &&
    typeof s.lowerCloudCover === "number" &&
    typeof s.higherCloudCover === "number" &&
    typeof s.windGust === "number" &&
    typeof s.precipitationMin === "number" &&
    typeof s.precipitationMax === "number" &&
    typeof s.precipitationFrozen === "number" &&
    typeof s.precipitationCategoryValue === "number" &&
    typeof s.precipitationCategory === "string" &&
    typeof s.precipitationMean === "number" &&
    typeof s.precipitationMedian === "number" &&
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
    isValidLocation(w.location)
  );
}

function isValidLocation(loc: any): loc is Location {
  return (
    typeof loc === "object" &&
    loc !== null &&
    typeof loc.place_id === "number" &&
    typeof loc.licence === "string" &&
    typeof loc.osm_type === "string" &&
    typeof loc.osm_id === "number" &&
    typeof loc.lat === "string" &&
    typeof loc.lon === "string" &&
    typeof loc.category === "string" &&
    typeof loc.type === "string" &&
    typeof loc.place_rank === "number" &&
    typeof loc.importance === "number" &&
    typeof loc.addresstype === "string" &&
    typeof loc.name === "string" &&
    typeof loc.display_name === "string" &&
    Array.isArray(loc.boundingbox)
  );
}

function isValidLocationInput(location: string): boolean {
  return (
    location.trim().length > 0 && /^[\p{L}\p{M}0-9\s,.'-]+$/u.test(location)
  );
}
