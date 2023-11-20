import * as React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useEffect} from "react";


export default function SplashScreen({navigation}) {
    useEffect(() => {
        const timeout = setTimeout(() => {
            navigation.replace('LoginAs');
        }, 1500);

        // Clear the timeout to prevent memory leaks
        return () => clearTimeout(timeout);
    },[navigation]);

    return (
        <View style ={styles.container}>
            <Text style={styles.splashText}>
               You are all {'\n'}Set Up!
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: - 150
    },
    splashText: {
        paddingTop: 20,
        fontSize: 65,
        color:"#47b5ff",
        fontWeight: 'bold',
        textAlign: "center"
    }
});
