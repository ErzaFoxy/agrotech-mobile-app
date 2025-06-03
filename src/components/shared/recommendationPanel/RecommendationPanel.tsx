import React from 'react';
import { View, Text, Pressable, Linking } from 'react-native';

import SvgDobryvo1 from '../../../../assets/dobryva-1.svg';
import SvgDobryvo2 from '../../../../assets/dobryva-2.svg';
import SvgDobryvo3 from '../../../../assets/dobryva-3.svg';
import SvgDobryvo4 from '../../../../assets/dobryva-4.svg';
import SvgDobryvo5 from '../../../../assets/dobryva-5.svg';
import { styles } from './RecommendationPanel.styles';
import { formCultureUA as ua } from '../../../translations';

const recommendations = [
  { icon: SvgDobryvo1, url: 'https://alfasmartagro.com/catalog/growth_regulators/greyvis/' },
  { icon: SvgDobryvo2, url: 'https://alfasmartagro.com/catalog/gerbitsidi/alvius/' },
  { icon: SvgDobryvo3, url: 'https://alfasmartagro.com/catalog/insektitsidi/aktual/' },
  { icon: SvgDobryvo4, url: 'https://alfasmartagro.com/catalog/desiccants/alpha_dikvat/' },
  { icon: SvgDobryvo5, url: 'https://alfasmartagro.com/catalog/gerbitsidi/alvius/' },
];

export const RecommendationPanel = () => {

  const openLink = async (url: string) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      console.warn("Can't open URL:", url);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {ua.recomendTxt}
      </Text>
      <View style={styles.iconRow}>
        {recommendations.map(({ icon: Icon, url }, index) => (
          <Pressable key={index} style={styles.iconWrapper} onPress={() => openLink(url)}>
            <Icon width={styles.icon.width} height={styles.icon.height} />
          </Pressable>
        ))}
      </View>
    </View>
  );
};
