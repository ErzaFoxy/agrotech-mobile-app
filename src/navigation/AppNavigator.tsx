import React, { useEffect, useRef, useCallback } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';

import { TabScreens } from './TabScreens';
import { RegisterScreen } from '../screens/RegisterScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { LoginScreen } from '../screens/LoginScreen';

import { useGlobalLoader } from '../context/globalLoaderContext';

const Stack = createNativeStackNavigator();

export const AppNavigator: React.FC = () => {
  const navigationRef = useNavigationContainerRef();
  const { startTransition, setNavigationReady } = useGlobalLoader();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      // Чистим таймер при размонтировании
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleStateChange = useCallback(() => {
    startTransition();
    // Защита от множественных таймеров
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    // отмечаем, что навигация завершена
    timeoutRef.current = setTimeout(() => {
      setNavigationReady();
    }, 2000);
  }, [startTransition, setNavigationReady]);

  return (
    <NavigationContainer ref={navigationRef} onStateChange={handleStateChange}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Tabs" component={TabScreens} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};