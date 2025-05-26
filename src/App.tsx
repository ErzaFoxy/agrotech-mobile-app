import React, { useState } from 'react';
import { Host } from 'react-native-portalize';

import { GlobalLoader } from './components/shared/globalLoader/GlobalLoader';
import { GlobalLoaderProvider, useGlobalLoader } from './context/globalLoaderContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { DropDownOverlayManagerProvider } from './components/shared/dropDownOverlayManager/DropDownOverlayManager';
import { AppNavigator } from './navigation/AppNavigator';
import { AuthProvider } from './context/authContext';
import { KeyboardDismissWrapper } from './components/shared/KeyboardDismissWrapper/KeyboardDismissWrapper';
import { AppInitializer } from './AppInitializer';


const AppContent = () => {
  const { isTransitioning } = useGlobalLoader();

  return (
    <>
      <GlobalLoader visible={isTransitioning} />
      <KeyboardDismissWrapper>
        <DropDownOverlayManagerProvider>
          <SafeAreaProvider>
            <AuthProvider>
              <AppNavigator />
            </AuthProvider>
          </SafeAreaProvider>
        </DropDownOverlayManagerProvider>
      </KeyboardDismissWrapper>
    </>
  );
};

export default function App() {
  const [initialReady, setInitialReady] = useState(false);

  return (
    <GlobalLoaderProvider>
      <Host>
        <AppInitializer onReady={() => setInitialReady(true)} />
        {initialReady && <AppContent />}
      </Host>
    </GlobalLoaderProvider>
  );
}