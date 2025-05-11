import { Platform, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 30,
    gap: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    color: '#fff',
  },
  input: {
    backgroundColor: '#ffffffbb',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#ffcc00',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
  },
  buttonText: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    fontSize: 14,
    textAlign: 'center',
  },
  inputError: {
    borderColor: 'red',
    borderWidth: 1,
  },
});