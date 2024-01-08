import TrackPlayer from 'react-native-track-player';

export async function addTracks() {
  try {
    const response = await fetch('https://raw.githubusercontent.com/joseph23pronton/ganbaruby23musicplayer/main/serverList.json');
  
    if (!response.ok) {
      throw new Error('Failed to fetch playlist');
    }
  
    const tracks = await response.json();
  
    if (!tracks || !Array.isArray(tracks) || tracks.length === 0) {
      throw new Error('Empty or invalid playlist');
    }
  
    await TrackPlayer.add(tracks);
  } catch (error) {
    console.error('Error fetching playlist:', error.message);
    // Display a message on the screen indicating that the playlist is unreachable
  }
  }