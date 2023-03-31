import { useRef, memo, useContext, useEffect, useState } from 'react'
import { Dimensions, View, StyleSheet, FlatList, Animated } from 'react-native'
import { CachedImageDicContext } from '../data/CachedImageContext'
import CompressImage from '../hooks/CompressImage'
import CacheImage from './CacheImage'
import * as Crypto from 'expo-crypto'
const { height, width } = Dimensions.get('window')
const ITEM_WIDTH = width * 0.8
const CELL_HEIGHT = height * 0.8

//const _keyExtractor = (item, index) => `${item.title}${index}`
const _keyExtractor = (item, index) => `${item}${index}`

//check / update global cache dic here in renderItem 
//function BackgroundImagesListScroll(articles, scrollX) {
//function BackgroundImagesListScroll(props) {
const BackgroundImagesListScroll = ({ scrollX, compressedImageUris }) => {
  //const { cacheDic, updateDic } = useContext(CachedImageDicContext)
  //const [imageUris, setImageUris] = useState([])

  /*
  useEffect(() => {
    const handleUpdateDictionary = async () => {
      const urls = await Promise.all(articles.map(async (item) => {
        const imageKey = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, item.imageURL)
        if (cacheDic[imageKey]) {
          console.log("inside")
          return cacheDic[imageKey]
        } else {
          console.log("Gotta Fetch Background......")
          const imageUri = await CompressImage(item.imageURL)
          updateDic(imageKey, imageUri)
          return imageUri
        }
      }))
      setImageUris(urls)
    }
    handleUpdateDictionary()
  }, []) //articles?
  */

  const renderItem = ({ item, index }) => {
    //console.log(`${index}: ${item.title} BackgroundImage rendered.....`)
    const translateX = scrollX.interpolate({
      inputRange: [0, ITEM_WIDTH],
      outputRange: [0, -width]
    })
    const opacity = scrollX.interpolate({
      inputRange: [0, ITEM_WIDTH],
      outputRange: [1, 0]
    })
    return (
      <CacheImage
        key={`image-feed-${index}`}
        //uri={compressedImageUris[index]} //change this to uri, item.imageurl should be a prop to handleupdatedic
        uri={item}
        //name={item.title}
        //index={index}
        style={{
          transform: [{ translateX }],
          //opacity,
          width: width,
          height: CELL_HEIGHT,
        }}
        blurRadius={0}
      />
    )
  }
  return (
    <Animated.FlatList
      data={compressedImageUris}
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
