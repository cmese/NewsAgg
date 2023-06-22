import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
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
import useFetchData from './data/useFetchData'
import { Entypo } from '@expo/vector-icons';

const Loading = () => (
  <View style={styles.loadingContainer}>
    <Text style={styles.paragraph}>Loading...</Text>
  </View>
);

const FeedCategoryFilter = ({ route }) => {
  const { data, isLoading, error } = useFetchData();
  if (isLoading) {
    return <Loading />
  }

  if (error) {
    console.log(error.message)
    return <View><Text>Error: {error.message}</Text></View>
  }
  //if (data.length === 0) {
  //  return <Loading />;
  //}
  const { category } = route.params;

  //filter by trend categories
  const filteredData = (category === "Home") ? data : data.filter((item) => item.categories.includes(category))

  //filter by article categories - same result as above
  /*const filteredData = (category === "Home") ? data :
    data.filter( trend => {
      const filteredArticles = trend.articles.filter((item) => item.categories.includes(category))
      return filteredArticles.length > 0;
    });
  */
  return (
    <FeedScreen data={filteredData} />
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
          DrawerData.map(drawerItem =>
            <Drawer.Screen
              key={drawerItem.name}
              name={drawerItem.name}
              initialParams={{ category: drawerItem.name }}
              options={{
                headerStyle: {
                  //borderRadius: 300,
                  height: 45,
                },
                headerTitleAlign: 'center',
                headerRight: () => (
                  <Entypo
                    name={"dots-three-vertical"}
                    size={20}
                    color={"black"}
                    onPress={() => alert('Settings')}
                    style={{
                      marginRight: 20,
                    }}
                  />
                ),
                drawerIcon: ({ focused }) => {
                  var IconTypeTag = drawerItem.iconType;
                  return (
                    <IconTypeTag
                      name={drawerItem.iconName}
                      size={26}
                      color={focused ? "#0000c1" : "black"}
                    />
                  )
                }
              }}
              component={FeedCategoryFilter}
            />
          )
        }
        {/*<Drawer.Screen name="Article" component={Article} />*/}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});

export default NavDrawer
