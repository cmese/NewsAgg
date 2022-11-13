import React from 'react';
import { StyleSheet, Text, View, Image, FlatList, Animated, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const SPACING = 10;
const ITEM_SIZE = width/7;
const HORZ_PADDING = width/2 - width/7/2;

const PublisherCarousel = ({articles, scrollX, scrollWidth}) => {
  return (
    <Animated.FlatList
      data={articles}
      keyExtractor={(_, index) => String(index)}
      horizontal
      contentContainerStyle={{
        alignItems: 'center',
        //backgroundColor: 'pink',
        paddingHorizontal: HORZ_PADDING,
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
          <Animated.View
            style={{
              width: ITEM_SIZE,
              borderRadius: 23,
              borderColor: 'black',
              overflow: 'visible',
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
