import React from 'react'
import { StyleSheet, View, Text, Platform, StatusBar, Dimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import NavStack from './navigation'
import { getRecentTrends } from './data/dummy'

const androidWindowHeight = Dimensions.get('window').height;
const deviceHeight = Dimensions.get('screen').height;
const bottomNavHeight = deviceHeight - androidWindowHeight;
//const verticalListItemHeight = deviceHeight - (bottomNavHeight*2) - StatusBar.currenntHeight - 70; 

//TODO: Add animation / seperate this
const Loading = () => (
  <View style={styles.loadingContainer}>
    <Text style={styles.paragraph}>Loading...</Text>
  </View>
);

export default function App() {
  //console.log("bottom nav height: ", bottomNavHeight);
  //console.log("window height: ", androidWindowHeight);
  //console.log("device height: ", deviceHeight);
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    const fetchData = async () => {
      const data = await getRecentTrends();
      setData(data);
    }; // might want to add empty items in each of data's article arrays to create fake space

    if (data.length === 0) {
      fetchData(data);
    }
  }, [data]);
  
  if (data.length === 0) {
    return <Loading />;  
  }
  console.log("yooooooooo");

  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <NavStack data={data} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    //paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    //paddingBottom: Platform.OS === 'android' ? bottomNavHeight-StatusBar.currentHeight : 0,
  },
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

