import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
  useDrawerProgress,
} from '@react-navigation/drawer';
import Animated from 'react-native-reanimated';
import { DrawerData } from './data/DrawerData';
import FeedScreen from './screens/FeedScreen';

const Feed = ({ route }) => {
  return (
      <FeedScreen category={route.params?.name}/>
  );
}

//this is for adding a search bar and changing the order of the list later
const CustomDrawerContent = (props) => {
  const progress = useDrawerProgress();

  const translateX = Animated.interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [-100, 0],
  });

  return (
    <DrawerContentScrollView {...props}>
      <Animated.View style={{ transform: [{ translateX }] }}>
    {/*<DrawerItem placeholder for quick search /> */}
        <DrawerItemList {...props} />
    {/*<DrawerItem label="Help" onPress={() => alert('Link to help')} /> */}
      </Animated.View>
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();

const NavDrawer = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        useLegacyImplementation
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          activeTintColor: '#79c0ff'
        }}
      >
        {
          DrawerData.map( drawerItem =>
            <Drawer.Screen
              key={drawerItem.name}
              name={drawerItem.name}
              options={{
                drawerIcon: ({focused}) => {
                  var IconTypeTag = drawerItem.iconType;
                  return (
                    <IconTypeTag
                      name={drawerItem.iconName}
                      size={20}
                      color={focused ? "#0000c1" : "black"}
                    />
                  )
                }
              }}
              component={Feed}
            /*
                drawerItem.iconType==='WHATEVER' ?
                  <WhateverIcons
                    name={drawerItem.iconName}
                    size={20}
                    color={focused ? "#0000c1" : "black"}
                  />
                :
                drawerItem.iconType==='OTHER' ?
                  <OtherIcons
                    name={drawerItem.iconName}
                    size{20}
                    color={focused ? "#0000c1" : "black"}
                  />
                  */
            />
          )
        }
    {/*<Drawer.Screen name="Article" component={Article} />*/}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default NavDrawer



//import React from 'react';
//import { createStackNavigator } from '@react-navigation/stack';
//import { createBottomTabNavigator, useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
//import { NavigationContainer } from '@react-navigation/native';
//import HomeScreen from './screens/HomeScreen';
//import SportsScreen from './screens/SportsScreen';
//import TechScreen from './screens/TechScreen';
//import PoliticsScreen from './screens/PoliticsScreen';
//import BusinessScreen from './screens/BusinessScreen';

//import { bottomTabIcons } from './data/BottomTabIcons';
//import { Ionicons } from '@expo/vector-icons';
//const Stack = createStackNavigator();

//export const BottomTabBarHeight = useBottomTabBarHeight();
//const TabNav = createBottomTabNavigator();
/*
const screenOptions = {
  headerShown: false,
}*/

/*
const NavStack = ({data}) => (
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
      <TabNav.Screen name='Trending' component={() => <HomeScreen data={data} />} />
      <TabNav.Screen name='Sports' component={SportsScreen} />
      <TabNav.Screen name='Business' component={BusinessScreen} />
    </TabNav.Navigator>
  </NavigationContainer>
)

export default NavStack
*/
