import React, { memo, useEffect } from 'react';
import { View, Text, Dimensions, Animated, StyleSheet } from 'react-native';
import CacheImage from './CacheImage';
const TEXT_SPACING = 5;
const { height, width } = Dimensions.get('window');
const ITEM_WIDTH = width * 0.8;
const IMAGE_HEIGHT = 429 * (ITEM_WIDTH / 762) - 1;
//const CARD_LEFT = ITEM_WIDTH / 8;
//const VERTICAL_CELL_HEIGHT = height * 0.8;
//const ARTICLE_CARD_HEIGHT = VERTICAL_CELL_HEIGHT * 0.8;
//
//const VISIBLE_ITEMS = 3;
//const NEG_OUTPUT_RANGE = -ITEM_WIDTH * .9;
//const POS_OUTPUT_RANGE = ITEM_WIDTH * .5;
//const OPACITY_OUTPUT_RANGE = 1 - 1 / VISIBLE_ITEMS;
//
//const shadowColor = {
//  "cnn": 'red',
//  "fox": 'blue',
//};

const ArticleCard = ({ style, item, compressedImageUri }) => {
  return (
    <Animated.View style={style}>
      <CacheImage
        style={{
          width: ITEM_WIDTH,
          height: IMAGE_HEIGHT,
          //resizeMode: 'cover',
        }}
        uri={compressedImageUri}
        blurRadius={0}
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
