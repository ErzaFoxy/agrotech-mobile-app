import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: 80,
      paddingHorizontal: 10,
      paddingBottom: 0,
      backgroundColor: '#4088688C',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    logo: {
      width: screenWidth * 0.8,
      height: screenWidth * 0.8 / 4.08
    },
    menu: {
      width: screenWidth * 0.11,
      height: screenWidth * 0.11 / 0.933
    },
  });