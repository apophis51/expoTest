import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';

const RecordButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
      <View style={styles.circle} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: 60, // Diameter of the circle
    height: 60,
    borderRadius: 30, // Half of width/height to make it a circle
    backgroundColor: 'red',
    elevation: 5, // Shadow for Android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});

export default RecordButton;
