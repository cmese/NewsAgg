import React, { memo } from 'react';
import { Animated } from 'react-native';

const CacheImage = ({ uri, style, blurRadius }) => {
  return (
    <Animated.Image style={style} source={{ uri: uri }} blurRadius={blurRadius} />
  )
}

export default memo(CacheImage)