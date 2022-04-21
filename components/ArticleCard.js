import React from 'react';
import { View, Text, Image, Dimensions, Animated, StyleSheet } from 'react-native';

const TEXT_SPACING = 5;
const { height, width } = Dimensions.get('window');

const ArticleCard = ({item, itemWidth, itemHeight, translateY, translateX, opacity, scale}) => {
  return (
    <Animated.View 
      style={{
        minHeight: itemHeight, 
        width: itemWidth, 
        marginBottom: 10, 
        //backgroundColor: 'white',
        borderWidth: 2,
        transform: [{ translateX }, { scale } ],
        opacity,
        //position: 'absolute',
        left: (width-itemWidth)/2, 

      }}
    >
      <View
        style={{
          position: 'absolute',
          alignItems: 'center',
          maxHeight: itemHeight,
          minHeight: itemHeight,
          flexGrow: 1,
          //top: -cardHeight/2.2,
          borderRadius: 10,
          overflow: 'hidden',
          //transform: [{ translateX }, { scale } ],
          //transform: [{ translateY }, { translateX }, { scale } ],
          //opacity,
          backgroundColor: 'pink',
          marginHorizontal: TEXT_SPACING,
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
    //flexShrink: 1,
    //flex: 1,
    //height: '100%',
    //flexGrow: 3,
    //flexDirection: 'column',
  },
  articleImg: {
    width: '100%', 
    //height: '60%',
    //height: ITEM_WIDTH/1.5,
    resizeMode:'cover',
    margin: 0,
    marginBottom: 10,
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
    //maxHeight: 20,
    flexShrink: 1,
    flexGrow: 1,
  },
  articleDescriptionText: {
    fontSize: 16,
    paddingTop: 5,
    paddingBottom: 10,
    backgroundColor: 'purple',
    //flexDirection: 'row',
    flexBasis: '50%',
    flexGrow: 2,
    flexShrink: 1,
    //flexGrow: 1
  },
});

export default ArticleCard
