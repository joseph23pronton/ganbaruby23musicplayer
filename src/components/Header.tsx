import { 
    Text, 
    View, 
    StyleSheet ,
    SafeAreaView,
    ImageBackground,
    ActivityIndicator,
   } from 'react-native';
import { useEffect, useState } from 'react';
import TrackPlayer, { useActiveTrack, useTrackPlayerEvents, usePlaybackState, Event, State, useIsPlaying, useProgress } from 'react-native-track-player';
import { setupPlayer } from '../../trackPlayerServices';
import { addTracks } from '../../addTrack';
import Controlsv1 from './Controls';
import NowPlaying from './NowPlaying';
import { TrackInfo } from './TrackInfo';


function Header() {
    const [isPlayerReady, setIsPlayerReady] = useState(false);
    const [info, setInfo] = useState({});
    const track = useActiveTrack();
  
  
  
    useEffect(() => {
      async function setup() {
        let isSetup = await setupPlayer();
  
        const queue = await TrackPlayer.getQueue();
  
        if (isSetup && queue.length <= 0) {
          await addTracks();
        }
        setIsPlayerReady(isSetup);
      }
  
      setup();
    }, []);
  
  
    if (!isPlayerReady) {
      return (
        <SafeAreaView style={styles.splashcontainer}>
          <ImageBackground
            source={require('../splashscreen.png')}
            style={styles.fullScreenImage}
            resizeMode="cover" // Adjust the resizeMode based on your needs
          >
            <ActivityIndicator size="large" color="#bbb" />
          </ImageBackground>
        </SafeAreaView>
      );
      
    }
    return(
      <>
      <NowPlaying />
      <TrackInfo track={track} />
      <Controlsv1 />
      </>
    );
  }

  const styles = StyleSheet.create({
    splashcontainer: {
      flex: 1,
    },
    fullScreenImage: {
      flex: 1,
      width: undefined,
      height: undefined,
    },
  })
  export default Header