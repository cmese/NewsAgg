import React, { useState, useEffect, useRef, memo } from 'react';
import { View, Animated, Text } from 'react-native';
//import { shorthash } from 'shorthash';
//const hash = require('hash-string')
//import * as FileSystem from 'expo-file-system';
//import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import useCompressedImage from '../hooks/useCompressedImage'


function CachedImage(props) {
  const [cachedDic, setCachedDic] = useState({})
  const { url, style, blurRadius, name, index } = props
  const { image, error, loading } = useCompressedImage(url, setCachedDic)
  if (loading) {
      return <Text>Loading...</Text>
  }

  if (error) {
      return <Text>{error.toString()}</Text>
  }

  console.log(`${index}: CachedImage ${name} Rendered`)
  //console.log(`cachedDic ${cachedDic}`)
  return (
    <Animated.Image style={style} source={{ uri: image.uri }} blurRadius={blurRadius} />
  )
}

export default memo(CachedImage)







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
