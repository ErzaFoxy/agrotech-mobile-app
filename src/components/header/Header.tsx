import React, { useRef } from 'react';
import { View, Pressable } from 'react-native';
import { useNavigationState } from '@react-navigation/native';

import { styles } from './Header.styles';
import Logo from '../../../assets/logo-w-1.svg';
import { HeaderMenu } from '../headerMenu/HeaderMenu';
import { useNavigation } from '../../navigation/hooks';
import { setPendingTabIndex } from '../../services/tabNavigation';

interface Props {
  currentTab: number;
  setTabIndex: (index: number) => void;
}

export const Header: React.FC<Props> = ({ currentTab, setTabIndex }) => {
  const triggerRef = useRef<View>(null);
  const navigation = useNavigation();
  const navState = useNavigationState(state => state);
  const isInTabs = navState.routes[navState.index]?.name === 'Tabs';

  return (
    <View style={styles.container} ref={triggerRef}>
      <Pressable
        onPress={() => {
          if (isInTabs && setTabIndex) {
            setTabIndex(0);
          } else {
            setPendingTabIndex(0);
            navigation.navigate('Tabs');
          }
        }}
      >
        <Logo width={styles.logo.width} height={styles.logo.height} />
      </Pressable>
      <HeaderMenu triggerRef={triggerRef} currentTab={currentTab} setTabIndex={setTabIndex} />
    </View>
  );
};