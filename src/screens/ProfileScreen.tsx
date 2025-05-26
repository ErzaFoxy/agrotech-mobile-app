
import React from 'react';
import { ProfileForm } from '../components/profileForm/ProfileForm';
import { LayoutWrapper } from '../components/layout/LayoutWrapper';
import { Header } from '../components/header/Header';


export const ProfileScreen: React.FC = () => {
  return (
    <LayoutWrapper>
      <Header onMenuPress={() => console.log('Menu')} />
        <ProfileForm />
    </LayoutWrapper>
  );
};