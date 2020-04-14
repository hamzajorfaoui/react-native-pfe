import * as React from 'react';
import {ScrollView , View, Text ,StyleSheet , Animated , Dimensions,RefreshControl} from 'react-native';

const HEADER_MAX_HEIGHT = 120; 
export default class HeaderA extends React.Component{ 


    constructor(props) {
        super(props);
    
        this.offset = 0;
    
        this.state = {
          scrollOffset: new Animated.Value(0),
          titleWidth: 0,
          refreshing:false
        };
      }
    
      componentDidMount() {
        this.state.scrollOffset.addListener(({ value }) => (this.offset = value));
      }
    
      onScroll = e => {
        const scrollSensitivity = 4 / 3;
        const offset = e.nativeEvent.contentOffset.y / scrollSensitivity;
        this.state.scrollOffset.setValue(offset);
      };

    
    
      render() {
        const { scrollOffset } = this.state;
        const screenWidth = Dimensions.get('window').width;
    
        return (
          <View style={styles.container}>
            
            <Animated.ScrollView
            style={styles.container}
            onScroll={this.onScroll}
            scrollEventThrottle={20}
            refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={() => {
                    this.setState({ refreshing: true });
                    setTimeout(() => this.setState({ refreshing: false }), 1000);
                  }}
                  // Android offset for RefreshControl
                  progressViewOffset={HEADER_MAX_HEIGHT}
                />
              }
              contentInset={{
                top: HEADER_MAX_HEIGHT,
              }}
              contentOffset={{
                y: -HEADER_MAX_HEIGHT,
              }}
              >
                <View style={styles.content}>
                  {this.props.getlist}  
                </View>
            </Animated.ScrollView>

            <Animated.View
            pointerEvents="none"
              style={[
                styles.header, 
                {
                  paddingHorizontal: screenWidth * 0.05,
                  width: screenWidth,
                  height: scrollOffset.interpolate({
                    inputRange: [0, 200],
                    outputRange: [120, 64],
                    extrapolate: 'clamp',
                  }),
                },
              ]}>
              <Animated.Text
                onLayout={e => {""
                  if (this.offset === 0 && this.state.titleWidth === 0) {
                    const titleWidth = e.nativeEvent.layout.width;
                    this.setState({ titleWidth });
                  }
                }}
                style={{
                 color:"#fff",
                  fontWeight: 'bold',
                  fontSize: scrollOffset.interpolate({
                    inputRange: [0, 200],
                    outputRange: [26, 20],
                    extrapolate: 'clamp',
                  }),
                }}>
                Actualités
              </Animated.Text>
              <Animated.View
                style={{
                  width: scrollOffset.interpolate({
                    inputRange: [0, 200],
                    outputRange: [screenWidth * 0.9 - this.state.titleWidth, 0],
                    extrapolate: 'clamp',
                  }),
                }}
              />
            </Animated.View>
          </View>
        );
      }
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        // alignItems: 'center',
        backgroundColor: '#ecf0f1',
      },
      header: {
        backgroundColor: '#35b546',
        borderBottomWidth: 1,
        borderColor: 'gainsboro',
        flexDirection: 'row', 
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingBottom: 8,

        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        // backgroundColor: '#fff',
        overflow: 'hidden',
        // height: HEADER_MAX_HEIGHT,
      },
      content:{
        paddingTop: Platform.OS !== 'ios' ? HEADER_MAX_HEIGHT : 0,
      }
    });
    