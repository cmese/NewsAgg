import React, { useRef, useState } from 'react'
import { StyleSheet, Text, View, Animated, Dimensions } from 'react-native'

const { width } = Dimensions.get('window')
const ITEM_SPACING = 20
const CARD_WIDTH = width * 0.8
const PUB_WIDTH = width * 0.2;
//const ITEM_SIZE = 80
//const ITEM_CENTER = ITEM_SIZE + ITEM_SPACING


//const NEG_OUTPUT_RANGE = -ITEM_SIZE * .9;
//const POS_OUTPUT_RANGE = ITEM_SIZE * .9;

//const HORZ_PADDING = width / 2 - width / 7 / 2

const _keyExtractor = (item, index) => `${item}${index}`

const PublisherCarousel = ({ publishers, scrollX, scrollWidth }) => {

  const pubCarouselWidth = PUB_WIDTH * publishers.length

  const translateX = scrollX.interpolate({
    inputRange: [0, width],
    outputRange: [0, -PUB_WIDTH * 2 + ITEM_SPACING / 2]
    //extrapolate: 'clamp'
  })
  //  const translateX = scrollX.interpolate({
  //    inputRange: [-1, 0, 1],
  //    outputRange: [
  //      ITEM_CENTER,
  //      0,
  //      -ITEM_CENTER
  //    ],
  //    extrapolate: 'clamp'
  //  })

  const renderItem = ({ item, index }) => {
    return (
      <Animated.View
        //style={{ width: ITEM_SIZE, height: ITEM_SIZE, transform: [{ translateX }], backgroundColor: 'green', marginHorizontal: 0 }}
        style={{
          transform: [{ translateX }],
          //left: width / 2 - PUB_WIDTH / 2,
          backgroundColor: 'pink',
          padding: ITEM_SPACING

        }}
      >
        <Text style={styles.publisherName}>{item}</Text>
      </Animated.View>
    )
  }
  return (
    <View style={styles.container}>
      <Animated.FlatList
        data={publishers}
        keyExtractor={_keyExtractor}
        horizontal
        contentContainerStyle={[styles.contentContainer]}
        scrollEnabled={false}
        //onLayout={onFlatListLayout}
        renderItem={renderItem}
      // style={{
      //   transform: [{ translateX: translateX }],
      //   backgroundColor: 'green'
      // }}
      />
    </View >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'orange',
    //overflow: 'visible',
    //alignItems: 'center'
  },
  contentContainer: {
    alignItems: 'center',
    backgroundColor: 'pink',
    paddingLeft: (width / 2) - (PUB_WIDTH / 2) - ITEM_SPACING,
  },
  publisherName: {
    width: PUB_WIDTH,
    height: PUB_WIDTH,
    borderRadius: PUB_WIDTH / 2,
    backgroundColor: 'yellow',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 20
  }
});

export default PublisherCarousel
