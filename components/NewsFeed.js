import React from 'react';
import { StyleSheet, Text, View, Dimensions, FlatList, Animated } from 'react-native';
import { State, PanGestureHandler, Directions, GestureHandlerRootView } from 'react-native-gesture-handler';
import ArticleCard from './ArticleCard';
import AnimatedHeader from './AnimatedHeader';
//import { bottomTabsHeight } from './BottomTabs';
const { height, width } = Dimensions.get('window');

//const listHeight = height - bottomTabsHeight;


//const ITEM_WIDTH = '80%';
const ITEM_WIDTH = width * 0.8;
//const ITEM_HEIGHT = '65%';
const ITEM_HEIGHT = height * 0.55;
const VERTICAL_CELL_HEIGHT = height * 0.75;
const VISIBLE_ITEMS = 5;

const NewsFeed = ({data}) => {
  const scrollYAnimated = React.useRef(new Animated.Value(0)).current;

  return (
    <GestureHandlerRootView>
      <AnimatedHeader scrollY={scrollYAnimated} data={data} verticalScrollDistance={VERTICAL_CELL_HEIGHT}/>
      <FlatList
        data={data}
        keyExtractor={(_, index) => String(index)}
        showsVerticalScrollIndicator={false}
        snapToInterval={VERTICAL_CELL_HEIGHT}
        snapToAlignment={'start'}
        decelerationRate={'fast'}
        contentContainerStyle={{ paddingBottom: 150, maxheight: VERTICAL_CELL_HEIGHT }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollYAnimated } } }],
          {
            listener: (event)=>{
              //console.log("scrollYAnimated: ", scrollYAnimated);
              console.log("listheight: ", height);
            },
            useNativeDriver: false 
          }
        )}
        //pagingEnabled={true}
        renderItem={({item}) => {
          return (
            <HorizontalArticleList item={item}/>
          );
        }}
      />
    </GestureHandlerRootView>
  )
}


const HorizontalArticleList = ({item}) => {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const scrollXAnimated = React.useRef(new Animated.Value(0)).current;
  const [itemIndex, setIndex] = React.useState(0);
  
  const setAnimatedIndex = React.useCallback((i) => {
    setIndex(i);
    scrollX.setValue(i);
  }, []);

  React.useEffect(() => {
    Animated.spring(scrollXAnimated, {
      toValue: scrollX,
      useNativeDriver: true,
    }).start();
  });
  return (
    <PanGestureHandler
      activeOffsetX={-10}
      onHandlerStateChange={(e) => {
        if (e.nativeEvent.state === State.END) {
          if (itemIndex === item.data.length - 1) {
            // setAnimatedIndex(0)
            return;
          }
          //console.log(e.nativeEvent.x);
          setAnimatedIndex(itemIndex + 1);
        }
      }}
    >
      <PanGestureHandler
        activeOffsetX={10}
        onHandlerStateChange={(e) => {
          if (e.nativeEvent.state === State.END) {
            if (itemIndex === 0) {
              // setAnimatedIndex(data.length - 1)
              return;
            }
            setAnimatedIndex(itemIndex - 1);
          }
        }}
      >
        <View
          onLayout={(event) => {
            console.log("view height: ", event.nativeEvent.layout.height);
          }}
          style={{
            backgroundColor: 'orange',
            height: VERTICAL_CELL_HEIGHT,
            flexDirection: 'column',
            borderRadius: 10,
            //alignItems: 'center',
            justifyContent: 'center',
        }}>
          <FlatList
            data={item.data}
            keyExtractor={(_, index) => String(index)}
            scrollEnabled={false}
            inverted
            renderToHardwareTextureAndroid
            removeClippedSubviews={false}
            CellRendererComponent={({ children, index, style, ...props }) => {
              const cellStyle = [
                style,
                { zIndex: item.data.length - index,
                  justifyContent: 'center',
                },
              ];
              return (
                <View style={cellStyle} index={index} {...props}>
                  {children}
                </View>
              );
            }}
            renderItem={({ item, index }) => {
              const inputRange = [index - 1, index, index + 1];
              const translateY = scrollXAnimated.interpolate({
                inputRange,
                outputRange: [-60, 0, 100],
              });
              const translateX = scrollXAnimated.interpolate({
                inputRange,
                outputRange: [50, 0, -100],
              });
              const opacity = scrollXAnimated.interpolate({
                inputRange,
                outputRange: [1 - 1 / VISIBLE_ITEMS, 1, 0],
              });
              const scale = scrollXAnimated.interpolate({
                inputRange,
                outputRange: [0.8, 1, 1.3],
              });
              return (
                <ArticleCard item={item} translateY={translateY} translateX={translateX} opacity={opacity} scale={scale} cardHeight={ITEM_HEIGHT} cardWidth={ITEM_WIDTH} maxHeight={VERTICAL_CELL_HEIGHT*0.75}/>
              );
            }}
          />
        </View>
      </PanGestureHandler>
    </PanGestureHandler>
  );
}

export default NewsFeed
