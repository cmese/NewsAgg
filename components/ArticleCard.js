import React, { memo, useEffect, useState, useContext } from 'react';
import { View, Text, Dimensions, Animated, StyleSheet } from 'react-native';
import CacheImage from './CacheImage';
import { CachedImageDicContext } from '../data/CachedImageContext'
import CompressImage from '../hooks/CompressImage'
import * as Crypto from 'expo-crypto'
const TEXT_SPACING = 5;
const { height, width } = Dimensions.get('window');
const ITEM_WIDTH = width * 0.8;
const IMAGE_HEIGHT = 429 * (ITEM_WIDTH / 762) - 1;
const CARD_LEFT = ITEM_WIDTH / 8;
const VERTICAL_CELL_HEIGHT = height * 0.8;
const ARTICLE_CARD_HEIGHT = VERTICAL_CELL_HEIGHT * 0.8;

const VISIBLE_ITEMS = 3;
const NEG_OUTPUT_RANGE = -ITEM_WIDTH * .9;
const POS_OUTPUT_RANGE = ITEM_WIDTH * .5;
const OPACITY_OUTPUT_RANGE = 1 - 1 / VISIBLE_ITEMS;

const shadowColor = {
  "cnn": 'red',
  "fox": 'blue',
};

//function ArticleCard(item, index, scrollX) {
//function ArticleCard(props) {
const ArticleCard = ({ item, index, scrollX, compressedImageUri }) => {
  /*
  const { cacheDic, updateDic } = useContext(CachedImageDicContext)
  const [imageUri, setImageUri] = useState(null)

  useEffect(() => {
    const handleUpdateDictionary = async () => {
      const imageKey = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, item.imageURL)
      if (cacheDic[imageKey]) {
        console.log("inside")
        setImageUri(cacheDic[imageKey])
        //return cacheDic[imageKey]
      } else {
        console.log("Gotta Fetch Article Image......")
        const imageUri = await CompressImage(item.imageURL)
        updateDic(imageKey, imageUri)
        setImageUri(imageUri)
        //return value
      }
    }
    handleUpdateDictionary()
  }, []) //item? 
  */

  const inputRange = [
    (index - 1) * ITEM_WIDTH, //item behind (right)
    index * ITEM_WIDTH, //current item
    (index + 1) * ITEM_WIDTH, //item front (left)
  ];
  const translateY = scrollX.interpolate({
    inputRange,
    outputRange: [-25, 0, 25],
  });
  const translateX = scrollX.interpolate({
    inputRange,
    //outputRange: [-50, 0, 10]
    outputRange: [NEG_OUTPUT_RANGE, 0, POS_OUTPUT_RANGE],
  });
  const opacity = scrollX.interpolate({
    inputRange,
    outputRange: [OPACITY_OUTPUT_RANGE, 1, 0],
  });
  const scale = scrollX.interpolate({
    inputRange,
    outputRange: [.95, 1, 1.5],
    //extrapolate: 'clamp'
  });
  //console.log('Article Card Rendered')
  return (
    <Animated.View
      style={{
        maxHeight: ARTICLE_CARD_HEIGHT,
        width: ITEM_WIDTH,
        overflow: 'hidden',
        backgroundColor: 'white',
        borderRadius: 16,
        borderColor: shadowColor[item.publisher],
        borderWidth: 1,
        shadowColor: shadowColor[item.publisher],
        shadowOpacity: .1,
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowRadius: 4,
        elevation: 15,
        transform: [{ translateX }, { translateY }, { scale }],
        opacity,
        left: CARD_LEFT,

      }}
    >
      <CacheImage
        key={`image-card-${index}`}
        style={{
          width: ITEM_WIDTH,
          height: IMAGE_HEIGHT,
          //resizeMode: 'cover',
        }}
        //uri={item.imageURL}
        uri={compressedImageUri}
        blurRadius={0}
      //name={item.title}
      //index={index}
      />
      <View
        style={styles.textContainer}
      >
        <Text
          numberOfLines={3}
          style={styles.articleTitleText}
        >
          {item.title}
        </Text>
        <Text
          adjustsFontSizeToFit
          style={styles.articleDateText}>
          {item.date}
        </Text>
        <Text
          //numberOfLines={4}
          adjustsFontSizeToFit
          style={styles.articleDescriptionText}
        >
          {item.description}
        </Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    //flexGrow: 1,
    paddingLeft: 10,
    paddingRight: 10,
    //margin: 10,
  },
  articleTitleText: {
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: 'white',
    textAlign: 'left',
  },
  articleDateText: {
    fontSize: 20,
    fontStyle: 'italic',
    //fontWeight: '800',
    paddingTop: 5,
    color: 'grey',
    textAlign: 'left'
  },
  articleDescriptionText: {
    fontSize: 16,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: 'white',
  },
});

export default memo(ArticleCard)
