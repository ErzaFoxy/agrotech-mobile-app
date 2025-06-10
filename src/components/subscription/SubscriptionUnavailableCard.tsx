import React from 'react';
import { View, Text, Pressable } from 'react-native';

import { useNavigation } from '../../navigation/hooks';
import SvgBag from '../../../assets/bag-green-icon.svg';
import { subscriptionUA as ua } from '../../translations/subscription';
import { styles } from './SubscriptionUnavailableCard.styles';

interface Props {
  setTabIndex: (index: number) => void;
}

export const SubscriptionUnavailableCard: React.FC<Props> = ({ setTabIndex }) => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.text}>{ua.subscriptionUnavailable}</Text>
                <Text style={styles.text}>{ua.freeUsage}</Text>
                <SvgBag width={36} height={36} style={styles.icon} />
            </View>
            <Pressable style={styles.button} onPress={() => setTabIndex(0)}>
                <Text style={styles.buttonText}>{ua.toHome}</Text>
            </Pressable>
        </View>
    );
};
