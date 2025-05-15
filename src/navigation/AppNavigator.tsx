import React, { useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';

import { LayoutWrapper } from '../components/layout/LayoutWrapper';
import { Header } from '../components/header/Header';
import { CultureScreen } from '../screens/CultureScreen';
import { AreaScreen } from '../screens/AreaScreen';
// import { WeatherScreen } from '../screens/weatherScreen';
// import { NotesScreen } from '../screens/notesScreen';
// import { NewsScreen } from '../screens/newsScreen';
// import { SubscriptionScreen } from '../screens/subscriptionScreen';

const routes = [
  { key: 'culture' },
  { key: 'area' },
  // { key: 'weather' },
  // { key: 'notes' },
  // { key: 'news' },
  // { key: 'subscription' },
];

const renderScene = SceneMap({
  culture: CultureScreen,
  area: AreaScreen,
  // weather: WeatherScreen,
  // notes: NotesScreen,
  // news: NewsScreen,
  // subscription: SubscriptionScreen,
});

export const AppNavigator = () => {
    const layout = useWindowDimensions();
    const [index, setIndex] = useState(0);

    return (
        <LayoutWrapper>
            <Header onMenuPress={() => console.log('Menu')} />
            <TabView 
                navigationState={{index, routes}} 
                renderScene={renderScene}
                onIndexChange={setIndex} 
                initialLayout={{width: layout.width}}
                renderTabBar={() => null}
                
            />
        </LayoutWrapper>
    )
}