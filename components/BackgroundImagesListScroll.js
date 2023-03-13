import { useRef, memo } from 'react'
import { Dimensions, View, StyleSheet, FlatList, Animated } from 'react-native'
import CachedImage from './CachedImage'
const { height, width } = Dimensions.get('window')
const ITEM_WIDTH = width * 0.8
const CELL_HEIGHT = height * 0.8

const _keyExtractor = (item, index) => `${item.title}${index}`

const BackgroundImagesListScroll = ({ articles, scrollX }) => {
  const renderItem = ({ item, index }) => {
    console.log(`${index}: ${item.title} BackgroundImage rendered.....`)
    const translateX = scrollX.interpolate({
      inputRange: [0, ITEM_WIDTH],
      outputRange: [0, -width]
    })
    const opacity = scrollX.interpolate({
      inputRange: [0, ITEM_WIDTH],
      outputRange: [1, 0]
    })
    return (
      <CachedImage
        key={`image-feed-${index}`}
        url={item.imageURL}
        name={item.title}
        index={index}
        style={{
          transform: [{ translateX }],
          //opacity,
          width: width,
          height: CELL_HEIGHT,
        }}
      />
    )
  }
  return (
    <Animated.FlatList
      data={articles}
      keyExtractor={_keyExtractor}
      horizontal
      style={{
        position: 'absolute',
        borderWidth: 10,
        borderColor: 'black',
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

//const BackgroundImagesListScroll = ({articles, scrollX}) => {
//  console.log("BackgroundImagesListScroll RENDERED")
//  return (
//    <>
//      {articles.map((article, index) => {
//        const opacity = scrollX.interpolate({
//          inputRange : [
//            (index - 1) * ITEM_WIDTH,
//            index * ITEM_WIDTH,
//            (index + 1) * ITEM_WIDTH
//          ],
//            outputRange: [0, 1, 0]
//        })
//        return <CachedImage
//          key={`image-feed-${index}`}
//          url={ article.imageURL}
//          style={[
//            StyleSheet.absoluteFillObject,
//            {
//            //translateX,
//            opacity,
//            //tried these instead of absolutefillobject above
//            //width: width,
//            //height: height,
//            //position: 'absolute'
//            }
//          ]}
//          //blurRadius={5}
//          />
//        })
//      }
//    </>
//  )
//}

export default memo(BackgroundImagesListScroll)
