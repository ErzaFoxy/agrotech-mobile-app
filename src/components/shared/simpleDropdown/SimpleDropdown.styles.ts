import {
  StyleSheet,
} from 'react-native';

export const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    marginBottom: 5,
    zIndex: 999,
  },
  inputWrapper: {
    position: 'relative',
  },
  label: {
    color: '#fff',
    marginBottom: 10,
    fontSize: 15,
    textAlign: 'center',
  },
  input: {
    backgroundColor: 'rgba(230, 206, 56, 0.9)',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4, // нужно для Android
    marginBottom: 10,
  },
  inputError: {
    borderWidth: 1,
    borderColor: 'red',
  },
  inputText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
});