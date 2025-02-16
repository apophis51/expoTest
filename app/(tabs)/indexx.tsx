import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Audio } from 'expo-av';
import { WebView } from 'react-native-webview';
import Constants from 'expo-constants';


export default function App() {
    const [hasPermission, setPermission] = useState(false)



    useEffect(() => {
        (async () => {
            await Audio.requestPermissionsAsync()
            setPermission(true)

        }

        )();
    }, []);


    return (
        <>
            {hasPermission && <WebView
                style={styles.container}
                source={{ uri: 'https://malcmind.com/Web-Apps/ai-traslation' }}
            />}
        </>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
    },
});