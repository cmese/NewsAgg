import React from 'react'
import { View } from 'react-native'
import NewsFeed from '../components/NewsFeed'
import { DATA } from '../data/dummy'

const PoliticsScreen = () => {
  const [data, setData] = React.useState(DATA);
  return (
    <View style={{flex:1}}>
      <NewsFeed data={data}/>
    </View>
  )
}

export default PoliticsScreen
