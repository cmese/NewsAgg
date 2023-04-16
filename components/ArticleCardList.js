import React, { memo, useEffect, useState } from 'react'
import { View, Dimensions, Animated } from 'react-native'
import ArticleCard from './ArticleCard'
const { height, width } = Dimensions.get('window')
const EMPTY_ITEM_SIZE = width * .2;
const ITEM_WIDTH = width * 0.8;

const _keyExtractor = (item, index) => `${item.title}${index}`

const ArticleCardList = ({ scrollX, articles, compressedImageUris }) => {
  const [pos, setPos] = useState(0)
  // Use the scrollX value here
  useEffect(() => {
    const listenerId = scrollX.addListener(() => {
      console.log('Current content offset:', scrollX.__getValue());
    });

    return () => {
      scrollX.removeListener(listenerId);
    };
  }, [scrollX]);
  const renderItem = ({ item, index }) => {
    if (item.key === 'empty-right') {
      return <View style={{ width: EMPTY_ITEM_SIZE }} />
    }
    return (
      <ArticleCard
        item={item}
        index={index}
        scrollX={scrollX}
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
      style={{
        //flexBasis: '50%',
      }}
      removeClippedSubviews={false}
      contentContainerStyle={{
        alignItems: 'center',
      }}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
        { useNativeDriver: true }
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