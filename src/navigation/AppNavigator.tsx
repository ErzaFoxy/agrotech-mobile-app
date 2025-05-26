import React, { useEffect, useRef } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';

import { TabScreens } from './TabScreens';
import { RegisterScreen } from '../screens/RegisterScreen';
import { ProfileScreen } from '../screens/ProfileScreen';

import { useGlobalLoader } from '../context/globalLoaderContext';

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  const navigationRef = useNavigationContainerRef();
  const { startTransition, endTransition } = useGlobalLoader();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      // Чистим таймер при размонтировании
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <NavigationContainer
      ref={navigationRef}
      onStateChange={() => {
        startTransition();

        // Защита от множественных таймеров
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        // Завершение перехода после небольшой паузы
        timeoutRef.current = setTimeout(() => {
          endTransition();
        }, 300); 
      }}
    >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Tabs" component={TabScreens} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};