import {
  StyleSheet,
  Platform,
  Dimensions
} from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

export const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    marginBottom: 28,
    zIndex: 999,
  },
  inputWrapper: {
    position: 'relative',
  },
  label: {
    color: '#fff',
    marginBottom: 5,
    fontSize: 16,
  },
  input: {
    backgroundColor: '#ffffffbb',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  inputError: {
    borderWidth: 1,
    borderColor: 'red',
  },
  inputText: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
  },
  dropdown: {
    position: 'absolute',
    top: 30,
    left: screenWidth * 0.45,
    backgroundColor: '#e6f4cc',
    borderBottomRightRadius: 16,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: Platform.OS === 'ios' ? 0.4 : 0.25,
    shadowRadius: 12,
    elevation: Platform.OS === 'android' ? 6 : 0,
    alignSelf: 'flex-start',
    zIndex: 999,
  },
  item: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
  selectedItemText: {
    color: '#f6c200',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 9,
  },
});