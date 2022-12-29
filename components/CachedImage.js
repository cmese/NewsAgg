import React, { useState, useEffect, memo } from 'react';
import { Animated, Text } from 'react-native';
//import { shorthash } from 'shorthash';
const hash = require('hash-string')
import * as FileSystem from 'expo-file-system';
import { Image } from 'react-native-compressor';

//change this to callback 
const CachedImage = (props) => {
  const { url, style, blurRadius } = props;
  const [uri, setUri] = useState(url);

  const Cached = async () => {
    try {
      //hash the url
      //const name = shorthash.unique(url);
      const name = hash(url)
      //console.log(name)

      //create path using filesystem directory and shothashed url
      const path = `${FileSystem.cacheDirectory}${name}x`;

      //try to get image from local filesystem using path
      const image = await FileSystem.getInfoAsync(path);

      //if image exists locally, display it without loading externally
      if (image.exists) {
        console.log("-----image already exists dumbass")
        return;
      }
      //if image does not exist locally, download it, cache it, compress it
      const newImage = await FileSystem.downloadAsync(url, path);

      //DEBUG****************
      const newImageInfo = await FileSystem.getInfoAsync(path)
      console.log(`Size of image BEFORE compression: ${newImageInfo.size}`)
      
      const result = await Image.compress(path, {
        compressionMethod: 'auto',
      });

      //DEBUG****************
      const compressedNewImageInfo = await FileSystem.getInfoAsync(path)
      console.log(`Size of image AFTER compression: ${compressedNewImageInfo.size}`)

      setUri(newImage.uri);
    } catch(err) {
      console.log("error", err)
    }
  };

  useEffect(() => {
    Cached();
  }, []);
  //console.log(uri)
  return <Animated.Image style={style} source={{ uri: uri }} blurRadius={blurRadius} />
};

export default memo(CachedImage)
