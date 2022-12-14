import React from 'react';
import { StyleSheet, View, Dimensions, Animated } from 'react-native';
import ArticleCard from './ArticleCard';
import CachedImage from './CachedImage';
import AnimatedHeader from './AnimatedHeader';
import PublisherCarousel from './PublisherCarousel';
const { height, width } = Dimensions.get('window');
const EMPTY_ITEM_SIZE = width*.2;
const ITEM_WIDTH = width * 0.8;
const VERTICAL_CELL_HEIGHT = height * 0.8;
const ARTICLE_CARD_HEIGHT = VERTICAL_CELL_HEIGHT * 0.8;
const VISIBLE_ITEMS = 3;
const NEG_OUTPUT_RANGE = -ITEM_WIDTH*.9;
const POS_OUTPUT_RANGE = ITEM_WIDTH*.5;
const OPACITY_OUTPUT_RANGE = 1-1/VISIBLE_ITEMS;
const MIN_CELL_HEIGHT = VERTICAL_CELL_HEIGHT*.10;
const CELL_MARGIN_RIGHT = -(width/2 - width/7/2);

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
        keyExtractor={(item, index) => `${item.name}${index}`}
        showsVerticalScrollIndicator={false}
        snapToInterval={VERTICAL_CELL_HEIGHT}
        //maxToRenderPerBatch={3}
        initialNumToRender={3}
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
        renderItem={renderHorizontalListItem}
      />
    </View>
  )
}

const renderHorizontalListItem = ({ item }) => <HorizontalArticleList item={item} />

const HorizontalArticleList = ({item}) => {
  const scrollX = React.useRef(new Animated.Value(0)).current;

  return (
    //change this view to cell renderercomponent in flatlist
    <Animated.View
      onLayout={(event) => {
        //console.log("view height: ", event.nativeEvent.layout.height);
      }}
      style={{
        flexGrow: 1,
        borderRadius: 10,
        height: VERTICAL_CELL_HEIGHT,
      }}>
      <Animated.View
          style={[
            StyleSheet.absoluteFillObject,
            {
              width: width*10,
            }
          ]}
        >
        <Animated.FlatList
          data={item.articles}
          keyExtractor={(_, index) => `${item.name}${item.date}${index}`}
          horizontal
          scrollEnabled={false}
          renderItem={({ item, index }) => {
        //{item.articles.map((article, index) => {
            const inputRange = [
              (index - 1) * ITEM_WIDTH,
              index * ITEM_WIDTH,
              (index + 1) * ITEM_WIDTH
            ];
            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0, 1, 0]
            })
            const translateX = scrollX.interpolate({
              inputRange,
              //outputRange: [-50, 0, 10]
              outputRange: [width, 0, -width],
            })
            return <CachedImage
              key={`image-feed-${index}`}
              url={ item.imageURL}
              style={[
                //StyleSheet.absoluteFillObject,
                {
                  translateX,
                  //opacity,
                  width: width/2,
                }
              ]}
              blurRadius={5}
            />
          }}
        />
      </Animated.View>
      <Animated.FlatList
        data={[...item.articles, { key: 'empty-right' }]}
        keyExtractor={(_, index) => `${item.name}${index}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        //maxToRenderPerBatch={3}
        snapToInterval={ITEM_WIDTH}
        snapToAlignment={'start'}
        style={{
          flexBasis: '50%',
        }}
        removeClippedSubviews={false}
        contentContainerStyle={{
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
            (index - 1) * ITEM_WIDTH, //item behind (right)
            index * ITEM_WIDTH, //current item
            (index + 1) * ITEM_WIDTH, //item front (left)
          ];
          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [-25, 0, 25],
          });
          const translateX = scrollX.interpolate({
            inputRange,
            //outputRange: [-50, 0, 10]
            outputRange: [NEG_OUTPUT_RANGE, 0, POS_OUTPUT_RANGE],
          });
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [OPACITY_OUTPUT_RANGE, 1, 0],
          });
          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [.95, 1, 1.5],
            //extrapolate: 'clamp'
          });
          return (
            <ArticleCard
              item={item}
              index={index}
              itemHeight={ARTICLE_CARD_HEIGHT}
              translateY={translateY}
              translateX={translateX}
              opacity={opacity}
              scale={scale}
            />
          );
        }}
      />
      <View style={{
        minHeight: MIN_CELL_HEIGHT,
        marginRight: CELL_MARGIN_RIGHT,
      }}>
        <PublisherCarousel articles={item.articles} scrollX={scrollX} scrollWidth={ITEM_WIDTH}/>
      </View>
    </Animated.View>
  );
}

function areEqual(preProps, nextProps) {
  return true;
}

export default React.memo(NewsFeed, areEqual)

