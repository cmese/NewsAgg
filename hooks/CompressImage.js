import { useState, useEffect, useContext } from 'react';
import { Dimensions } from 'react-native'
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import { CachedImageDicContext } from '../data/CachedImageContext';
import * as Crypto from 'expo-crypto'
import { createAnimatedPropAdapter } from 'react-native-reanimated';
//const hash = require('hash-string')
const { height, width } = Dimensions.get('window');
const ITEM_WIDTH = width * 0.8;

async function CompressImage(url) {
  //const [imageUri, setImageUri] = useState(null)
  try {
    //png = lossless, jpeg = loss but faster
    const compressedImage = await manipulateAsync(
      url,
      [{ resize: { width: ITEM_WIDTH } }],
      { compress: 0.25, format: SaveFormat.PNG }
    )
    return compressedImage.uri
    //setImageUri(compressedImage.uri)
    //Image.getSize(compressedImage.uri, (width, height) => {console.log(`width: ${width} height: ${height}`)})
  } catch (error) {
    console.log(error)
    //TODO: //set image uri to saved error image
  }
}

export default CompressImage