import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Host } from 'react-native-portalize';

import { DropDownOverlayManagerProvider } from './components/shared/dropDownOverlayManager/DropDownOverlayManager';
import { AppNavigator } from './navigation/AppNavigator';
import { KeyboardDismissWrapper } from './components/shared/KeyboardDismissWrapper/KeyboardDismissWrapper';
import { AuthProvider } from './context/authContext'; 

export default function App() {


  return (
    <Host>
      <KeyboardDismissWrapper>
        <DropDownOverlayManagerProvider>
          <SafeAreaProvider>
            <AuthProvider>
              <AppNavigator />
            </AuthProvider>
          </SafeAreaProvider>
        </DropDownOverlayManagerProvider>
      </KeyboardDismissWrapper>
    </Host>
  );
}