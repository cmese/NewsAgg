import { StyleSheet, Platform, StatusBar, Dimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import HomeScreen from './screens/HomeScreen'
const androidWindowHeight = Dimensions.get('window').height;
const deviceHeight = Dimensions.get('screen').height;
const bottomNavHeight = deviceHeight - androidWindowHeight;

export default function App() {
  console.log("bottom nav height: ", bottomNavHeight);
  console.log("window height: ", androidWindowHeight);
  console.log("device height: ", deviceHeight);
  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <HomeScreen />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    //paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    paddingBottom: Platform.OS === 'android' ? bottomNavHeight-StatusBar.currentHeight : 0,
  }
});

