import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import { useNavigation } from '../../navigation/hooks';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { styles } from './LoginForm.styles';
import { auth } from '../../services/firebaseConfig';
import { formAuthUA as ua } from '../../translations';
import { KeyboardDismissWrapper } from "../shared/KeyboardDismissWrapper/KeyboardDismissWrapper";

export const LoginForm: React.FC = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isResetMode, setIsResetMode] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleLogin = async () => {
    if (!email || !password) {
      setError(ua.fillAllFields);
      return;
    }

    if (!isValidEmail(email)) {
      setError(ua.invalidEmail);
      return;
    }

    setLoading(true);
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate('Profile');
    } catch (err: any) {
      console.error('Login error:', err);
      setError(ua.loginError || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      setError(ua.fillAllFields);
      return;
    }

    if (!isValidEmail(email)) {
      setError(ua.invalidEmail);
      return;
    }

    setLoading(true);
    setError('');
    try {
      await sendPasswordResetEmail(auth, email);
      setSuccessMessage(ua.forgotPasswordInstructions);
    } catch (err: any) {
      console.error('Reset password error:', err);
      setError(err.message || ua.resetPasswordError);
    } finally {
      setLoading(false);
    }
  };

  const getErrorStyle = (field: string) => {
    const isEmpty = !field;
    const isInvalidEmail = error === ua.invalidEmail && field === email;
    return (error && (isEmpty || isInvalidEmail)) ? styles.inputError : {};
  };

  return (
    <KeyboardDismissWrapper>
      <View style={styles.container}>

        <View style={styles.containerForm}>
          {isResetMode ? (
            successMessage ? (
              <Text style={styles.successMessage}>{successMessage}</Text>
            ) : (
              <>
                <Text style={styles.label}>{ua.emailLabel}</Text>
                <TextInput
                  style={[styles.input, getErrorStyle(email)]}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />

                {error ? <Text style={styles.error}>{error}</Text> : null}

                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    Keyboard.dismiss();
                    handleResetPassword();
                  }}
                  disabled={loading}
                >
                  {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>{ua.sendInstructions}</Text>}
                </TouchableOpacity>
              </>
            )
          ) : (
            <>
              <Text style={styles.label}>{ua.loginLabel}</Text>
              <TextInput
                style={[styles.input, getErrorStyle(email)]}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <Text style={styles.label}>{ua.passwordLabel}</Text>
              <View style={styles.passwordWrapper}>
                <TextInput
                  accessibilityLabel={ua.passwordLabel}
                  style={[styles.input, getErrorStyle(password)]}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(prev => !prev)} style={styles.eyeButton}>
                  <Text>{showPassword ? '🙈' : '👁️'}</Text>
                </TouchableOpacity>
              </View>

              {error ? <Text style={styles.error}>{error}</Text> : null}

              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  Keyboard.dismiss();
                  handleLogin();
                }}
                disabled={loading}
              >
                {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>{ua.loginBtn}</Text>}
              </TouchableOpacity>
            </>
          )}
        </View>


        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => {
            setError('');
            setSuccessMessage('');
            setIsResetMode(prev => !prev);
          }}
        >
          <Text style={styles.secondaryButtonText}>
            {isResetMode ? ua.backToLogin : ua.forgotPassword}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.secondaryButton, styles.secondaryButtonRegister]}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.secondaryButtonText}>{ua.goToRegister}</Text>
        </TouchableOpacity>
      </View>
    </KeyboardDismissWrapper>
  );
};