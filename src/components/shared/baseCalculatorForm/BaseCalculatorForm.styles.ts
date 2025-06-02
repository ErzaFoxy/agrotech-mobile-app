import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: '10%',
    backgroundColor: 'rgba(230, 206, 56, 0.01)'
  },
  title: {
    fontSize: 24,
    marginBottom: 15,
    fontWeight: '600',
    textAlign: 'center',
    color: '#fff',
  },
  input: {
    backgroundColor: 'rgba(230, 206, 56, 0.9)',
    borderRadius: 20,
    padding: 10,
    fontSize: 16,
    textAlign: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: Platform.OS === 'ios' ? 0.4 : 0.25,
    shadowRadius: 12,
    elevation: Platform.OS === 'android' ? 6 : 0,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#E6CE38',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 15,
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
    marginBottom: 10,
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
    marginTop: 15,
    marginBottom: 40,
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
    marginTop: 50,
    marginBottom: 10
  },
});