
import React from 'react';

import { RegisterForm } from '../components/registerForm/RegisterForm';
import { LayoutWrapper } from '../components/layout/LayoutWrapper';


export const RegisterScreen: React.FC = () => {
  return (
    <LayoutWrapper>
        <RegisterForm />
    </LayoutWrapper>
  );
};