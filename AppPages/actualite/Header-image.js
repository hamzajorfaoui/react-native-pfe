import React, { Component } from 'react';
import {
  Animated,
  Platform,
  StatusBar,
  Dimensions,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Image,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import APIURL from '../../APIURL';

const HEADER_MAX_HEIGHT = 350;
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 60 : 73;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export default class HeaderImage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scrollY: new Animated.Value(
        // iOS has negative initial scroll value because content inset...
        Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0,
      ),
      refreshing: false,
      imageloaded:false,
      images:[],
      title_heigh:32
    };
  }
  componentDidMount(){
    let images = [];
    this.props.Actualite.images.map(image=>{images=[...images,{loaded:false,image:image.image}];});
    this.setState({images:[{loaded:false,image:this.props.Actualite.req_image},...images]});
  } 
  imageloaded=(index)=>{
   this.setState({images:this.state.images.map((image,i)=>{
     if(i==index){return{...image,loaded:true}}
     return image;
     })}); 
  }
  spinnerload=(item)=>{
    return item==true?<></>:<ActivityIndicator size="small" color="#35b546" style={styles.spinner}/>;
  }
  _renderItem = ({item, index}) => {
    return (
        <View style={{height:HEADER_MAX_HEIGHT}}>
            <Image
            style={[
              styles.backgroundImage,
            ]}
            resizeMode="contain"
            onLoad={()=>{this.imageloaded(index)}}
            source={{uri:APIURL+item.image
              // , cache: 'only-if-cached'
            }}
          />
          {this.spinnerload(item.loaded)} 
        </View>
    );
}
  _carousel;
  _renderScrollViewContent() {
    const data = Array.from({ length: 30 });
    return (
      <View style={styles.scrollViewContent}>
            <Text>{this.props.Actualite.contenu}</Text>
      </View>
    );
  }

  render() {
    // Because of content inset the scroll value will be negative on iOS so bring
    // it back to 0.
    const scrollY = Animated.add(
      this.state.scrollY,
      Platform.OS === 'ios' ? HEADER_MAX_HEIGHT : 0,
    );
    const headerTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -HEADER_SCROLL_DISTANCE],
      extrapolate: 'clamp',
    });
    const backgrouTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2 , HEADER_SCROLL_DISTANCE],
      outputRange: ["#fff" , "#fff", "#35b546"],
      extrapolate: 'clamp',
    });

    const imageOpacity = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 0],
      extrapolate: 'clamp',
    });
    const imageTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 100],
      extrapolate: 'clamp',
    });

    const titleScale = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 0.8],
      extrapolate: 'clamp',
    });
    const titleTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [HEADER_SCROLL_DISTANCE , HEADER_SCROLL_DISTANCE / 2, 0],
      extrapolate: 'clamp',
    });
    // const margin_title_top_translate= scrollY.interpolate({
    //   inputRange: [HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    //   outputRange: [Platform.OS === 'ios' ? 60 : 58 , 30],
    //   extrapolate: 'clamp',
    // });
    return (
      <View style={styles.fill}>
        <StatusBar
          translucent
          barStyle="light-content"
          backgroundColor="rgba(0, 0, 0, 0.251)"
        />
        <Animated.ScrollView
          style={[styles.fill , {paddingTop:this.state.title_heigh}]}
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            { useNativeDriver: false },
          )}
          // refreshControl={
          //   <RefreshControl
          //     refreshing={this.state.refreshing}
          //     onRefresh={() => {
          //       this.setState({ refreshing: true });
          //       setTimeout(() => this.setState({ refreshing: false }), 1000);
          //     }}
          //     // Android offset for RefreshControl
          //     progressViewOffset={HEADER_MAX_HEIGHT}
          //   />
          // }
          // iOS offset for RefreshControl
          contentInset={{
            top: HEADER_MAX_HEIGHT,
          }}
          contentOffset={{
            y: -HEADER_MAX_HEIGHT,
          }}
        >
          {this._renderScrollViewContent()}
        </Animated.ScrollView>
        <Animated.View
          // pointerEvents="none"
          style={[
            styles.header,
             
            { backgroundColor: backgrouTranslate, 
              transform: [{ translateY: headerTranslate }] },
          ]}
        >
          <Animated.View
        style={[
          styles.backgroundImage,
          {
            opacity: imageOpacity,
            transform: [{ translateY: imageTranslate }],
          },
        ]}
        >
          <Carousel
              ref={(c) => { this._carousel = c; }}
              data={this.state.images}
              renderItem={this._renderItem}
              sliderWidth={Dimensions.get('window').width}
              itemWidth={Dimensions.get('window').width}
            />
        </Animated.View>
        </Animated.View>
        <Animated.View
          onLayout={(event)=>{this.setState({title_heigh :event.nativeEvent.layout.height})}}
          style={[
            styles.bar,
            {
              transform: [
                // { scale: titleScale },
                { translateY: titleTranslate },
              ],
              marginTop:this.state.title_heigh
            },
          ]}
        >
          <Text style={styles.title}>{this.props.Actualite.title}</Text>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
    backgroundColor:"#fff",
    paddingLeft:10,
    paddingRight:5
  },
  content: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    // backgroundColor: '#fff',
    overflow: 'hidden',
    height: HEADER_MAX_HEIGHT,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: Dimensions.get('window').width,
    height: HEADER_MAX_HEIGHT
  },
  bar: {
    backgroundColor: "#35b546",
    // marginTop: Platform.OS === 'ios' ? 60 : 58,
    paddingLeft:10,
    paddingRight:10,
    // height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  title: {
    textAlign:"center",
    color: "#fff",
    fontSize: 18,
  },
  scrollViewContent: {
    borderTopLeftRadius: 30, 
    borderTopRightRadius: 30,
    // padding:20,
    // iOS uses content inset, which acts like padding.
    paddingTop: Platform.OS !== 'ios' ? HEADER_MAX_HEIGHT: 0,
    marginBottom:50
  },
  row: {
    height: 40,
    margin: 16,
    backgroundColor: '#D3D3D3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinner:{
    zIndex:100,
    marginTop:HEADER_MAX_HEIGHT/2
  },slide:{
    backgroundColor:"#D3D3D3"
  }
});