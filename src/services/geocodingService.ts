
import { GOOGLE_API_KEY } from '@env';

export const getCityNameByCoords = async (lat: number, lon: number): Promise<string | null> => {
  try {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${GOOGLE_API_KEY}&language=uk`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.status === 'OK') {
      const cityComponent = data.results[0].address_components.find((c: any) =>
        c.types.includes('locality') || c.types.includes('administrative_area_level_2')
      );
      return cityComponent?.long_name || null;
    }

    return null;
  } catch (error) {
    console.error('Помилка в geocodingService:', error);
    return null;
  }
};