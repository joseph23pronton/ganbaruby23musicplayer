import { Text, View, StyleSheet } from 'react-native';
import TrackPlayer, { State, useProgress, useIsPlaying } from 'react-native-track-player';
import Slider from '@react-native-community/slider';
import Entypo from 'react-native-vector-icons/Entypo'
import Feather from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign'
import React from 'react';


function Controlsv1(){
    const { position, buffered, duration } = useProgress()
    const { playing, bufferingDuringPlay } = useIsPlaying();

    const formatSeconds = (time: number) =>
    new Date(time * 1000).toISOString().slice(14, 19);

    async function handlePlayPress() {
      if(await TrackPlayer.getState() == State.Playing) {
        TrackPlayer.pause();
      }
      else {
        TrackPlayer.play();
      }
    }
  
    return(
      <>
    <View style={styles.slider_view}>
      <Text style={styles.slider_time}> {formatSeconds(position)} </Text>
        <Slider
              style={styles.slider_style}
              minimumValue={0}
              maximumValue={duration}
              minimumTrackTintColor="#e75480"
              maximumTrackTintColor="#d3d3d3"
              thumbTintColor="#e75480"
              onValueChange={TrackPlayer.seekTo}
              value={position}
            />
      <Text style={styles.slider_time}>{formatSeconds(Math.max(0, duration - position))}</Text>
    </View>
  
    <View style={styles.functions_view}>
      <Entypo name="shuffle" size={24} color="#e75480" style={{marginLeft:"9%"}}/>
      <Entypo name="controller-fast-backward" size={24} color="#e75480" style={{marginLeft:"12%"}} onPress={() => TrackPlayer.skipToPrevious()}/>
      <AntDesign name={playing ? 'pausecircle' : 'playcircleo'} size={50} color="#e75480" style={{marginLeft:"12%"}} onPress={handlePlayPress}/>
      <Entypo name="controller-fast-forward" size={24} color="#e75480" style={{marginLeft:"12%"}} onPress={() => TrackPlayer.skipToNext()}/>
      <Feather name="repeat" size={20} color="#e75480" style={{marginLeft:"10%"}}/>
    </View></>);
  }
  const styles = StyleSheet.create({
    slider_view:{
      height:"10%",
      width:"100%",
      alignItems:"center",
      flexDirection:"row"
    },
    slider_style:{
      height:"70%",
      width:"60%"
    },
    slider_time:{
      fontSize:15,
      marginLeft:"6%",
      color:"#808080"
    },
    functions_view:{
      flexDirection:"row",
      height:"10%",
      width:"100%",
      alignItems:"center"
    },
    fullScreenImage: {
      flex: 1,
      width: undefined,
      height: undefined,
    },
  })
  export default Controlsv1