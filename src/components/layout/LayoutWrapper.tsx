import React, { useState } from 'react';
import { ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useGlobalLoader } from '../../context/globalLoaderContext';
import { styles } from './LayoutWrapper.styles';

interface Props {
  children: React.ReactNode;
}

export const LayoutWrapper: React.FC<Props> = ({ children }) => {
  const [isImageLoaded, setImageLoaded] = useState(false);
  const { endTransition } = useGlobalLoader();

  const handleImageLoad = () => {
    setImageLoaded(true);
    endTransition();
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <ImageBackground
        source={require('../../../assets/main-back-2.jpg')}
        style={styles.mainBackground}
        resizeMode="cover"
        onLoadEnd={handleImageLoad}
      >
        {isImageLoaded && children}
      </ImageBackground>
    </SafeAreaView>
  );
};