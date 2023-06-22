import React, { useEffect } from 'react'
import { StyleSheet, Text, View, Animated } from 'react-native';

const HEADER_HEIGHT = 70;
const TEXT_SPACING = 15;

const AnimatedHeader = ({ scrollY, data, verticalScrollDistance }) => {

  const translateY = scrollY.interpolate({
    inputRange: [0, verticalScrollDistance],
    outputRange: [0, -HEADER_HEIGHT],
  });
  return (
    <View
      style={{
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'transparent',
        //backgroundColor: 'rgba(0, 0, 0, 0.5)',
        height: HEADER_HEIGHT,
        overflow: 'hidden',
      }}
    >
      <Animated.View
        style={{
          transform: [{ translateY }],
        }}
      >
        {data.map((item, index) => {
          return (
            <Animated.View key={index} style={styles.headerContainer}>
              <Text
                style={[styles.headerText]}
                adjustsFontSizeToFit
              >
                {item.name}
              </Text>
            </Animated.View>
          );
        })}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: HEADER_HEIGHT,
    justifyContent: 'center',
    paddingLeft: TEXT_SPACING,
    backgroundColor: 'transparent',
  },
  headerText: {
    fontSize: 40,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: -1,
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },
});

export default AnimatedHeader
