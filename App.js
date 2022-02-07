import { StyleSheet, Platform, StatusBar, SafeAreaView } from 'react-native'
import HomeScreen from './screens/HomeScreen'

export default function App() {
  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <HomeScreen />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  }
});

