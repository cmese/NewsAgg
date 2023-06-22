import React, { memo, useRef, useEffect, useState } from 'react'
import { View, Dimensions, Animated } from 'react-native'
import * as Reanimated from 'react-native-reanimated'
import ArticleCardList from './ArticleCardList';
import PublisherCarousel from './PublisherCarousel';
import BackgroundImagesListScroll from './BackgroundImagesListScroll';
import CompressImage from '../hooks/CompressImage';
const { height, width } = Dimensions.get('window');
const VERTICAL_CELL_HEIGHT = height * 0.8;

const publisherPics = {
  'fox': require('../assets/fox.jpg'),
  'cnn': require('../assets/cnn.jpg'),
  'cnbc': require('../assets/cnbc.jpg'),
  'nyt': require('../assets/nyt.jpg')
}

const HorizontalArticleList = ({ item }) => {
  const [imageUris, setImageUris] = useState([])
  const scrollX = useRef(new Animated.Value(0)).current


  const publishers = item.articles.map((article) => {
    return publisherPics[article.publisher]
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
        height: VERTICAL_CELL_HEIGHT +70,
        width: width,
        borderColor: 'yellow'
      }}>
      <BackgroundImagesListScroll scrollX={scrollX} compressedImageUris={imageUris} />
      <ArticleCardList scrollX={scrollX} articles={item.articles} compressedImageUris={imageUris} />
      <PublisherCarousel publishers={[...publishers, { key: 'empty-right' }]} scrollX={scrollX} />
    </View>
  )
}

export default memo(HorizontalArticleList)
