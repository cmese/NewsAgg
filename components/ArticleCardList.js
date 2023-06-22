import React, { memo, useEffect, useState, useCallback } from 'react'
import { View, Dimensions, Animated } from 'react-native'
import ArticleCard from './ArticleCard'
const { height, width } = Dimensions.get('window')
const EMPTY_ITEM_SIZE = width * .2
const PUB_WIDTH = width * 0.2
const ITEM_WIDTH = width * 0.8;
const CARD_LEFT = ITEM_WIDTH / 8;
const VERTICAL_CELL_HEIGHT = height * 0.8;
const ARTICLE_CARD_HEIGHT = VERTICAL_CELL_HEIGHT * 0.8;

const VISIBLE_ITEMS = 3;
const NEG_OUTPUT_RANGE = -ITEM_WIDTH * .9;
const POS_OUTPUT_RANGE = ITEM_WIDTH * .5;
const OPACITY_OUTPUT_RANGE = 1 - 1 / VISIBLE_ITEMS;

const _keyExtractor = (item, index) => `${item.title}${index}`

const shadowColor = {
  "cnn": 'red',
  "fox": 'blue',
};

const ArticleCardList = ({ scrollX, articles, compressedImageUris }) => {

  const renderItem = ({ item, index }) => {
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

    if (item.key === 'empty-right') {
      return <View style={{ width: EMPTY_ITEM_SIZE }} />
    }
    return (
      <ArticleCard
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
        item={item}
        compressedImageUri={compressedImageUris[index]}
      />
    )
  }

  return (
    <Animated.FlatList
      data={[...articles, { key: 'empty-right' }]}
      keyExtractor={_keyExtractor}
      horizontal
      showsHorizontalScrollIndicator={false}
      //maxToRenderPerBatch={3}
      snapToInterval={ITEM_WIDTH}
      snapToAlignment={'start'} //what about deceleratonRate?
      removeClippedSubviews={false}
      contentContainerStyle={{
        alignItems: 'center',
      }}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
        {
          useNativeDriver: true
        }
      )}
      getItemLayout={(data, index) => (
        { length: ITEM_WIDTH, offset: ITEM_WIDTH * index, index }
      )}
      CellRendererComponent={({ children, index, style, ...props }) => {
        const cellStyle = [
          style,
          {
            zIndex: articles.length - index,
            elevation: articles.length - index,
          },
        ]
        return (
          <View style={cellStyle} index={index} {...props}>
            {children}
          </View>
        )
      }}
      renderItem={renderItem}
    />
  )
}

export default memo(ArticleCardList)