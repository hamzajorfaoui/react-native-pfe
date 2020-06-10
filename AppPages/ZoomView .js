import React, { Component } from 'react'
import { ScrollView, Image, TouchableHighlight, Dimensions, ActivityIndicator , StyleSheet , View} from 'react-native'

export default class ZoomView extends Component {

    constructor(props){
        super(props);
        this.state={
            imageHeight:0,
            imageHWidth:0,
            loading:true
        }
    }
    static defaultProps = {
    doAnimateZoomReset: false,
    maximumZoomScale: 2,
    minimumZoomScale: 1,
    zoomHeight: Dimensions.get("window").height, 
    zoomWidth: Dimensions.get("window").width,
    }
handleResetZoomScale = (event) => {
  this.scrollResponderRef.scrollResponderZoomTo({ 
     x: 0, 
     y: 0, 
     width: this.props.zoomWidth, 
     height: this.props.zoomHeight, 
     animated: true 
  })
}
setZoomRef = node => { //the ScrollView has a scrollResponder which allows us to access more methods to control the ScrollView component
  if (node) {
    this.zoomRef = node
    this.scrollResponderRef = this.zoomRef.getScrollResponder()
  }
}
render() {
  return (
    <ScrollView
      contentContainerStyle={{flex:1,alignItems: 'center', justifyContent: 'center'  }} 
      maximumZoomScale={this.props.maximumZoomScale}
      minimumZoomScale={this.props.minimumZoomScale}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      ref={this.setZoomRef} 
      style={{ overflow: 'hidden' }}
     >
       {
         !this.state.loading ?<></> :<View style={styles.container}><ActivityIndicator size="small" color="#35b546" /></View>
       }
       <TouchableHighlight
         onPress={this.handleResetZoomScale}
       >
         <Image
         resizeMode="contain"
         style={{
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height
          }}
          onLoad={(e)=>{ this.setState({imageHeight:e.nativeEvent.source.height , imageHWidth:e.nativeEvent.source.width , loading:false});}}
          source={{uri:this.props.source 
            // , cache: 'only-if-cached'
          }}
         />
       </TouchableHighlight>
     </ScrollView>
   )
  }
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:"center",
    justifyContent:"center"
    }
  })