import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    ScrollView,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';

import { useNavigation } from '../../navigation/hooks';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { styles } from './RegisterForm.styles';
import { auth, db } from '../../services/firebaseConfig';
import { formAuthUA as ua } from '../../translations';
import { DateInput, DateInputRef } from './DateInput';
import { KeyboardDismissWrapper } from "../shared/KeyboardDismissWrapper/KeyboardDismissWrapper";

export const RegisterForm: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [success, setSuccess] = useState(false);

    const navigation = useNavigation();

    const dateInputRef = useRef<DateInputRef>(null);

    const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const handleRegister = async () => {

        // Перевірка, що всі поля заповнені
        if (!name || !email || !password) {
            setError(ua.fillAllFields);
            return;
        }

        if (!isValidEmail(email)) {
            setError(ua.invalidEmail);
            return;
        }

        const isDateValid = dateInputRef.current?.validate();
        if (!isDateValid) return;

        setLoading(true);
        setError('');

        try {

            // Створюємо нового користувача з email та паролем через Firebase
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            // Отримуємо об'єкт створеного користувача з відповіді Firebase
            const user = userCredential.user;

            // Оновлюємо профіль користувача, додаючи ім’я до нього
            await updateProfile(user, { displayName: name });

            // Зберігаємо додаткові дані користувача в Firestore (ім’я, дата народження, email)
            await setDoc(doc(db, 'users', user.uid), {
                name,
                birthDate,
                email,
                createdAt: new Date().toISOString(), // Фіксуємо дату реєстрації
            });

            setName('');
            setEmail('');
            setPassword('');
            setBirthDate('');
            setSuccess(true);

        } catch (err: any) {
            console.error('Registration error:', err);
            setError(err.message || ua.registerError);
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
        <View style={{ flex: 1 }}>
            {success ? (
                <View style={[styles.container, {marginTop: '60%'}]}>
                    <Text style={styles.successMessage}>{ua.registrationSuccess}</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.button}>
                        <Text style={styles.buttonText}>{ua.goToProfile}</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
                >
                    <ScrollView
                        contentContainerStyle={{ paddingBottom: 32 }}
                        showsVerticalScrollIndicator={true}
                        persistentScrollbar
                        scrollEnabled
                        keyboardShouldPersistTaps="handled"
                    >
                        <KeyboardDismissWrapper>
                            <View style={styles.container}>
                                <Text style={styles.label}>{ua.nameLabel}</Text>
                                <TextInput style={[styles.input, getErrorStyle(name)]} value={name} onChangeText={setName} />

                                <Text style={styles.label}>{ua.emailLabel}</Text>
                                <TextInput
                                    style={[styles.input, getErrorStyle(email)]}
                                    value={email}
                                    onChangeText={setEmail}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                />

                                <Text style={styles.label}>{ua.birthDateLabel}</Text>
                                <DateInput
                                    ref={dateInputRef}
                                    value={birthDate}
                                    onChange={setBirthDate}
                                    setError={setError}
                                    inputStyle={[
                                        styles.input,
                                        error === ua.invalidDate ? styles.inputError : {},
                                    ]}
                                />

                                <Text style={styles.label}>{ua.passwordLabel}</Text>
                                <View style={styles.passwordWrapper}>
                                    <TextInput
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
                                        handleRegister();
                                    }}
                                    disabled={loading}
                                >
                                    {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>{ua.registerBtn}</Text>}
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Login')}
                                style={styles.loginLinkContainer}
                            >
                                <Text style={styles.loginLinkWrapper}>
                                    {ua.haveAccount}{' '}
                                    <Text style={styles.loginLink}>{ua.loginLink}</Text>
                                </Text>
                            </TouchableOpacity>
                        </KeyboardDismissWrapper>
                    </ScrollView>
                </KeyboardAvoidingView>
            )}

        </View>
    );
};