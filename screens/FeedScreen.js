import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import NewsFeed from '../components/NewsFeed'


//basically opposite of filterbycat, checks trends categories are included in
//current locally? saved (starred) categories list (not implemented yet)
function filterForHome(element) {
  //filter out articles and trends that dont
}

const FeedScreen = ({category, data}) => {
  return (
    <View style={{flex:1}}>
      <NewsFeed data={data}/>
    </View>
  )
};

export default FeedScreen
