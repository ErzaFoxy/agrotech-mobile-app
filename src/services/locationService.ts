import * as Location from 'expo-location';

export const getUserLocation = async (): Promise<{ lat: number; lon: number }> => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.warn('Geolocation permission denied. Using default location.');
      return { lat: 48.4647, lon: 35.0462 }; // Дніпро
    }

    const location = await Location.getCurrentPositionAsync({});
    return {
      lat: location.coords.latitude,
      lon: location.coords.longitude,
    };
  } catch (error) {
    console.error('Error fetching user location:', error);
    return { lat: 48.4647, lon: 35.0462 }; // fallback
  }
};