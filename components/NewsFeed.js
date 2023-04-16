import React, { useEffect } from 'react';
import { StyleSheet, View, Dimensions, Animated } from 'react-native';
import AnimatedHeader from './AnimatedHeader';
import HorizontalArticleList from './HorizontalArticleList';
const { height } = Dimensions.get('window');
const VERTICAL_CELL_HEIGHT = height * 0.8;

const _keyExtractor = (item, index) => `${item.name}${index}`;

const NewsFeed = ({ data }) => {
  const scrollYAnimated = React.useRef(new Animated.Value(0)).current;
  console.log("*************NEWSFEED rendered****************")
  console.log(data.length)

  return (
    <View>
      <AnimatedHeader
        scrollY={scrollYAnimated}
        //data={data.slice(15, 16)}
        data={data}
        verticalScrollDistance={VERTICAL_CELL_HEIGHT}
      />
      <Animated.FlatList
        //data={data.slice(15, 16)}
        data={data}
        keyExtractor={_keyExtractor}
        showsVerticalScrollIndicator={false}
        snapToInterval={VERTICAL_CELL_HEIGHT}
        //maxToRenderPerBatch={5}
        windowSize={5}
        removeClippedSubviews={true}
        initialNumToRender={5}
        snapToAlignment={'start'}
        decelerationRate={'fast'}
        getItemLayout={(data, index) => (
          { length: VERTICAL_CELL_HEIGHT, offset: VERTICAL_CELL_HEIGHT * index, index }
        )}
        contentContainerStyle={{
          paddingBottom: 70,
        }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollYAnimated } } }],
          {
            useNativeDriver: true
          }
        )}
        renderItem={renderHorizontalListItem}
      />
    </View>
  )
}

const renderHorizontalListItem = ({ item, index }) => {
  //console.log(`${index}: ${item.name} LIST RENDERED.....NUM_Articles: ${item.articles.length}`)
  return <HorizontalArticleList item={item} />
}

export default NewsFeed
