import React from 'react'
import { View, Text, SafeAreaView } from 'react-native'
import NewsFeed from '../components/NewsFeed'
import { DATA } from '../data/dummy'

//const screenName = "SportsScreen";

const SportsScreen = () => {
  const [data, setData] = React.useState(DATA);
  return (
    <View style={{flex: 1}}>
      <NewsFeed data={data}/>
      {/*<BottomTabs icons={bottomTabIcons} navigation={navigation} currentScreen={screenName} />*/}
    </View>
  )
}

export default SportsScreen
