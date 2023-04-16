import React, { memo, useEffect, useState } from 'react'
import { View, Dimensions, Animated } from 'react-native'
import ArticleCard from './ArticleCard';
import ArticleCardList from './ArticleCardList';
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


const HorizontalArticleList = ({ item }) => {
  const [imageUris, setImageUris] = useState([])
  const scrollX = React.useRef(new Animated.Value(0)).current
  const publishers = item.articles.map((article) => {
    return article.publisher
  })

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

  return (
    <View
      style={{
        flex: 1,
        borderRadius: 10,
        height: VERTICAL_CELL_HEIGHT,
        width: width
      }}>
      <BackgroundImagesListScroll scrollX={scrollX} compressedImageUris={imageUris} />
      <ArticleCardList scrollX={scrollX} articles={item.articles} compressedImageUris={imageUris} />
      <View style={{
        minHeight: MIN_CELL_HEIGHT,
        //marginRight: CELL_MARGIN_RIGHT,
      }}>
        <PublisherCarousel publishers={publishers} scrollX={scrollX} scrollWidth={ITEM_WIDTH} />
      </View>
    </View>
  )
}

export default memo(HorizontalArticleList)
