import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import NewsFeed from '../components/NewsFeed'
import { CachedImageDicProvider } from '../data/CachedImageContext';

//basically opposite of filterbycat, checks trends categories are included in
//current locally? saved (starred) categories list (not implemented yet)
function filterForHome(element) {
  //filter out articles and trends that dont
}

const FeedScreen = ({ category, data }) => {
  return (
    <CachedImageDicProvider>
      <View style={{ flex: 1 }}>
        <NewsFeed data={data} />
      </View>
    </CachedImageDicProvider>
  )
};

export default FeedScreen
