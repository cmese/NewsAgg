import React, { useRef, useState, useCallback, useEffect, memo } from 'react'
import { StyleSheet, Text, View, Animated, Dimensions } from 'react-native'

const { height, width } = Dimensions.get('window')
const ITEM_SPACING = 20
const CARD_WIDTH = width * 0.8
const PUB_WIDTH = width * 0.2;
const EMPTY_PUB_WIDTH = PUB_WIDTH * 0.2
const VERTICAL_CELL_HEIGHT = height * 0.8;
const MIN_CELL_HEIGHT = VERTICAL_CELL_HEIGHT * .10;

const _keyExtractor = (item, index) => `${item}${index}`

const PublisherCarousel = ({ publishers, scrollX, scrollXPub, pubScrolling, articlesScrolling }) => {

  useEffect(() => { //try putting translateX in here? 
    const listenerId = scrollXPub.addListener(() => {
      //console.log('Current content offset:', scrollXPub.__getValue());
      if (scrollXPub.__getValue() !== 0) {
        pubScrolling.current = true
        articlesScrolling.current = false
      }
    });

    return () => {
      scrollXPub.removeListener(listenerId);
      //pubScrolling.current = false
    };
  }, [scrollXPub]);

  const renderItem = ({ item, index }) => {

    const randomFunc = () => {
      console.log("hello")
      articlesScrolling.setValue(false)
      pubScrolling.setValue(true)
    }
    const translateX = scrollX.interpolate({
      inputRange: [0, CARD_WIDTH],
      outputRange: [0, -PUB_WIDTH],
      //extrapolate: 'clamp'
    })
    const translateX2 = scrollXPub.interpolate({
      inputRange: [0, width],
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
    const inputRangeScale2 = [
      (index - 2) * PUB_WIDTH, //item behind (right)
      (index - 1) * PUB_WIDTH, //item behind (right)
      index * PUB_WIDTH, //current item
      (index + 1) * PUB_WIDTH, //item front (left)
      (index + 2) * PUB_WIDTH, //item front (left)
    ];
    const scale = scrollX.interpolate({
      inputRange: inputRangeScale,
      outputRange: [.6, .7, 1.1, .7, .6],
      extrapolate: 'clamp'
    })
    const scale2 = scrollXPub.interpolate({
      inputRange: inputRangeScale2,
      outputRange: [.6, .7, 1.1, .7, .6],
      extrapolate: 'clamp'
    })
    if (item.key === 'empty-right') {
      return <View style={{ width: PUB_WIDTH }} />
    }
    return (
      <Animated.View
        style={{
          //transform: [translateX2 !== 0 && translateX === 0 ? { ['translateX']: translateX2 } : translateX2 === 0 && translateX !== 0 ? { translateX } : {translateX}, scale2 !== 0 && scale === 0 ? { ['scale']: scale2 } : { scale }]
          //transform: [scrollXPub !== 0 && scrollX === 0 ? { ['translateX']: translateX2 } : { translateX }]//, scale2 !== 0 && scale === 0 ? { ['scale']: scale2 } : { scale }]
          //transform: [pubScrolling.current !== 0 ? { ['translateX']: translateX2 } : { translateX }]//, scale2 !== 0 && scale === 0 ? { ['scale']: scale2 } : { scale }]
          transform: [{ translateX }]
        }}
      >
        <Text style={styles.publisherName}>{item}</Text>
      </Animated.View >
    )
  }
  return (
    <View style={styles.container}>
      <Animated.FlatList
        data={publishers}
        keyExtractor={_keyExtractor}
        horizontal
        contentContainerStyle={[styles.contentContainer]}
        removeClippedSubviews={false}
        renderItem={renderItem}
        //pagingEnabled={true}
        getItemLayout={(data, index) => (
          { length: PUB_WIDTH, offset: PUB_WIDTH * index, index }
        )}
        //scrollEnabled={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollXPub } } }],
          {
            useNativeDriver: true
          },
        )}
      />
    </View >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    maxHeight: MIN_CELL_HEIGHT,
    //alignItems: 'center'
  },
  contentContainer: {
    alignItems: 'center',
    backgroundColor: 'pink',
    paddingLeft: (width / 2) - (PUB_WIDTH / 2),
  },
  publisherName: {
    width: PUB_WIDTH,
    height: PUB_WIDTH,
    borderColor: 'green',
    borderWidth: 5,
    //borderRadius: PUB_WIDTH / 2,
    backgroundColor: 'yellow',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 20
  }
});

export default memo(PublisherCarousel)
