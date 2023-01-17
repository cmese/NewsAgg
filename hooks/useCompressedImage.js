import { Image, Dimensions } from 'react-native'
import { useState, useEffect } from 'react';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
const hash = require('hash-string')

const { height, width } = Dimensions.get('window');
const ITEM_WIDTH = width * 0.8;

function useCompressedImage(url, setCachedDic) {
    const [image, setImage] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      async function fetchImage() {
        try {
          const compressedImage = await manipulateAsync(
              url,
              [ {resize: { width: ITEM_WIDTH } }],
              { compress: 0.25, format: SaveFormat.JPEG }
          )
          //Image.getSize(compressedImage.uri, (width, height) => {console.log(`width: ${width} height: ${height}`)})
          setImage(compressedImage)
          setLoading(false)
        } catch (error) {
          setError(error)
          setLoading(false)
        }
      }
      const hashedUrl = hash(url)
      setCachedDic('hello')
      fetchImage()
      console.log("fetchImage CALLED")
    }, [url])
    return { image, error, loading }
}

export default useCompressedImage





// //change this to callback
// const CachedImage = (props) => {
//   const { url, style, blurRadius } = props;
//   const [uri, setUri] = useState(url); //should be changed, remove default url
// 
//   const compressImage = async (path) => {
//     const manipResult = await manipulateAsync(path, [], { compress: 0.5, format: SaveFormat.JPEG })
//     //DEBUG****************
//     const compressedNewImageInfo = await FileSystem.getInfoAsync(manipResult.uri)
//     console.log(`${manipResult.uri}: Size of image AFTER compression: ${compressedNewImageInfo.size}`)
//     return manipResult
//     //setUri(newImage.uri);
//   }
// 
//   const Cached = async () => {
//     try {
//       //hash the url
//       //const name = shorthash.unique(url);
//       const name = hash(uri)
//       //console.log(name)
// 
//       //create path using filesystem directory and shothashed url
//       const path = `${FileSystem.cacheDirectory}${name}`;
// 
//       //try to get image from local filesystem using path
//       const image = await FileSystem.getInfoAsync(path)
// 
//       //if image exists locally, display it without loading externally
//       if (image.exists) {
//         console.log("-----image already exists-------path: ", path)
//         return;
//       }
//       //if image does not exist locally, download it, cache it, compress it
//       const newImage = await FileSystem.downloadAsync(uri, path);
//       const newImageInfo = await FileSystem.getInfoAsync(path)
//       console.log(`${path}: Size of image BEFORE compression: ${newImageInfo.size}`)
//       const cachedImage = await compressImage(path)
// 
// 
//       setUri(cachedImage.uri)
//       //const deleteImage = await FileSystem.deleteAsync(newImage.uri)
//       //setUri(manipResult.uri)
//     } catch(err) {
//       console.log("CachedImage error", err)
//     }
//   };
// 
//   useEffect(() => {
//     Cached();
//   }, []);
//   //console.log(uri)
//   return <Animated.Image style={style} source={{ uri: uri }} blurRadius={blurRadius} />
// };
// 
// export default memo(CachedImage)
