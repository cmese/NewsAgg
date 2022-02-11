/*import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, Pressable, StyleSheet, TouchableHighlight, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
const { width, height } = Dimensions.get('window');
export const bottomTabsHeight = 60;*/
export const bottomTabIcons = [
  {
    name: "Politics",
    active: "globe",
    inactive: "globe-outline",
  },
  {
    name: "Sports",
    active: "football",
    inactive: "football-outline",
  },
  {
    name: "Trending",
    active: "newspaper",
    inactive: "newspaper-outline",
  },
  {
    name: "Business",
    active: "business",
    inactive: "business-outline",
  },
  {
    name: "Tech",
    active: "game-controller",
    inactive: "game-controller-outline",
  },
]

/*
const NUM_ICONS = bottomTabIcons.length;

const BottomTabs = ({icons, navigation, currentScreen}) => {
  const [activeTab, setActiveTab] = useState(currentScreen)
  console.log("am i here"); 
  const Icon = ({icon}) => (
    <Pressable
      style={({ pressed }) => [{ backgroundColor: pressed ? 'yellow' : 'white' }, styles.btn ]}
      onPress={() => { setActiveTab(currentScreen); navigation.navigate(icon.name); }}>
      <Ionicons
        name={activeTab === icon.name ? icon.active : icon.inactive}
        size={30}
        color={activeTab === icon.name ? "black" : "grey"}
        backgroundColor="white" 
        //onPress={() => { setActiveTab(icon.name) }}
        style={{ alignSelf: 'center' }}
      />
    </Pressable>

  )
  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        {icons.map((icon, index) => (
          <Icon key={index} icon={icon} />
        ))}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    zIndex: 999,
    //flex: 1
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: bottomTabsHeight,
    backgroundColor: 'white',
  },
  btn: {
    width: width/NUM_ICONS,
    justifyContent: 'center',
  },
})

export default BottomTabs
*/
