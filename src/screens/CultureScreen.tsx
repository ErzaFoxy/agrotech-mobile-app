import React from "react";
import { View } from "react-native";

import { CultureForm } from "../components/cultureForm/CultureForm";

export const CultureScreen = () => {

    return (
        <View style={{flex: 1}}>
            <CultureForm/>
        </View>
    )

}
