
import React from "react";
import { View } from "react-native";

import { NewsList } from "../components/news/NewsList";

export const NewsScreen = () => {

    return (
        <View style={{flex: 1}}>
            <NewsList/>
        </View>
    )

}
