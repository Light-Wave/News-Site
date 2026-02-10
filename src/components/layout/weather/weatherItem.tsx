"use client";

import { useEffect, useState } from "react";
import { getWeatherData } from "@/actions/weather-data";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

export default function WeatherItem() {
  const citiesToFantasy = new Map<string, string>([
    ["Stormspire", "Stockholm"],
    ["Emberfall", "Falun"],
    ["Runewick", "Linköping"],
    ["Seaguard Haven", "Göteborg"],
    ["Frosthollow", "Umeå"],
  ]);

  const [location, setLocation] = useState("Stormspire");
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function loadWeather(city: string) {
    setLoading(true);

    const realCity = citiesToFantasy.get(city) ?? "Stockholm";
    const result = await getWeatherData(realCity);

    setWeather(result);
    setLoading(false);
  }

  useEffect(() => {
    loadWeather(location);
  }, [location]);

  return (
    <div className="flex flex-col items-center">
      <Select value={location} onValueChange={setLocation}>
        <SelectTrigger className="border-0 shadow-none focus:ring-0">
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          {[...citiesToFantasy.keys()].map((city) => (
            <SelectItem key={city} value={city}>
              {city}
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
                <h3 className="text-xl font-bold">{location}</h3>

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
