import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Audio } from 'expo-av';
import RecordButton from '@/components/RecordButton';

export default function App() {
  const [recording, setRecording] = useState();
  const [sound, setSound] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [urlSound, setUrlSound] = useState();

  async function startRecording() {
    try {
      console.log('Requesting permissions..');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log('Starting recording..');
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await recording.startAsync();
      setRecording(recording);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    console.log('Stopping recording..');
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    const { sound } = await recording.createNewLoadedSoundAsync();
    setSound(sound);
    console.log('Recording stopped and stored');
  }

  async function playSound() {
    if (sound) {
      if (!isPlaying) {
        console.log('Playing Sound');
        await sound.playAsync();
        setIsPlaying(true);
      } else {
        console.log('Pausing Sound');
        await sound.pauseAsync();
        setIsPlaying(false);
      }
    }
  }

  async function playUrlSound() {
    try {
      console.log('Loading sound from URL...');
      const { sound } = await Audio.Sound.createAsync(
        { uri: 'http://malcmind.com/Web-Apps/ai-translation/audioAPI?id=67a5ae5c675b2c59881618a4' }
      );
      setUrlSound(sound);
      console.log('Playing sound from URL');
      await sound.playAsync();
    } catch (error) {
      console.error('Error playing sound from URL:', error);
    }
  }

  useEffect(() => {
    return sound ? () => {
      console.log('Unloading sound on component unmount');
      sound.unloadAsync();
    } : undefined;
  }, [sound]);

  useEffect(() => {
    return urlSound ? () => {
      console.log('Unloading URL sound on component unmount');
      urlSound.unloadAsync();
    } : undefined;
  }, [urlSound]);

  return (
    <View style={styles.container}>
      <Text className='bg-black text-white p-10'>Sound Recorder</Text>
      <RecordButton onPress={recording ? stopRecording : startRecording} />
       <Button
        title={recording ? 'Stop Recording' : 'Start Recording'}
        onPress={recording ? stopRecording : startRecording}
      />
      <Button
        title={sound ? (isPlaying ? 'Pause Playback' : 'Play Sound') : 'No Recording'}
        onPress={playSound}
        disabled={!sound}
      />
      <Button
        title="Play Sound from URL"
        onPress={playUrlSound}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
