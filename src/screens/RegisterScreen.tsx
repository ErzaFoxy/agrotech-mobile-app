// src/screens/RegisterScreen.tsx
import React from 'react';
import { RegisterForm } from '../components/registerForm/RegisterForm';
import { LayoutWrapper } from '../components/layout/LayoutWrapper';
import { Header } from '../components/header/Header';


export const RegisterScreen: React.FC = () => {
  return (
    <LayoutWrapper>
      <Header onMenuPress={() => console.log('Menu')} />
        <RegisterForm />
    </LayoutWrapper>
  );
};