import React, { useEffect, useState, useRef } from 'react';
import MapView, { Marker, LatLng, MapPressEvent } from 'react-native-maps';
import { View, Text } from 'react-native';

import { getWeatherByCoords } from '../../services/weatherService';
import { getCityNameByCoords } from '../../services/geocodingService';
import { getUserLocation } from '../../services/locationService';
import { styles } from './WeatherMap.styles';
import { weatherUA as ua } from '../../translations/weather';
import { GlobalLoader } from '../shared/globalLoader/GlobalLoader';
import { LoadingText } from '../shared/loadingText/LoadingText';
import SvgWeatherIcon from '../../../assets/weather-icon.svg';

export const WeatherMap = () => {
    const [marker, setMarker] = useState<LatLng | null>(null);
    const [weather, setWeather] = useState<any>(null);
    const [city, setCity] = useState<string | null>(null);
    const [isWeatherLoading, setIsWeatherLoading] = useState(false);
    const [weatherError, setWeatherError] = useState<string | null>(null);

    const lastClickTimeRef = useRef<number | null>(null);

    const handleMapPress = async (e: MapPressEvent) => {

        const now = Date.now();
        if (lastClickTimeRef.current && now - lastClickTimeRef.current < 35000) {
            setWeatherError(ua.errorFastTxt);
            return;
        }
        lastClickTimeRef.current = now;

        // Получаем координаты точки, на которую нажал пользователь
        const coords = e.nativeEvent.coordinate;

        setMarker(coords); // Ставим маркер на карте
        setIsWeatherLoading(false);

        // Запрашиваем город по координатам (reverse geocoding)
        const foundCity = await getCityNameByCoords(coords.latitude, coords.longitude);

        if (foundCity) {
            setCity(foundCity);// Если это город — сохраняем его
            setIsWeatherLoading(true);
            setWeather(null); // очистим прошлю погоду
            setWeatherError(null);

            try {
                // запрашиваем погоду по координатам
                const weatherData = await getWeatherByCoords(coords.latitude, coords.longitude);
                setWeather(weatherData);
            } catch (error) {
                console.warn("Не вдалося завантажити погоду", error);
                setWeatherError(ua.errorServerTxt);
            } finally {
                setIsWeatherLoading(false);
            }
        } else {
            setCity(null);
            setWeather(null);
            setWeatherError(ua.errorPinTxt);
        }
    };

    useEffect(() => {
        (async () => {
            try {
                setIsWeatherLoading(true);
                const coords = await getUserLocation();
                const position = { latitude: coords.lat, longitude: coords.lon };
                setMarker(position);

                const foundCity = await getCityNameByCoords(position.latitude, position.longitude);
                if (foundCity) {
                    setCity(foundCity);
                    const weatherData = await getWeatherByCoords(position.latitude, position.longitude);
                    setWeather(weatherData);
                    setWeatherError(null);
                }
            } catch (error) {
                console.warn("Не вдалося отримати стартову погоду", error);
                setWeatherError(ua.errorServerTxt);
            } finally {
                setIsWeatherLoading(false);
            }
        })();
    }, []);

    useEffect(() => {
        if (weather) {
            setWeatherError(null);
        }
    }, [weather]);


    return (
        <View style={styles.container}>
            <SvgWeatherIcon width={60} height={60} style={styles.icon} />
            <View style={styles.mapContainer}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: marker?.latitude || 48.4647,
                        longitude: marker?.longitude || 35.0462,
                        latitudeDelta: 0.3,
                        longitudeDelta: 0.3,
                    }}
                    onPress={handleMapPress}
                    scrollEnabled={true}
                    zoomEnabled={true}
                >
                    {marker && <Marker coordinate={marker} />}
                </MapView>
                {/* Локальний прелодер поверх карти */}
                {isWeatherLoading && (
                    <View style={styles.overlay}>
                        <GlobalLoader visible={true} leavesStyle={{ bottom: '35%' }} />
                    </View>
                )}
            </View>

            {weatherError && !isWeatherLoading && (
                <View style={styles.infoBox}>
                    <Text style={styles.textError}>{weatherError}</Text>
                </View>
            )}
            {isWeatherLoading && (
                <View style={styles.infoBox}>
                    <LoadingText />
                </View>
            )}
            {weather && !isWeatherLoading && (
                <View style={styles.infoBox}>
                    <Text style={styles.city}>{city}</Text>
                    <View style={styles.columns}>
                        <View style={[styles.column, { flex: 1.2 }]}>
                            <Text style={styles.text}>
                                {ua.temperature}: {Math.round(weather.main?.temp)}°C
                            </Text>
                            <Text style={styles.text}>
                                {ua.condition}: {weather.weather?.[0]?.description}
                            </Text>
                            <Text style={styles.text}>
                                {ua.humidity}: {weather.main?.humidity}%
                            </Text>
                            {/* <Text style={styles.text}>
                                {ua.windSpeed}: {Math.round(weather.wind?.speed)} м/с
                            </Text> */}
                        </View>
                        <View style={styles.column}>
                            {/* <Text style={styles.text}>
                                {ua.clouds}: {weather.clouds?.all}%
                            </Text> */}
                            <Text style={styles.text}>
                                {ua.visibility}: {(weather.visibility / 1000).toFixed(1)} км
                            </Text>
                            <Text style={styles.text}>
                                {ua.sunrise}: {new Date(weather.sys?.sunrise * 1000).toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' })}
                            </Text>
                            <Text style={styles.text}>
                                {ua.sunset}: {new Date(weather.sys?.sunset * 1000).toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' })}
                            </Text>
                        </View>
                    </View>
                </View>
            )}
        </View>
    );
};
