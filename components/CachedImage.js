import React, { useState, useEffect } from 'react';
import { Animated } from 'react-native';
//import { shorthash } from 'shorthash';
const hash = require('hash-string')
import * as FileSystem from 'expo-file-system';

const CachedImage = (props) => {
  const { url, style, blurRadius } = props;
  const [uri, setUri] = useState(url);

  useEffect(() => {
    Cached();
  }, []);

  const Cached = async () => {
    try {
      //hash the url
      //const name = shorthash.unique(url);
      const name = hash(url)

      //create path using filesystem directory and shothashed url
      const path = `${FileSystem.cacheDirectory}${name}`;

      //try to get image from local filesystem using path
      const image = await FileSystem.getInfoAsync(path);

      //if image exists locally, display it without loading externally
      if (image.exists) {
        setUri(image.uri);
        return;
      }
      //if image does not exist locally, download it and cache it
      const newImage = await FileSystem.downloadAsync(url, path);
      setUri(newImage.uri);
    } catch(err) {
      console.log("error", err)
    }
  };
  return <Animated.Image style={style} source={{ uri: uri }} blurRadius={blurRadius} />;
};

export default CachedImage;
