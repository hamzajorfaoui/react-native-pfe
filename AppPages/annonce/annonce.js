import * as React from 'react';
import { View, Text , StyleSheet  , ScrollView , RefreshControl} from 'react-native';
import {getAnnonces} from '../AppService';
import { Card } from 'react-native-elements';
import Moment from 'moment';

export default class Annonce extends React.Component{ 


        
    constructor(props){ 
        super(props); 

        this.state={
            annonces:[],
            refreshing:true
        }
        this._isMounted = false;
    }
    componentDidMount(){
        this._isMounted = true;
        this.loadannonces();
    }
    componentWillUnmount(){
        this._isMounted = false;
    }
    convert_date(d){
        let date = Moment(d);
        date.locale('fr');
        return date.format('MMMM Do YYYY, h:mm a');
    }
    loadannonces=()=>{
        getAnnonces().then(data=>{
            var dt = data.data.data[0].date_prevue;
            this.convert_date(dt);
            if(this._isMounted){
            this.setState({annonces:data.data.data},()=>{ this.setState({refreshing:false})});
           }
        })
    } 


    render(){
        return(
            <View style={styles.container}>
             <ScrollView 
             refreshControl={
                <RefreshControl
                  tintColor="#35b546"
                  refreshing={this.state.refreshing}
                  onRefresh={() => {
                    this.setState({refreshing:true})
                    this.loadannonces();
                  }}
                  // Android offset for RefreshControl
                  progressViewOffset={0}
                />
              }
              contentInset={{
                top: 0,
              }}
              contentOffset={{
                y: -0,
              }}
             style={styles.container}>
             {

            this.state.annonces.map((annonce, i) => {
            return <Card 
                    key={i}
                    title={annonce.typeannonce} 
                    containerStyle={styles.card}
                    dividerStyle={styles.carddriver}
                    titleStyle={styles.cardtitle}
                    >
            <View style={styles.content}>

            <View style={{marginBottom:10}}>
               <View style={styles.Row}>
                          <Text style={styles.annonce_title}>Professeur : </Text>
                          <Text style={styles.annonce_content}>{annonce.prof}</Text>
                </View>
             </View>

              <View style={styles.cardcontent}>

                    <View style={styles.Row}>
                          <Text style={styles.annonce_title}>Matiere : </Text>
                          <Text style={styles.annonce_content}>{annonce.matiere}</Text>
                    </View>
                    <View style={styles.Row}>
                          <Text style={styles.annonce_title}>Salle : </Text>
                          <Text style={styles.annonce_content}>{annonce.salle}</Text>
                    </View>
               </View>
               <View style={{marginBottom:10}}>

                    <View style={styles.Row}>
                          <Text style={styles.annonce_title}>Date Prévue : </Text>
                          <Text style={styles.annonce_content}>{this.convert_date(annonce.date_prevue) }</Text>
                    </View>
               </View>
               <View>
                    <View style={styles.Row}>
                        <Text style={styles.annonce_title}>Date aura lieu : </Text>
                        <Text style={styles.annonce_content}>{this.convert_date(annonce.date_auralieu)}</Text>
                    </View>
                </View>

            </View>
 
            </Card>
            })
        }

             </ScrollView>
            </View>
        )
    }

}

const styles = StyleSheet.create({
  container:{
    flex:1,
    // alignItems:"center",
    // justifyContent:"center"
    },
    card:{
       margin:2,
       paddingTop:5,
       paddingRight:0,
       paddingLeft:0
    },
    cardtitle:{
      fontSize:20,
      color:"#35b546",
      height:25,
      marginTop:0,
    },
    carddriver:{
        height:1,
        backgroundColor:"#35b546"
    },
    cardcontent:{
     display:'flex',
     flexDirection:'row',
     marginBottom:10
    },
    annonce_title:{
        fontWeight:"bold",
        fontSize:15,
        color:"#237e2f"
    },
    annonce_content:{
        fontSize:15
    },
    Row:{
        flex:1 , 
        flexDirection:'row'
    },
    content:{
        padding:5
    }


})