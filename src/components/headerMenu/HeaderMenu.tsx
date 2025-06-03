import React, { useState } from 'react';
import { TouchableOpacity, View, Keyboard } from 'react-native';
import { useNavigationState } from '@react-navigation/native';
import { useNavigation } from '../../navigation/hooks';

import { useDropdown } from '../shared/dropDownOverlayManager/DropDownOverlayManager';
import { useAuth } from '../../context/authContext';
import MenuIcon from '../../../assets/menu.svg';
import CloseIcon from '../../../assets/close-icon.svg';
import { setPendingTabIndex } from '../../services/tabNavigation';
import { styles } from './HeaderMenu.styles';
import { headerUA as ua } from '../../translations';

interface Props {
    triggerRef: React.RefObject<View | null>;
    currentTab: number;
    setTabIndex: (index: number) => void;
}

const menuOptions = [
    { label: ua.home, value: 'culture', index: 0 },
    { label: ua.areaForm, value: 'area', index: 1 },
    { label: ua.notes, value: 'notes', index: 2 },
    { label: ua.weather, value: 'weather', index: 3 },
    { label: ua.news, value: 'news', index: 4 },
    { label: ua.subscription, value: 'subscription', index: 5 },
];

export const HeaderMenu: React.FC<Props> = ({ triggerRef, currentTab, setTabIndex }) => {
    const { showDropdown } = useDropdown();
    const navigation = useNavigation();
    const navState = useNavigationState(state => state);
    const { user } = useAuth();

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const isInTabs = navState.routes[navState.index]?.name === 'Tabs';

    const handleOpenMenu = () => {
        if (!triggerRef.current) return;

        triggerRef.current.measureInWindow((x, y, width, height) => {
            const list = [
                ...menuOptions,
                { label: ua.profile, value: 'profile', index: -1 },
            ];

            const currentRoute = navState.routes[navState.index]?.name;
            const selectedValue =
                currentRoute === 'Profile' || currentRoute === 'Login'
                    ? 'profile'
                    : menuOptions[currentTab]?.value || 'culture';

            showDropdown({
                list,
                value: selectedValue,
                setValue: (val: string) => {
                    const target = list.find(i => i.value === val);
                    if (!target) return;

                    if (val === 'profile') {
                        navigation.navigate(user ? 'Profile' : 'Login');
                    } else {
                        // якщо не в Tabs — навігувати туди
                        if (!isInTabs) {
                            setPendingTabIndex(target.index); // зберігаємо index
                            navigation.navigate('Tabs');
                        } else {
                            setTabIndex(target.index);
                        }
                    }
                },
                triggerLayout: { x, y, width, height },
                variant: 'menu',
                onClose: () => {
                    setIsMenuOpen(false);
                },
            });

            setIsMenuOpen(prev => !prev);
        });
    };

    return (
        <TouchableOpacity
            onPress={() => {
                Keyboard.dismiss();
                handleOpenMenu();
            }}>
            {isMenuOpen ? (
                <CloseIcon width={styles.close.width} height={styles.close.height} />
            ) : (
                <MenuIcon width={styles.menu.width} height={styles.menu.height} />
            )}
        </TouchableOpacity>
    );
};