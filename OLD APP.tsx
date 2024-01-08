import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Button,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
  Text,
  Image,
  ImageBackground,
} from 'react-native';
import TrackPlayer, { useTrackPlayerEvents, usePlaybackState, Event, useProgress, State } from 'react-native-track-player';
import { addTracks } from './addTrack';
import { setupPlayer } from './trackPlayerServices';
import * as Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Slider from '@react-native-community/slider';
import TrackProgress from './src/TrackProgress';
import Header from './src/Header';
import Playlist from './src/Playlist';
import { getPlaybackState } from 'react-native-track-player/lib/trackPlayer';
import PlayPauseButton from './src/PlayPauseButton';
import { TrackInfo } from './src/TrackInfo';

function calculateProgress(currentTime?: number, totalDuration?: number, decimalPlaces: number = 2): number {
  if (!currentTime || !totalDuration || currentTime <= 0 || totalDuration <= 0) {
    return 0;
  }

  const rawProgress = currentTime / totalDuration;
  const roundedProgress = Number(rawProgress.toFixed(decimalPlaces));
  return Math.min(1, roundedProgress);
}

function App() {
  const { position, buffered, duration } = useProgress()
  const [isPlayerReady, setIsPlayerReady] = useState(false);

const totalDuration = duration; // Total duration in seconds
const currentTime = position; // Current time in seconds

const progressbarposition = calculateProgress(currentTime, totalDuration);
  useEffect(() => {
    async function setup() {
      let isSetup = await setupPlayer();

      const queue = await TrackPlayer.getQueue();
      const position = await TrackPlayer.getPosition();
      const duration = await TrackPlayer.getDuration();

      if(isSetup && queue.length <= 0) {
        await addTracks();
      }
      setIsPlayerReady(isSetup);
      console.log(`${duration - position} seconds left.`);
      console.log (progressbarposition);
    }

    setup();
  }, []);

  if(!isPlayerReady) {
    return (
      <SafeAreaView style={styles.splashcontainer}>
        <ImageBackground 
        source={require('./src/splashscreen.png')}
        style={styles.fullScreenImage}
        resizeMode="cover" // Adjust the resizeMode based on your needs
        >
        <ActivityIndicator size="large" color="#bbb"/>
        </ImageBackground>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header/>
      <TrackProgress/>
      <Progress.Bar progress={progressbarposition} width={null} />
      <Slider minimumValue={0}
              value={position}
              style={styles.sliders}
              onValueChange={TrackPlayer.seekTo}
              maximumValue={duration}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#000000"
      />
      <PlayPauseButton/>
      <Playlist/>
      <Text>Track progress: {position} seconds out of {duration} total. Progress Bar Percentage : {progressbarposition}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#9f9f98'
  },
  splashcontainer: {
    flex: 1,
  }, sliders: {
    width: '100%',
  },
  playlist: {
    backgroundColor: '#113',
    marginTop: 40,
    marginBottom: 40
  },
  playlistItem: {
    fontSize: 16,
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 4
  },
  trackProgress: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 24,
    color: '#eee'
  },
  songTitle: {
    fontSize: 32,
    marginTop: 50,
    color: '#ccc'
  },
  artistName: {
    fontSize: 24,
    color: '#888'
  },
  fullScreenImage: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
});

