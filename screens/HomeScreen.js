import React from 'react'
import { View, Text, SafeAreaView } from 'react-native'
import NewsFeed from '../components/NewsFeed'
import { DATA } from '../data/dummy'
import BottomTabs, { bottomTabIcons } from '../components/BottomTabs'

const HomeScreen = () => {
  const [data, setData] = React.useState(DATA);
  return (
    <View>
      <NewsFeed data={data}/>
      <BottomTabs icons={bottomTabIcons} />
    </View>
  )
}

export default HomeScreen
