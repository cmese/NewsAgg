import React from 'react'
import { View, Text, SafeAreaView } from 'react-native'
import NewsFeed from '../components/NewsFeed'
import { DATA } from '../data/dummy'

const HomeScreen = () => {
  const [data, setData] = React.useState(DATA);
  return (
    <NewsFeed data={data}/>
  )
}

export default HomeScreen
