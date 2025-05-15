import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 10,
    gap: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    color: '#fff',
  },
  input: {
    backgroundColor: 'rgba(230, 206, 56, 0.9)',
    borderRadius: 20,
    padding: 12,
    fontSize: 16,
    textAlign: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: Platform.OS === 'ios' ? 0.4 : 0.25,
    shadowRadius: 12,
    elevation: Platform.OS === 'android' ? 6 : 0,
    margin: 0,
  },
  button: {
    backgroundColor: '#E6CE38',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
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
  label: {
    color: '#fff',
    fontSize: 15,
    textAlign: 'center',
  },
  resultText: {
    color: '#fff',
    marginTop: 10,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '500',
  },
  noteButtonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 12,
    gap: 8
  },
  noteButton: {
    width: 40,
    height: 40,
  },
  noteHint: {
    color: '#FFD700',
    fontSize: 14,
    fontWeight: '500'
  },
  noteButtonTouchable: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  futureResult: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
    marginTop: 40,
    marginBottom: 20
  },
});