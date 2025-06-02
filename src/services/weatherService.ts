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
      console.error(
        `❌ OpenWeatherMap HTTP error [${response.status}]: ${errorText}`
      );
      throw new Error("Не вдалося отримати погоду");
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error("❌ Помилка в weatherService:", error.message || error);
    throw new Error("Сталася непередбачувана помилка при отриманні погоди");
  }
};
