import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

export const styles = StyleSheet.create({
    menu: {
      width: screenWidth * 0.11,
      height: screenWidth * 0.11 / 0.933,
    },
    close: {
      width: screenWidth * 0.09,
      height: screenWidth * 0.09,
    },
  });