import React from 'react';
import { Image, StyleSheet, Text, View, Dimensions, FlatList, Animated } from 'react-native';
import ArticleCard from './ArticleCard';
import AnimatedHeader from './AnimatedHeader';
import PublisherCarousel from './PublisherCarousel';
const { height, width } = Dimensions.get('window');
const EMPTY_ITEM_SIZE = width*.2;
const ITEM_WIDTH = width * 0.8;
const VERTICAL_CELL_HEIGHT = height * 0.8;
const VISIBLE_ITEMS = 3;

const NewsFeed = ({data}) => {
  const scrollYAnimated = React.useRef(new Animated.Value(0)).current;
  return (
    <View>
      <AnimatedHeader
        scrollY={scrollYAnimated}
        data={data}
        verticalScrollDistance={VERTICAL_CELL_HEIGHT}
      />
      <Animated.FlatList
        data={data}
        keyExtractor={(_, index) => String(index)}
        showsVerticalScrollIndicator={false}
        snapToInterval={VERTICAL_CELL_HEIGHT}
        snapToAlignment={'start'}
        decelerationRate={'fast'}
        contentContainerStyle={{
          paddingBottom: 70,
        }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollYAnimated } } }],
          {
            listener: (event)=>{
              //console.log("scrollYAnimated: ", scrollYAnimated);
              //console.log("listheight: ", height);
            },
            useNativeDriver: true
          }
        )}
        renderItem={({item}) => {
          return (
            <HorizontalArticleList item={item}/>
          );
        }}
      />
    </View>
  )
}


const HorizontalArticleList = ({item}) => {
  const scrollX = React.useRef(new Animated.Value(0)).current;

  return (
    //change this view to cell renderercomponent in flatlist
    <Animated.View
      onLayout={(event) => {
        //console.log("view height: ", event.nativeEvent.layout.height);
      }}
      style={{
        //backgroundColor: backgroundPubColor,
        flexGrow: 1,
        //alignContent: 'center',
        borderRadius: 10,
        height: VERTICAL_CELL_HEIGHT,
      }}>
      <View style={StyleSheet.absoluteFillObject}>
        {item.articles.map((article, index) => {
          const inputRange = [
            (index -1) * width,
            index * width,
            (index + 1) * width
          ]
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0, 1, 0]
          })
          return <Animated.Image
            key={`image-${index}`}
            source={{uri: article.imageURL}}
            style={[
              StyleSheet.absoluteFillObject,
              {
                opacity
              }
            ]}
            blurRadius={5}
          />
        })}
      </View>
      <Animated.FlatList
        data={[...item.articles, { key: 'empty-right' }]}
        keyExtractor={(_, index) => String(index)}
        horizontal
        //inverted
        snapToInterval={ITEM_WIDTH}
        snapToAlignment={'start'}
        style={{
          flexBasis: '50%',
          //backgroundColor: 'red',
        }}
        removeClippedSubviews={false}
        contentContainerStyle={{
          //flex: 1,
          //justifyContent: 'center',
          alignItems: 'center',
        }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        CellRendererComponent={({ children, index, style, ...props }) => {
          const cellStyle = [
            style,
            {
              zIndex: item.articles.length - index,
              elevation: item.articles.length - index,
              //justifyContent: 'center',
            },
          ];
          return (
            <View style={cellStyle} index={index} {...props}>
              {children}
            </View>
          );
        }}
        renderItem={({ item, index }) => {
          if (item.key === 'empty-right') {
            return <View style={{ width: EMPTY_ITEM_SIZE }} />;
          }
          const inputRange = [
            (index - 1) * ITEM_WIDTH, 
            index * ITEM_WIDTH, 
            (index + 1) * ITEM_WIDTH,
          ];
          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [-60, 0, 100],
          });
          const translateX = scrollX.interpolate({
            inputRange,
            outputRange: [-ITEM_WIDTH*.8, 0, ITEM_WIDTH*.8],
          });
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [1 - 1 / VISIBLE_ITEMS, 1, 0],
          });
          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.8, 1, 1.3],
            //extrapolate: 'clamp'
          });
          return (
            <ArticleCard 
              item={item}
              itemWidth={ITEM_WIDTH}
              itemHeight={VERTICAL_CELL_HEIGHT*0.8}
              translateY={translateY} 
              translateX={translateX}
              opacity={opacity}
              scale={scale}
            />
          );
        }}
      />
      <View style={{
        bottom: 10,
        //backgroundColor: 'red',
        minHeight: VERTICAL_CELL_HEIGHT*0.10,
        marginRight: -(width/2 - width/7/2),
      }}>
        <PublisherCarousel articles={item.articles} scrollX={scrollX} scrollWidth={ITEM_WIDTH}/>
      </View>
    </Animated.View>
  );
}

export default NewsFeed
