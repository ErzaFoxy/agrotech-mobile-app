
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Image, View } from 'react-native';
import SvgFlower from '../../../../assets/flower-1.svg';
import SvgLeaves from '../../../../assets/leaves-1.svg';
import { styles } from './GlobalLoader.styles';
import { useGlobalLoader } from '../../../context/globalLoaderContext';


export const GlobalLoader: React.FC<{ visible: boolean }> = ({ visible }) => {
  const opacity = useRef(new Animated.Value(1)).current;
  const [isImageLoaded, setImageLoaded] = useState(false);
  const { endTransition } = useGlobalLoader();

  const backgroundSource = Image.resolveAssetSource(require('../../../../assets/main-back-2.jpg'));

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 0.05, duration: 1000, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 1, duration: 1000, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, []);

  useEffect(() => {
    if (isImageLoaded && visible) {
      const timer = setTimeout(() => {
        endTransition();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isImageLoaded, visible]);

  if (!visible) {
    console.log('[GlobalLoader] Прелоадер приховано, visible === false');
    return null;
  }

  return (
    <View style={styles.container}>
      <Image
        source={backgroundSource}
        style={styles.backgroundImage}
        onLoadEnd={() => {
          setImageLoaded(true);
        }}
      />
      {isImageLoaded && (
        <>
          <Animated.View style={[styles.flowerWrapper, { opacity }]}>
            <SvgFlower width={41} height={41} />
          </Animated.View>
          <SvgLeaves width={72} height={27} style={styles.leaves} />
        </>
      )}
    </View>
  );
};