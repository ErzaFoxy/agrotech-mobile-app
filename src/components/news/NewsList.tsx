import React from 'react';
import { ScrollView, View } from 'react-native';

import SvgNewsIcon from '../../../assets/news-icon.svg';
import { NewsCard } from './NewsCard';
import { newsUA as ua } from '../../translations/news';
import { styles } from './News.styles';

export const NewsList: React.FC = () => {
    const currentDate = new Date();

    return (
        <View style={styles.container}>
            <SvgNewsIcon width={55} height={55} style={styles.icon} />
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={true}
                persistentScrollbar
                scrollEnabled
            >
                {[1, 2, 3].map((_, i) => (
                    <NewsCard
                        key={i}
                        title={ua.title}
                        text={ua.text}
                        date={currentDate}
                    />
                ))}
            </ScrollView>
        </View>
    );
};