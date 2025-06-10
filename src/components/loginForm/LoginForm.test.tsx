import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { LoginForm } from './LoginForm';
import { formAuthUA as ua } from '../../translations';

// Оборачиваем в NavigationContainer, чтобы работал useNavigation
const renderWithNavigation = () =>
  render(
    <NavigationContainer>
      <LoginForm />
    </NavigationContainer>
  );

describe('LoginForm UI tests', () => {
  it('показывает ошибку, если поля не заполнены', () => {
    const { getByText } = renderWithNavigation();

    const loginButton = getByText(ua.loginBtn);
    fireEvent.press(loginButton);

    expect(getByText(ua.fillAllFields)).toBeTruthy();
  });

  it('переключает режим восстановления пароля', () => {
    const { getByText } = renderWithNavigation();

    const switchButton = getByText(ua.forgotPassword);
    fireEvent.press(switchButton);

    // Ожидаем появления кнопки отправки инструкций
    expect(getByText(ua.sendInstructions)).toBeTruthy();
  });

  it('переключает отображение пароля', () => {
    const { getByText, getByLabelText } = renderWithNavigation();

    const passwordInput = getByLabelText(ua.passwordLabel);
    const eyeButton = getByText('👁️');

    fireEvent.press(eyeButton);

    // Ожидаем появления иконки 🙈 вместо 👁️
    expect(getByText('🙈')).toBeTruthy();
  });
});