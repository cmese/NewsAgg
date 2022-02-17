import React from 'react';
import { StyleSheet, Text, View, Image, FlatList, Animated, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const SPACING = 10;
const ITEM_SIZE = width/7;

const PublisherCarousel = ({articles, scrollX, scrollWidth}) => {
  
  return (
    <Animated.FlatList
      data={articles}
      keyExtractor={(_, index) => String(index)}
      horizontal
      contentContainerStyle={{
        alignItems: 'center',
        backgroundColor: 'pink',
        paddingHorizontal: width/2 - width/7/2,
      }}
      scrollEnabled={false}
      renderItem={({item, index}) => {
        const inputRange = [
          (index - 2) * scrollWidth,
          (index - 1) * scrollWidth,
          index * scrollWidth,
          (index + 1) * scrollWidth,
          (index + 2) * scrollWidth
        ];
        const translateX = scrollX.interpolate({
          inputRange,
          outputRange: [
            (index - 2) * -ITEM_SIZE,
            (index - 1) * -ITEM_SIZE,
            index * -ITEM_SIZE,
            (index + 1) * -ITEM_SIZE,
            (index + 2) * -ITEM_SIZE,
          ]  
        });
        const scale = scrollX.interpolate({
          inputRange,
          outputRange: [0.5, 1, 1.5, 1, 0.5],
          extrapolate: "clamp",
        });
        return (
          //<View style={styles.container}>
          <Animated.View 
            style={{
              width: ITEM_SIZE,
              backgroundColor: 'white',
              borderRadius: 23,
              borderColor: 'black',
              borderWidth: 2,
              overflow: 'visible',
              //marginHorizontal: SPACING
              transform: [
                { translateX },
                { scale }
              ],
            }}
          >
            <View 
              style={{
              marginHorizontal: SPACING,
              backgroundColor: 'yellow',
              alignItems: 'center',
              borderRadius: 39,
              borderWidth: 1,
              borderColor: 'purple'
              }}
            >
              <Text styles={styles.publisherName}>{item.publisher}</Text>
            </View>  
          </Animated.View>
         // <Text>hello</Text>
        );
      }}
    />
  )
}

const styles = StyleSheet.create({
  publisherName: {

  }
});

export default PublisherCarousel
