import React from 'react'
import { View, Text, Image, Animated, StyleSheet } from 'react-native'

const TEXT_SPACING = 10;

const ArticleCard = ({item, translateX, opacity, scale, cardWidth, cardHeight}) => {
  return (
    <Animated.View
      style={{
        position: 'absolute',
        width: cardWidth,
        //height: ITEM_HEIGHT,
        alignSelf: 'center',
        top: -cardHeight/2.2,
        borderRadius: 10,
        overflow: 'hidden',
        transform: [{ translateX }, { scale }],
        opacity,
        backgroundColor: 'white',
      }}
    >
      <Image
        source={{ uri: item.image_url }}
        style={{ width: cardWidth, height: cardHeight/1.5, resizeMode: 'cover', }}
      />
      <View style={styles.articleTextContainer}>
        <Text style={styles.articleTitleText}>
          {item.title}
        </Text>
        <Text style={styles.articleDateText}>
          {item.date}
        </Text>
        <Text numberOfLines={4} style={styles.articleDescriptionText}>
          {item.description}
        </Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  articleTextContainer: {
    paddingLeft: TEXT_SPACING,
    paddingRight: TEXT_SPACING,
  },
  articleTitleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  articleDateText: {
    fontSize: 16,
    fontStyle: 'italic',
    fontWeight: '800', 
    paddingTop: 5,
  },
  articleDescriptionText: {
    fontSize: 16,
    paddingTop: 5,
    paddingBottom: 10,
  },
});

export default ArticleCard
