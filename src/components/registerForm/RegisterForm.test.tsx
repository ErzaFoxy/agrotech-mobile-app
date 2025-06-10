import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';

import { RegisterForm } from './RegisterForm';
import { formAuthUA as ua } from '../../translations';

// Оборачиваем RegisterForm в NavigationContainer, т.к. он использует useNavigation
const renderWithNavigation = () =>
    render(
        <NavigationContainer>
            <RegisterForm />
        </NavigationContainer>
    );

describe('RegisterForm UI tests', () => {
    it('показывает ошибку, если поля не заполнены', async () => {
        const { getByText } = renderWithNavigation();

        // Нажимаем на кнопку регистрации
        const button = getByText(ua.registerBtn);
        fireEvent.press(button);

        // Ждём появления текста об ошибке
        await waitFor(() => {
            expect(getByText(ua.fillAllFields)).toBeTruthy();
        });
    });

    it('показывает ошибку при невалидном email', async () => {
        const { getByText, getByLabelText } = renderWithNavigation();

        fireEvent.changeText(getByLabelText(ua.nameLabel), 'Test User');
        fireEvent.changeText(getByLabelText(ua.emailLabel), 'invalidemail');
        fireEvent.changeText(getByLabelText(ua.passwordLabel), '12345678');

        const button = getByText(ua.registerBtn);
        fireEvent.press(button);

        await waitFor(() => {
            expect(getByText(ua.invalidEmail)).toBeTruthy();
        });
    });

    it('переключает отображение пароля при нажатии на иконку', () => {
        const { getByLabelText, getByText } = renderWithNavigation();

        const passwordInput = getByLabelText(ua.passwordLabel);
        const eyeButton = getByText('👁️');

        expect(passwordInput.props.secureTextEntry).toBe(true); // изначально скрыт

        fireEvent.press(eyeButton);

        // 👁️ становится 🙈
        expect(getByText('🙈')).toBeTruthy();
    });
});