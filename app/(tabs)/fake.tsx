import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Audio } from 'expo-av';

export default function App() {
  const [recording, setRecording] = useState();
  const [sound, setSound] = useState();
  const [isPlaying, setIsPlaying] = useState(false);

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
            console.log("Playing Sound");
            await sound.playAsync();
            setIsPlaying(true); // Set isPlaying to true
        } else {
            console.log("Pausing Sound");
            await sound.pauseAsync();
            setIsPlaying(false); // Set isPlaying to false
        }
    }
  }

  useEffect(() => {
    return sound ? () => {
        console.log("Unloading sound on component unmount");
        sound.unloadAsync(); } : undefined;
  }, [sound]);


  return (
    <View style={styles.container}>
      <Text>Sound Recorder</Text>
      <Button
        title={recording ? 'Stop Recording' : 'Start Recording'}
        onPress={recording ? stopRecording : startRecording}
      />
      <Button
        title={sound ? (isPlaying ? 'Pause Playback': 'Play Sound') : 'No Recording'}
        onPress={playSound}
        disabled={!sound}
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