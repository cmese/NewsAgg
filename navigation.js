import React from 'react';
//import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator, useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native'; 
import HomeScreen from './screens/HomeScreen';
import SportsScreen from './screens/SportsScreen';
import TechScreen from './screens/TechScreen';
import PoliticsScreen from './screens/PoliticsScreen';
import BusinessScreen from './screens/BusinessScreen';

import { bottomTabIcons } from './data/BottomTabIcons';
import { Ionicons } from '@expo/vector-icons';
//const Stack = createStackNavigator();

//export const BottomTabBarHeight = useBottomTabBarHeight();
const TabNav = createBottomTabNavigator();
/*
const screenOptions = {
  headerShown: false,
}*/

const NavStack = () => (
  <NavigationContainer>
    <TabNav.Navigator
      initialRouteName='Trending'
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let iconIndex = bottomTabIcons.findIndex(tabIcon => tabIcon.name === route.name);

          if (iconIndex >= 0) {
            iconName = focused ? bottomTabIcons[iconIndex].active
              : bottomTabIcons[iconIndex].inactive;
            color = focused ? 'black' : 'grey';
          } else {
            console.log("error: bottomTabs");
            return;
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        headerShown: false,
        //tabBarActiveTintColor: 'tomato',
        //tabBarInactiveTintColor: 'gray',
      })}
    >
      <TabNav.Screen name='Tech' component={TechScreen} />
      <TabNav.Screen name='Politics' component={PoliticsScreen} />
      <TabNav.Screen name='Trending' component={HomeScreen} />
      <TabNav.Screen name='Sports' component={SportsScreen} />
      <TabNav.Screen name='Business' component={BusinessScreen} />
    </TabNav.Navigator>
  </NavigationContainer>
)

export default NavStack
