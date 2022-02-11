import { StyleSheet, Platform, StatusBar, Dimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import HomeScreen from './screens/HomeScreen'
import NavStack from './navigation'

const androidWindowHeight = Dimensions.get('window').height;
const deviceHeight = Dimensions.get('screen').height;
const bottomNavHeight = deviceHeight - androidWindowHeight;
//const verticalListItemHeight = deviceHeight - (bottomNavHeight*2) - StatusBar.currenntHeight - 70; 


export default function App() {
  console.log("bottom nav height: ", bottomNavHeight);
  console.log("window height: ", androidWindowHeight);
  console.log("device height: ", deviceHeight);
  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <NavStack/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    //paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    //paddingBottom: Platform.OS === 'android' ? bottomNavHeight-StatusBar.currentHeight : 0,
  }
});

