import React from 'react'
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
    backgroundColor: 'black',
  },
  headerText: {
    fontSize: 40,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: -1,
    color: 'white',
  },
});

export default AnimatedHeader
