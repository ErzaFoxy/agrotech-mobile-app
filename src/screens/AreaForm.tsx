import React from "react";
import { View, StyleSheet } from "react-native";

import { AreaForm } from "../components/areaForm/AreaForm";

export const CultureScreen = () => {

    return (
        <View style={styles.container}>
            <AreaForm/>
        </View>
    )

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
});