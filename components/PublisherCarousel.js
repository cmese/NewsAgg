import React, { useRef, useState, useCallback, useEffect, memo } from 'react'
import { StyleSheet, Text, View, Animated, Dimensions, Image } from 'react-native'
import CacheImage from './CacheImage'

const { height, width } = Dimensions.get('window')
const ITEM_SPACING = 20
const CARD_WIDTH = width * 0.8
const PUB_WIDTH = width * 0.2;
const EMPTY_PUB_WIDTH = PUB_WIDTH * 0.2
const VERTICAL_CELL_HEIGHT = height * 0.8;
const MIN_CELL_HEIGHT = VERTICAL_CELL_HEIGHT * .10;


const _keyExtractor = (item, index) => `${item}${index}`

const PublisherCarousel = ({ publishers, scrollX }) => {


  const renderItem = ({ item, index }) => {

    const translateX = scrollX.interpolate({
      inputRange: [0, CARD_WIDTH],
      outputRange: [0, -PUB_WIDTH],
      //extrapolate: 'clamp'
    })

    const inputRangeScale = [
      (index - 2) * CARD_WIDTH, //item behind (right)
      (index - 1) * CARD_WIDTH, //item behind (right)
      index * CARD_WIDTH, //current item
      (index + 1) * CARD_WIDTH, //item front (left)
      (index + 2) * CARD_WIDTH, //item front (left)
    ];
    const scale = scrollX.interpolate({
      inputRange: inputRangeScale,
      outputRange: [.6, .7, 1.1, .7, .6],
      extrapolate: 'clamp'
    })
    if (item.key === 'empty-right') {
      return <View style={{ width: PUB_WIDTH }} />
    }
    return (
      <View>
        <Animated.Image 
          source={item} 
          style={{ 
            transform: [{translateX}, {scale}], 
            height: MIN_CELL_HEIGHT,
            width: PUB_WIDTH,
          }}
        />
      </View>
        /*<Text style={styles.publisherName}>{item}</Text>*/
    )
  }
  return (
    <View style={styles.container}>
      <Animated.FlatList
        data={publishers}
        keyExtractor={_keyExtractor}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[styles.contentContainer]}
        removeClippedSubviews={false}
        renderItem={renderItem}
        //pagingEnabled={true}
        getItemLayout={(data, index) => (
          { length: PUB_WIDTH, offset: PUB_WIDTH * index, index }
        )}
        scrollEnabled={false}
      />
    </View >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    maxHeight: MIN_CELL_HEIGHT,
    position: 'relative',
    bottom: 50
  },
  contentContainer: {
    alignItems: 'center',
    paddingLeft: (width / 2) - (PUB_WIDTH / 2),
  },
  publisherImageContainer: {
    
  }
  /*publisherName: {
    width: PUB_WIDTH,
    height: PUB_WIDTH,
    borderColor: 'green',
    borderWidth: 5,
    //borderRadius: PUB_WIDTH / 2,
    backgroundColor: 'yellow',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 20
  }*/
});

export default memo(PublisherCarousel)
