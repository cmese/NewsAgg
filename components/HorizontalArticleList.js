import React, { memo } from 'react'
import { View, Dimensions, Animated } from 'react-native'
import ArticleCard from './ArticleCard';
import PublisherCarousel from './PublisherCarousel';
import BackgroundImagesListScroll from './BackgroundImagesListScroll';
const { height, width } = Dimensions.get('window');
const EMPTY_ITEM_SIZE = width*.2;
const ITEM_WIDTH = width * 0.8;
const VERTICAL_CELL_HEIGHT = height * 0.8;
const ARTICLE_CARD_HEIGHT = VERTICAL_CELL_HEIGHT * 0.8;
const VISIBLE_ITEMS = 3;
const NEG_OUTPUT_RANGE = -ITEM_WIDTH*.9;
const POS_OUTPUT_RANGE = ITEM_WIDTH*.5;
const OPACITY_OUTPUT_RANGE = 1-1/VISIBLE_ITEMS;
const MIN_CELL_HEIGHT = VERTICAL_CELL_HEIGHT*.10;
const CELL_MARGIN_RIGHT = -(width/2 - width/7/2);


const HorizontalArticleList = ({item, keyExtractor}) => {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  return (
    //change this view to cell renderercomponent in flatlist
    <View
      style={{
        flex: 1,
        borderRadius: 10,
        height: VERTICAL_CELL_HEIGHT,
      }}>
        <BackgroundImagesListScroll articles={item.articles} scrollX={scrollX}/>
        <Animated.FlatList
          data={[...item.articles, { key: 'empty-right' }]}
          keyExtractor={keyExtractor}
          horizontal
          showsHorizontalScrollIndicator={false}
          //maxToRenderPerBatch={3}
          snapToInterval={ITEM_WIDTH}
          snapToAlignment={'start'}
          style={{
            flexBasis: '50%',
          }}
          removeClippedSubviews={false}
          contentContainerStyle={{
            alignItems: 'center',
          }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true }
          )}
          CellRendererComponent={({ children, index, style, ...props }) => {
            const cellStyle = [
              style,
              {
                zIndex: item.articles.length - index,
                elevation: item.articles.length - index,
              },
            ]
            return (
              <View style={cellStyle} index={index} {...props}>
                {children}
              </View>
            )
          }}
          renderItem={({ item, index }) => {
            if (item.key === 'empty-right') {
              return <View style={{ width: EMPTY_ITEM_SIZE }} />
            }
            return (
              <ArticleCard
                item={item}
                index={index}
                scrollX={scrollX}
              />
            )
          }}
        />
      <View style={{
        minHeight: MIN_CELL_HEIGHT,
        marginRight: CELL_MARGIN_RIGHT,
      }}>
        <PublisherCarousel articles={item.articles} scrollX={scrollX} scrollWidth={ITEM_WIDTH}/>
      </View>
    </View>
  )
}

export default memo(HorizontalArticleList)