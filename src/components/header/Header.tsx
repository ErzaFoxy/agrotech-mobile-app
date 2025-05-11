import React from "react";
import {View, Text, TouchableOpacity, Image } from "react-native";

import { styles } from "./Header.styles";
import Logo from "../../../assets/logo-w-1.svg";
import MenuIcon from "../../../assets/menu.svg";


interface Props {
    onMenuPress: () => void;
} 

export const Header = ({onMenuPress}: Props) => {

    return( 
        <View style={styles.container}>
            <Logo width={styles.logo.width} height={styles.logo.height} />
            <TouchableOpacity onPress={onMenuPress}>
                <MenuIcon width={styles.menu.width} height={styles.menu.height} />
            </TouchableOpacity>
        </View>
    )

}