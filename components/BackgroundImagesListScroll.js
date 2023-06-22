import { memo, useEffect, useState, useRef } from 'react'
import { Dimensions, Animated } from 'react-native'
import CacheImage from './CacheImage'
const { height, width } = Dimensions.get('window')
const ITEM_WIDTH = width * 0.8
const CELL_HEIGHT = height * 0.8 + 70
const PUB_WIDTH = width * 0.2

//const _keyExtractor = (item, index) => `${item.title}${index}`
const _keyExtractor = (item, index) => `${item}${index}`

const BackgroundImagesListScroll = ({ scrollX, compressedImageUris }) => {

  const translateX = scrollX.interpolate({
    inputRange: [0, ITEM_WIDTH],
    outputRange: [0, -width]
  })

  const opacity = scrollX.interpolate({
    inputRange: [0, ITEM_WIDTH],
    outputRange: [1, 0]
  })
  const renderItem = ({ item, index }) => {
    return (
      <CacheImage
        uri={item}
        style={{
          transform: [{ translateX }],
          //transform: [translateXPub !== 0 && translateX === 0 ? { ['translateX']: translateXPub } : translateXPub === 0 && translateX !== 0 ? { translateX } : translateXPub === 0 && translateX === 0 ? { ['translateX']: 0 } : { translateX }],
          //transform: [scrollXPub !== 0 && scrollX === 0 ? { ['translateX']: translateXPub } : { translateX }],
          //transform: [isPubScrolling ? { ['translateX']: translateXPub } : { translateX }],
          //transform: [articleListScrolling ? { translateX } : pubCarouselScrolling ? { ['translateX']: translateXPub } : 0],
          //transform: [articleListScrolling ? { translateX } : { ['translateX']: translateXPub }],
          //opacity,
          width: width,
          height: CELL_HEIGHT,
        }}
        blurRadius={2}
      />
    )
  }
  return (
    <Animated.FlatList
      data={compressedImageUris}
      keyExtractor={_keyExtractor}
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{
        position: 'absolute',
        height: CELL_HEIGHT,
        width: width
      }}
      getItemLayout={(data, index) => (
        { length: width, offset: width * index, index }
      )}
      scrollEnabled={false}
      removeClippedSubviews={false}
      renderItem={renderItem}
    />
  )
}

export default memo(BackgroundImagesListScroll)
