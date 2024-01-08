import * as React from 'react';
import { 
  StyleSheet ,
  SafeAreaView,
  Dimensions,
  View,
  Text,
 } from 'react-native';
const Dev_Height = Dimensions.get("window").height
const Dev_Width = Dimensions.get("window").width
import Headerv1 from './src/components/Header';

export default class App extends React.Component {

  render(){
    return(
      <SafeAreaView style={styles.contanier}>
        <Headerv1 />
        <Text style={styles.titleText}>This app is in Testing Mode</Text>
    </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  contanier:{
    height:Dev_Height,
    width:Dev_Width
  },titleText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginTop: 30,
  },
})