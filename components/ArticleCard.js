import React from 'react';
import { View, Text, Image, Dimensions, Animated, StyleSheet } from 'react-native';

const TEXT_SPACING = 5;
const { height, width } = Dimensions.get('window');

const shadowColor = {
  "cnn" : 'red',
  "fox" : 'blue',
};
const ArticleCard = ({item, itemWidth, itemHeight, translateY, translateX, opacity, scale}) => {
  return (
    <Animated.View 
      style={{
        minHeight: itemHeight, 
        width: itemWidth, 
        //backgroundColor: 'white',
        borderRadius: 16,
        overflow: 'hidden',
        //shadowColor: 'black',
        shadowColor: shadowColor[item.publisher],
        shadowOpacity: .1,
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowRadius: 4,
        elevation: 15,
        transform: [{ translateX }, { scale } ],
        opacity,
        left: (width-itemWidth)/2, 

      }}
    >
      <View
        style={{
          position: 'absolute',
          height: itemHeight,
        }}
      >
        <Image
          source={{ uri: item.imageURL }}
          style={styles.articleImg}
          //style={{ width: '100%', height: '60%', resizeMode: 'cover', }}
        />
        <View 
          style={styles.textContainer}
          //style={{flexBasis: '60%'}}
        >
          <Text
            adjustsFontSizeToFit
            numberOfLines={2}
            //style={{flexBasis: 30}}
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
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    flexBasis: '40%',
    flexGrow: 1,
  },
  articleImg: {
    width: '100%', 
    resizeMode:'cover',
    margin: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '60%',
  },
  articleTitleText: {
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: 'green',
    flexBasis: '30%',
    textAlign: 'center',
    flexShrink: 1,
    flexGrow: 2,
  },
  articleDateText: {
    fontSize: 20,
    fontStyle: 'italic',
    fontWeight: '800', 
    paddingTop: 5,
    backgroundColor: 'yellow',
    flexBasis: '15%',
    flexShrink: 1,
    flexGrow: 1,
  },
  articleDescriptionText: {
    fontSize: 16,
    paddingTop: 5,
    paddingBottom: 10,
    backgroundColor: 'purple',
    flexBasis: '50%',
    flexGrow: 2,
    flexShrink: 1,
  },
});

export default ArticleCard
