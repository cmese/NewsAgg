import React, { memo, useRef, useEffect, useState } from 'react'
import { View, Dimensions, Animated } from 'react-native'
import * as Reanimated from 'react-native-reanimated'
import ArticleCardList from './ArticleCardList';
import PublisherCarousel from './PublisherCarousel';
import BackgroundImagesListScroll from './BackgroundImagesListScroll';
import CompressImage from '../hooks/CompressImage';
const { height, width } = Dimensions.get('window');
const VERTICAL_CELL_HEIGHT = height * 0.8;


const HorizontalArticleList = ({ item }) => {
  const [imageUris, setImageUris] = useState([])
  const scrollX = useRef(new Animated.Value(0)).current
  const scrollXPub = useRef(new Animated.Value(0)).current

  const pubScrolling = useRef(false)
  const articlesScrolling = useRef(false)

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
      <BackgroundImagesListScroll scrollX={scrollX} compressedImageUris={imageUris} scrollXPub={scrollXPub} pubScrolling={pubScrolling} articlesScrolling={articlesScrolling} />
      <ArticleCardList scrollX={scrollX} articles={item.articles} compressedImageUris={imageUris} pubScrolling={pubScrolling} articlesScrolling={articlesScrolling} scrollXPub={scrollXPub} />
      <PublisherCarousel publishers={[...publishers, { key: 'empty-right' }]} scrollX={scrollX} scrollXPub={scrollXPub} pubScrolling={pubScrolling} articlesScrolling={articlesScrolling} />
    </View>
  )
}

export default memo(HorizontalArticleList)
