import React, { useState } from 'react';
import { Host } from 'react-native-portalize';

import { GlobalLoader } from './components/shared/globalLoader/GlobalLoader';
import { GlobalLoaderProvider, useGlobalLoader } from './context/globalLoaderContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { DropDownOverlayManagerProvider } from './components/shared/dropDownOverlayManager/DropDownOverlayManager';
import { AppNavigator } from './navigation/AppNavigator';
import { AuthProvider } from './context/authContext';
import { AppInitializer } from './AppInitializer';
import { NoteRefreshProvider } from './context/noteRefreshContext';


const AppContent = () => {
  const { isTransitioning } = useGlobalLoader();

  return (
    <>
      <GlobalLoader visible={isTransitioning} />
      <DropDownOverlayManagerProvider>
        <SafeAreaProvider>
          <AuthProvider>
            <NoteRefreshProvider>
              <AppNavigator />
            </NoteRefreshProvider>
          </AuthProvider>
        </SafeAreaProvider>
      </DropDownOverlayManagerProvider>
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