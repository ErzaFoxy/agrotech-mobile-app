import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { styles } from './LoadingText.styles';
import { weatherUA as ua } from '../../../translations/weather';

export const LoadingText = () => {
  const [visibleDotCount, setVisibleDotCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleDotCount(prev => (prev + 1) % 4);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.text}>{ua.loading}</Text>
      <Text style={styles.dots}>
        {'.'.repeat(visibleDotCount)}
      </Text>
    </View>
  );
};