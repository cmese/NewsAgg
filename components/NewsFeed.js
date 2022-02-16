import React from 'react';
import { StyleSheet, Text, View, Dimensions, FlatList, Animated } from 'react-native';
import { State, PanGestureHandler, Directions, GestureHandlerRootView } from 'react-native-gesture-handler';
import ArticleCard from './ArticleCard';
import AnimatedHeader from './AnimatedHeader';
import PublisherCarousel from './PublisherCarousel';
const { height, width } = Dimensions.get('window');

const ITEM_WIDTH = width * 0.9;
console.log("window width: ", width);
console.log("ITEM_WIDTH: ", ITEM_WIDTH);
//const VERTICAL_CELL_HEIGHT = ITEM_WIDTH*1.5;
const VERTICAL_CELL_HEIGHT = height * 0.8;
//const carouselMargin=(VERTICAL_CELL_HEIGHT-VERTICAL_CELL_HEIGHT*0.75)/4

const NewsFeed = ({data}) => {
  const scrollYAnimated = React.useRef(new Animated.Value(0)).current;
  return (
    <View>
      <AnimatedHeader scrollY={scrollYAnimated} data={data} verticalScrollDistance={VERTICAL_CELL_HEIGHT}/>
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
              console.log("listheight: ", height);
            },
            useNativeDriver: true
          }
        )}
        //pagingEnabled={true}
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
    <View
      onLayout={(event) => {
        console.log("view height: ", event.nativeEvent.layout.height);
      }}
      style={{
        backgroundColor: 'orange',
        flexGrow: 1,
        //alignContent: 'center',
        borderRadius: 10,
        height: VERTICAL_CELL_HEIGHT, 
    }}>
      <Animated.FlatList
        data={item.data}
        keyExtractor={(_, index) => String(index)}
        horizontal
        snapToInterval={ITEM_WIDTH}
        snapToAlignment={'start'}
        style={{flexBasis: '50%',}}
        contentContainerStyle={{
          alignItems: 'center',
        }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        renderItem={({ item, index }) => {
          return (
            <View 
              style={{
              }}
            >
            <ArticleCard item={item} itemWidth={ITEM_WIDTH} itemHeight={VERTICAL_CELL_HEIGHT*0.8}/>
            </View>
          );
        }}
      />
      <View style={{
        bottom: 10,
        backgroundColor: 'red',
        minHeight: VERTICAL_CELL_HEIGHT*0.10,
      }}>
        <PublisherCarousel articles={item.data} scrollX={scrollX} scrollWidth={ITEM_WIDTH}/>
      </View>
    </View>
  );
}

export default NewsFeed
