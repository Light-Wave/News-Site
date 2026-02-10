"use client";

import { getWeatherData } from "@/actions/weather-data";
import { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ActionResult } from "@/types/action-result";
import { Weather } from "@/types/weather";

/* ✨ Fantasy weather mapping */
const summaryMap: Record<string, { emoji: string; label: string }> = {
  "Clear sky": { emoji: "☀️📜👑", label: "Blessed Sun" },
  "Nearly clear sky": { emoji: "🌤️🕊️✨", label: "Calm Skies" },
  "Variable cloudiness": { emoji: "🌥️🧿🌀", label: "Shifting Omens" },
  "Halfclear sky": { emoji: "⛅🛡️🦅", label: "Guarded Skies" },
  "Cloudy sky": { emoji: "☁️🥀🌑", label: "Heavy Gloom" },
  Overcast: { emoji: "☁️🏰⛓️", label: "Darkened Heavens" },
  Fog: { emoji: "🌫️🕯️🕯️", label: "Ghostmist" },
  "Light rain": { emoji: "🌦️💎💧", label: "Soft Drizzle" },
  "Light snowfall": { emoji: "🌨️💎❄️", label: "Soft Frozen Drizzle" },
  Rain: { emoji: "🌧️🔱🌊", label: "Weeping Skies" },
  Thunderstorm: { emoji: "⛈️⚡🐉🔥", label: "Skywrath" },
  Snow: { emoji: "❄️🏰💎", label: "Frostfall" },
};

function getWeather(summary: string) {
  return summaryMap[summary] ?? { emoji: "🌍", label: summary };
}

const fantasyToCity = new Map<string, string>([
  ["Stormspire", "Stockholm"],
  ["Emberfall", "Falun"],
  ["Runewick", "Linköping"],
  ["Seaguard Haven", "Göteborg"],
  ["Frosthollow", "Umeå"],
]);

export default function WeatherItem() {
  const [location, setLocation] = useState("Stormspire");
  const [weather, setWeather] = useState<ActionResult<Weather> | null>(null);
  const [loading, setLoading] = useState(false);

  async function loadWeather(city: string) {
    setLoading(true);

    try {
      const realCity = fantasyToCity.get(city) ?? "Stockholm";
      const result = await getWeatherData(realCity);
      setWeather(result);
    } catch (error) {
      console.error("Failed to load weather data:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadWeather(location);
  }, [location]);

  return (
    <div className="flex flex-col items-center">
      <Select value={location} onValueChange={setLocation}>
        <SelectTrigger
          className="border-0 shadow-none focus:ring-0"
          aria-label="Select city"
        >
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          {[...fantasyToCity.keys()].map((city) => (
            <SelectItem key={city} value={city}>
              <h3 className="text-l font-bold">{city}</h3>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {loading && <p>Consulting the stars… ✨</p>}

      {weather?.success && !loading
        ? (() => {
            const data = weather.data.timeseries[1];
            const { emoji, label } = getWeather(data.summary);

            return (
              <div className="text-center space-y-1">
                <div className="flex items-center justify-center gap-2 text-lg">
                  <p className="text-muted-foreground">{data.temp}°C</p>
                  <span>{emoji}</span>
                </div>
                <span>{label}</span>
              </div>
            );
          })()
        : null}

      {!loading && weather && !weather.success && (
        <h3>The omens are unclear… 🌫️</h3>
      )}
    </div>
  );
}
