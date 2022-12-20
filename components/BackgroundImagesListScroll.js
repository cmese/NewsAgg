import { Dimensions, StyleSheet } from 'react-native'
import CachedImage from './CachedImage'
const { width } = Dimensions.get('window')
const ITEM_WIDTH = width * 0.8


const BackgroundImagesListScroll = ({articles, scrollX}) => {
  return (
    <> 
      {articles.map((article, index) => {
        const inputRange = [
            (index - 1) * ITEM_WIDTH,
            index * ITEM_WIDTH,
            (index + 1) * ITEM_WIDTH
        ];
        const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0, 1, 0]
        })
        const translateX = scrollX.interpolate({
            inputRange,
            //outputRange: [-50, 0, 10]
            outputRange: [width, 0, -width],
        })
        //console.log(index)
        return <CachedImage
          key={`image-feed-${index}`}
          url={ article.imageURL}
          style={[
            StyleSheet.absoluteFillObject,
            {
            //translateX,
            opacity,
            //width: width,
            }
          ]}
          //blurRadius={5}
          />
        })
      }
    </>
  )
}

export default BackgroundImagesListScroll