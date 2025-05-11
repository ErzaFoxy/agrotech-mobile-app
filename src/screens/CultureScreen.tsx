import React from "react";
import { View, StyleSheet } from "react-native";

import { CultureForm } from "../components/cultureForm/CultureForm";

export const CultureScreen = () => {

    return (
        <View style={styles.container}>
            <CultureForm/>
        </View>
    )

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
});