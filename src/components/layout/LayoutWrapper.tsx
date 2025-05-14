import React from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import { ImageBackground, ActivityIndicator } from 'react-native';

import { styles } from './LayoutWrapper.styles';

interface Props {
    children: React.ReactNode,
    isLoading?: boolean
}


export const LayoutWrapper: React.FC<Props> = ({ children, isLoading = false }) => {

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <ImageBackground
                source={require('../../../assets/main-back-2.jpg')}
                style={styles.mainBackground}
                resizeMode='cover'
            >
                {isLoading ? (
                    <ActivityIndicator size="large" color="#ffffff" accessibilityRole="progressbar" />
                ) : (
                    children
                )}
            </ImageBackground>
        </SafeAreaView>
    )
}