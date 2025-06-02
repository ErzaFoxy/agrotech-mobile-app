
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Image, View } from 'react-native';
import SvgFlower from '../../../../assets/flower-1.svg';
import SvgLeaves from '../../../../assets/leaves-1.svg';
import { styles } from './GlobalLoader.styles';


export const GlobalLoader: React.FC<{ visible: boolean; leavesStyle?: object }> = ({ visible, leavesStyle = {} }) => {
  const opacity = useRef(new Animated.Value(1)).current;

  const backgroundSource = require('../../../../assets/main-back-2.jpg');

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 0.05, duration: 1000, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 1, duration: 1000, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [visible]);

  if (!visible) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.backgroundImage}
      />
      <Animated.View style={[styles.flowerWrapper, { opacity }]}>
        <SvgFlower width={41} height={41} />
      </Animated.View>
      <SvgLeaves width={72} height={27} style={[styles.leaves, leavesStyle]} />

    </View>
  );
};