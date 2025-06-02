import React, { useState, useEffect } from 'react';
import { useWindowDimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';

import { consumePendingTabIndex } from '../services/tabNavigation';
import { LayoutWrapper } from '../components/layout/LayoutWrapper';
import { CultureScreen } from '../screens/CultureScreen';
import { AreaScreen } from '../screens/AreaScreen';
import { NotesScreen } from '../screens/NotesScreen';
import { WeatherScreen } from '../screens/WeatherScreen';
import { NewsScreen } from '../screens/NewsScreen';
import { SubscriptionScreen } from '../screens/SubscriptionScreen';

const routes = [
  { key: 'culture' },
  { key: 'area' },
  { key: 'notes' },
  { key: 'weather' },
  { key: 'news' },
  { key: 'subscription' },
];

export const TabScreens = () => {
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
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={() => null}
      />
    </LayoutWrapper>
  );
};