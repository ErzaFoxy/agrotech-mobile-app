import { OPENWEATHER_API_KEY } from "@env";

export const getWeatherByCoords = async (lat: number, lon: number) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 40000);

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=ua&appid=${OPENWEATHER_API_KEY}`;

    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeout);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ OpenWeatherMap HTTP error [${response.status}]: ${errorText}`);
      throw new Error("Failed to fetch weather data");
    }

    const data = await response.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("❌ Error in weatherService:", error.message);
      throw new Error("Unexpected error occurred while fetching weather");
    } else {
      console.error("❌ Unknown error in weatherService:", error);
      throw new Error("An unknown error occurred");
    }
  }
};
