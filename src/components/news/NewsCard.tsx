import React from 'react';
import { View, Text } from 'react-native';
import { format } from 'date-fns';
import { uk } from 'date-fns/locale';

import { styles } from './News.styles';

interface NewsCardProps {
  title: string;
  text: string;
  date: Date;
}

export const NewsCard: React.FC<NewsCardProps> = ({ title, text, date }) => {
  const formattedDate = format(date, 'dd.MM.yyyy', { locale: uk });

  return (
    <View style={styles.card}>
      <Text style={styles.date}>{formattedDate}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};
