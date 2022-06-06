import 'react-native-gesture-handler';
import React from 'react'
import { StyleSheet, View, Text, Platform, StatusBar, Dimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import NavDrawer from './navigation'

//const androidWindowHeight = Dimensions.get('window').height;
//const deviceHeight = Dimensions.get('screen').height;


//TODO: Move data fetch to a custom hook
export default function App() {
  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <NavDrawer/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
  },
});

