import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import NewsFeed from '../components/NewsFeed'
import dataHook from '../data/dataHook'

const Loading = () => (
  <View style={styles.loadingContainer}>
    <Text style={styles.paragraph}>Loading...</Text>
  </View>
);

const FeedScreen = ({category}) => {
  const data = dataHook();
  if (data.length === 0) {
    return <Loading />;
  }
  return (
    <View style={{flex:1}}>
      <NewsFeed data={data} category={category}/>
    </View>
  )
};

const styles = StyleSheet.create({
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

export default FeedScreen
