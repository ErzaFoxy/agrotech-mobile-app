
import { useNavigation as useNativeNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';

export const useNavigation = () => useNativeNavigation<NativeStackNavigationProp<RootStackParamList>>();