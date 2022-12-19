import React, { memo } from 'react';
import { View, Text, Dimensions, Animated, StyleSheet } from 'react-native';
import CachedImage from './CachedImage';
const TEXT_SPACING = 5;
const { height, width } = Dimensions.get('window');
const ITEM_WIDTH = width * 0.8;
const IMAGE_HEIGHT = 429*(ITEM_WIDTH/762)-1;
const CARD_LEFT = ITEM_WIDTH/8;
const shadowColor = {
  "cnn" : 'red',
  "fox" : 'blue',
};

const ArticleCard = ({item, index, itemHeight, translateY, translateX, opacity, scale}) => {
  return (
    <Animated.View
      style={{
        maxHeight: itemHeight,
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
        transform: [{ translateX }, { translateY }, { scale } ],
        opacity,
        left: CARD_LEFT,

      }}
    >
      <CachedImage
        key={`image-card-${index}`}
        style={{
          width: ITEM_WIDTH,
          height: IMAGE_HEIGHT,
          resizeMode: 'contain',
        }}
        url={item.imageURL}
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

export default ArticleCard
