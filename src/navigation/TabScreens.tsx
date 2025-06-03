import React, { useState, useEffect } from 'react';
import { useWindowDimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';

import { consumePendingTabIndex } from '../services/tabNavigation';
import { LayoutWrapper } from '../components/layout/LayoutWrapper';
import { CultureScreen } from '../screens/CultureScreen';
import { AreaScreen } from '../screens/AreaScreen';
import { NotesScreen } from '../screens/NotesScreen';
import { WeatherScreen } from '../screens/WeatherScreen';
import { NewsScreen } from '../screens/NewsScreen';
import { SubscriptionScreen } from '../screens/SubscriptionScreen';

import NextIcon from "../../assets/next-icon.svg";
import PrevIcon from "../../assets/prev-icon.svg";

const routes = [
  { key: 'culture' },
  { key: 'area' },
  { key: 'notes' },
  { key: 'weather' },
  { key: 'news' },
  { key: 'subscription' },
];

export const TabScreens: React.FC = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const nextIndex = consumePendingTabIndex();
    if (nextIndex !== null) {
      setIndex(nextIndex);
    }
  }, []);

  const renderScene = SceneMap({
    culture: CultureScreen,
    area: AreaScreen,
    notes: NotesScreen,
    weather: WeatherScreen,
    news: NewsScreen,
    subscription: () => <SubscriptionScreen setTabIndex={setIndex} />,
  });

  return (
    <LayoutWrapper currentTab={index} setTabIndex={setIndex}>
      {index > 0 && (
        <TouchableOpacity onPress={() => setIndex(index - 1)} style={styles.icon}>
          <PrevIcon width={18} height={22} />
        </TouchableOpacity>
      )}
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={() => null}
      />

      {index < routes.length - 1 && (
        <TouchableOpacity onPress={() => setIndex(index + 1)} style={[styles.icon, styles.iconNext]}>
          <NextIcon width={18} height={22} />
        </TouchableOpacity>
      )}
    </LayoutWrapper>
  );
};


const styles = StyleSheet.create({
  icon: {
    position: 'absolute',
    top: '50%',
    transform: [{ translateY: '-50%' },],
    left: 5,
    zIndex: 1,
  },
  iconNext: {
    left: 'auto',
    right: 5
  }
})