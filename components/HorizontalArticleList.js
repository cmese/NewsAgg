import React, { memo, useEffect, useState } from 'react'
import { View, Dimensions, Animated } from 'react-native'
import ArticleCard from './ArticleCard';
import PublisherCarousel from './PublisherCarousel';
import BackgroundImagesListScroll from './BackgroundImagesListScroll';
import CompressImage from '../hooks/CompressImage';
const { height, width } = Dimensions.get('window');
const EMPTY_ITEM_SIZE = width * .2;
const ITEM_WIDTH = width * 0.8;
const VERTICAL_CELL_HEIGHT = height * 0.8;
const ARTICLE_CARD_HEIGHT = VERTICAL_CELL_HEIGHT * 0.8;
const VISIBLE_ITEMS = 3;
const NEG_OUTPUT_RANGE = -ITEM_WIDTH * .9;
const POS_OUTPUT_RANGE = ITEM_WIDTH * .5;
const OPACITY_OUTPUT_RANGE = 1 - 1 / VISIBLE_ITEMS;
const MIN_CELL_HEIGHT = VERTICAL_CELL_HEIGHT * .10;
const CELL_MARGIN_RIGHT = -(width / 2 - width / 7 / 2);


//check / update global cache dic here in renderItem 
const HorizontalArticleList = ({ item, keyExtractor }) => {
  const [imageUris, setImageUris] = useState([])
  const scrollX = React.useRef(new Animated.Value(0)).current

  useEffect(() => {
    const compressImages = async () => {
      const compressedImageUris = await Promise.all(item.articles.map(async (article) => {
        const imageUri = await CompressImage(article.imageURL)
        return imageUri
      }))
      setImageUris(compressedImageUris)
    }
    compressImages()
  }, [])

  const renderItem = ({ item, index }) => {
    if (item.key === 'empty-right') {
      return <View style={{ width: EMPTY_ITEM_SIZE }} />
    }
    return (
      <ArticleCard
        item={item}
        index={index}
        scrollX={scrollX}
        compressedImageUri={imageUris[index]}
      />
    )
  }
  return (
    <View
      style={{
        flex: 1,
        borderRadius: 10,
        height: VERTICAL_CELL_HEIGHT,
        width: width
      }}>
      <BackgroundImagesListScroll scrollX={scrollX} compressedImageUris={imageUris} />
      <Animated.FlatList
        data={[...item.articles, { key: 'empty-right' }]}
        keyExtractor={keyExtractor}
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
        renderItem={renderItem}
      />
      <View style={{
        minHeight: MIN_CELL_HEIGHT,
        marginRight: CELL_MARGIN_RIGHT,
      }}>
        <PublisherCarousel articles={item.articles} scrollX={scrollX} scrollWidth={ITEM_WIDTH} />
      </View>
    </View>
  )
}

export default memo(HorizontalArticleList)
