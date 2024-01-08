import { 
  Text, 
  View, 
  StyleSheet ,
 } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'

function NowPlaying() {  
  return (
    <>
    <View style={styles.mainbar}>
      <AntDesign name="left" size={24} style={{marginLeft:"5%"}} />
      <Text style={styles.now_playing_text}> Now Playing </Text>
      <Entypo name="dots-three-horizontal" size={24} style={{marginLeft:"20%"}} />
    </View>
  </>
  );
  }
  const styles = StyleSheet.create({
    mainbar:{
      height:"10%",
      width:"100%",
      flexDirection:"row",
      alignItems:"center",
    },
    now_playing_text:{
      fontSize:19,
      marginLeft:"24%"
    }
  })
  export default NowPlaying