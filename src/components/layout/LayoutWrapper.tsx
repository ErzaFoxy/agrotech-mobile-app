import React, { createContext, useState } from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import {ImageBackground, ActivityIndicator, View, Pressable } from 'react-native';

import { styles } from './LayoutWrapper.styles';

interface DropdownContextProps {
    onOutsidePress: () => void;
    setCloseDropdown: React.Dispatch<React.SetStateAction<() => void>>;
}

export const DropdownContext = createContext<DropdownContextProps>({ 
    onOutsidePress: () => {},
    setCloseDropdown: () => {},
});

interface Props {
    children: React.ReactNode,
    isLoading?: boolean
}

export const LayoutWrapper = ({children, isLoading = false}: Props) => {

    const [closeDropdown, setCloseDropdown] = useState<() => void>(() => () => {});

    const handleOutsidePress = () => {
        console.log('outside press');
        if (typeof closeDropdown === 'function') {
            closeDropdown();
        }
    }

    return (
        <DropdownContext.Provider value={{onOutsidePress: handleOutsidePress, setCloseDropdown }}>
            <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
                <ImageBackground
                    source={require('../../../assets/main-back-2.jpg')}
                    style={styles.mainBackground}
                    resizeMode='cover'
                >
                    <Pressable style={styles.innerWrapper} onPress={handleOutsidePress}>
                    {isLoading ? (
                        <ActivityIndicator size="large" color="#ffffff" accessibilityRole="progressbar" />
                    ) : (
                        children
                    )}
                    </Pressable> 
                </ImageBackground>
            </SafeAreaView>
        </DropdownContext.Provider>
    )
}