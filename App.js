import 'react-native-gesture-handler';
import React from 'react'
import { StyleSheet, View, Text, Platform, StatusBar, Dimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import NavDrawer from './navigation'

//ignores timer warnings from firebase:
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Setting a timer']);
//const androidWindowHeight = Dimensions.get('window').height;
//const deviceHeight = Dimensions.get('screen').height;

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

