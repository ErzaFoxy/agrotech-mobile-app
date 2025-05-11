import {StyleSheet, Platform} from 'react-native';

export const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
  },
  dropdown: {
    position: 'absolute',
    backgroundColor: '#e6f4cc',
    borderBottomRightRadius: 16,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: Platform.OS === 'ios' ? 0.4 : 0.25,
    shadowRadius: 12,
    elevation: Platform.OS === 'android' ? 6 : 0,
    zIndex: 9999,
    alignSelf: 'flex-start',
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
});