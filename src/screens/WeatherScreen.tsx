import React from "react";
import { View } from "react-native";

import { WeatherMap } from "../components/weather/WeatherMap";

export const WeatherScreen = () => {

    return (
        <View style={{flex: 1}}>
            <WeatherMap/>
        </View>
    )

}
