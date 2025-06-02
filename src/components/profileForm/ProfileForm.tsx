import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { signOut } from 'firebase/auth';

import { doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../../services/firebaseConfig';
import { useAuth } from '../../context/authContext';
import { formAuthUA as ua } from '../../translations';
import { useNavigation } from '../../navigation/hooks';
import { styles } from './ProfileForm.styles'
import { setPendingTabIndex } from '../../services/tabNavigation';

import IconSubscr from "../../../assets/icon-subscribe-1.svg";
import IconPlusActive from "../../../assets/plus-notes-active.svg";
import IconUser from "../../../assets/user-icon-1.svg";

export const ProfileForm: React.FC = () => {
    const { user } = useAuth();
    const navigation = useNavigation();
    const [userData, setUserData] = useState<{ name: string; birthDate: string; email: string; } | null>(null);
    const [loggedOut, setLoggedOut] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            if (!user) return;
            try {
                const userDoc = await getDoc(doc(db, 'users', user.uid));
                if (userDoc.exists()) {
                    const data = userDoc.data() as { name: string; birthDate: string; email: string; };
                    setUserData(data);
                }
            } catch (err) {
                console.error('Error fetching user data:', err);
            }
        };

        fetchUserData();
    }, [user]);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            setLoggedOut(true);
        } catch (err) {
            console.error('Logout error:', err);
        }
    };

    if (loggedOut) {
        return (
            <View style={styles.loggedOutContainer}>
                <Text style={styles.successMessage}>{ua.loggedOutSuccess}</Text>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.buttonText}>{ua.loginBtn}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Tabs')}>
                    <Text style={styles.buttonText}>{ua.toHomeBtn}</Text>
                </TouchableOpacity>
            </View>
        );
    }


    if (!user || !userData) return null;

    return (
        <View style={styles.container}>
            <IconUser width={styles.avatar.width} height={styles.avatar.height} style={styles.avatar} />
            <Text style={styles.nickname}>{userData.name || 'AgroTech User'}</Text>

            <Text style={styles.label}>{ua.loginLabel}</Text>
            <TextInput
                value={userData.email}
                editable={false}
                style={styles.inputMock}
                multiline={false}
                scrollEnabled={true}
                textAlignVertical="center"
                numberOfLines={1}
                selectionColor="transparent"
            />

            <Text style={styles.label}>{ua.birthDateLabel}</Text>
            <TextInput
                value={userData.birthDate}
                editable={false}
                style={styles.inputMock}
                multiline={false}
                scrollEnabled={true}
                textAlignVertical="center"
                numberOfLines={1}
                selectionColor="transparent"
            />

            <TouchableOpacity style={styles.button} onPress={handleLogout}>
                <Text style={styles.buttonText}>{ua.logoutBtn}</Text>
            </TouchableOpacity>

            <Text style={styles.subscription}>{ua.subscriptionText}</Text>

            <TouchableOpacity
                style={styles.noteButton}
                onPress={() => {
                    setPendingTabIndex(2);
                    navigation.navigate('Tabs');
                }}
            >
                <IconPlusActive width={styles.noteButton.width} height={styles.noteButton.height} />
            </TouchableOpacity>


            {/*  navigation.navigate('SubscriptionScreen') */}
            <TouchableOpacity style={styles.subscriptionBanner}>
                <Text style={styles.bannerText}>{ua.subscriptionBannerText}</Text>
                <IconSubscr width={styles.iconSubscr.width} height={styles.iconSubscr.height} />
            </TouchableOpacity>
        </View>
    );
};


