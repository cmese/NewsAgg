//this import is required for @react-navigation/drawer and MUST be at the top of entry file
import 'react-native-gesture-handler';

import React from 'react'
import { StyleSheet, View, Text, Platform, StatusBar, Dimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
//import { SafeAreaProvider } from 'react-native-safe-area-context';
import NavDrawer from './navigation'

//ignores timer warnings from firebase:
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Setting a timer']);
//const androidWindowHeight = Dimensions.get('window').height;
//const deviceHeight = Dimensions.get('screen').height;

export default function App() {
  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <NavDrawer />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
  },
});


// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>This is a test</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

