import React from 'react'
import { View, Text, Image, Animated, StyleSheet } from 'react-native'

const TEXT_SPACING = 5;

const ArticleCard = ({item, translateY, translateX, opacity, scale, cardWidth, cardHeight, maxHeight}) => {
  return (
    <Animated.View
      style={{
        position: 'absolute',
        width: '90%',
        height: cardHeight,
        //minHeight: cardHeight,
        //maxHeight: cardHeight*1.1,
        maxHeight: maxHeight,
        alignSelf: 'center',
        //top: -cardHeight/2.2,
        borderRadius: 10,
        overflow: 'hidden',
        transform: [{ translateY }, { translateX }, { scale }],
        opacity,
        backgroundColor: 'white',
        //paddingBottom: 30,
        //flex: 1,
      }}
    >
      <Image
        source={{ uri: item.image_url }}
        style={styles.articleImg}
        //style={{ width: '100%', height: '60%', resizeMode: 'cover', }}
      />
      <View style={styles.articleTextContainer}>
        <Text 
          numberOfLines={2}
          style={styles.articleTitleText}
        >
          {item.title}
        </Text>
        <Text style={styles.articleDateText}>
          {item.date}
        </Text>
        <Text
          numberOfLines={4}
          style={styles.articleDescriptionText}
        >
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
    backgroundColor: 'pink',
    //height: '100%',
    //flex: 1,
    //flexDirection: 'column',
  },
  articleImg: {
    flexGrow: 1,
    resizeMode: 'cover',
    flexDirection: 'row',
  },
  articleTitleText: {
    fontSize: 25,
    fontWeight: 'bold',
    flexShrink: 1,
    backgroundColor: 'green'
  },
  articleDateText: {
    fontSize: 16,
    fontStyle: 'italic',
    fontWeight: '800', 
    paddingTop: 5,
    flexShrink: 1,
    backgroundColor: 'yellow'
  },
  articleDescriptionText: {
    fontSize: 16,
    paddingTop: 5,
    paddingBottom: 10,
    flexShrink: 2,
    backgroundColor: 'purple',
  },
});

export default ArticleCard
