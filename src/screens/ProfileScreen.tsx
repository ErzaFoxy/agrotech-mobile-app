
import React from 'react';

import { ProfileForm } from '../components/profileForm/ProfileForm';
import { LayoutWrapper } from '../components/layout/LayoutWrapper';


export const ProfileScreen: React.FC = () => {
  return (
    <LayoutWrapper>
        <ProfileForm />
    </LayoutWrapper>
  );
};