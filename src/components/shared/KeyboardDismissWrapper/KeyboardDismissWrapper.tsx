import { Keyboard, Pressable } from 'react-native';
import React from 'react';

export const KeyboardDismissWrapper = ({ children }: { children: React.ReactNode }) => {
  const handlePress = () => {
    Keyboard.dismiss();
  };

  return (
    <Pressable
      onPress={handlePress}
      style={{ flex: 1 }}
      pointerEvents="box-none"
    >
      {children}
    </Pressable>
  );
};