
import * as React from 'react';
import {StyleSheet, Text, View, Image, Pressable} from 'react-native';
import WelcomeScreen from "./WelcomeScreen";

export default function SplashScreen({navigation}) {

    return (
        <View style ={styles.container}>
            <Text style={styles.splashText}>
               You are all Set Up!
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
        marginTop: - 400
    },
    splashText: {
        paddingTop: 20,
        fontSize: 50,
        color:"#1363DF",
        fontWeight: 'bold',
    }
});
