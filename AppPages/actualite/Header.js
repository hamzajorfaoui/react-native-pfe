import * as React from 'react';
import {ScrollView , View, Text ,StyleSheet , Animated , Dimensions} from 'react-native';


export default class Header extends React.Component{ 


    constructor(props) {
        super(props);
    
        this.offset = 0;
    
        this.state = {
          scrollOffset: new Animated.Value(0),
          titleWidth: 0,
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
            
            <Animated.View
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
    
            <ScrollView
              style={{ flex: 1, width: '100%'}}
              contentContainerStyle={{ width: '100%' }}
              onScroll={this.onScroll}
              scrollEventThrottle={20}>

            {this.props.getlist}
            
            </ScrollView>
          </View>
        );
      }
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        alignItems: 'center',
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
      }
    });
    