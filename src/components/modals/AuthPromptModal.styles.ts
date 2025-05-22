import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  closeText: {
    fontSize: 24,
    fontWeight: '400',
  },
  title: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
    marginTop: -15,
  },
  registerButton: {
    backgroundColor: '#ffd700',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  registerText: {
    textAlign: 'center',
    fontWeight: '500',
  },
  loginButton: {
    backgroundColor: '#ccc',
    padding: 12,
    borderRadius: 10,
  },
  loginText: {
    textAlign: 'center',
    fontWeight: '500',
  },
});