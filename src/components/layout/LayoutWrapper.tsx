import React, { useState } from 'react';
import { ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Header } from '../header/Header';
import { useGlobalLoader } from '../../context/globalLoaderContext';
import { styles } from './LayoutWrapper.styles';

interface Props {
  children: React.ReactNode;
  currentTab?: number;
  setTabIndex?: (index: number) => void;
}

export const LayoutWrapper: React.FC<Props> = ({ children, currentTab = 0, setTabIndex = () => {} }) => {
  const [isImageLoaded, setImageLoaded] = useState(false);
  const { setLayoutReady } = useGlobalLoader();

  const handleImageLoad = () => {
    setImageLoaded(true);
    setLayoutReady();
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <ImageBackground
        source={require('../../../assets/main-back-2.jpg')}
        style={styles.mainBackground}
        resizeMode="cover"
        onLoadEnd={handleImageLoad}
      >
        <Header currentTab={currentTab} setTabIndex={setTabIndex} />
        {isImageLoaded && children}
      </ImageBackground>
    </SafeAreaView>
  );
};