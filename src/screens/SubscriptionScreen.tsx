

import React from "react";
import { View } from "react-native";

import { SubscriptionUnavailableCard } from "../components/subscription/SubscriptionUnavailableCard";

interface Props {
    setTabIndex: (index: number) => void;
}

export const SubscriptionScreen: React.FC<Props> = ({setTabIndex}) => {

    return (
        <View style={{flex: 1}}>
            <SubscriptionUnavailableCard setTabIndex={setTabIndex}/>
        </View>
    )

}
