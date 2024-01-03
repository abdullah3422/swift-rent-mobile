import React, { useEffect } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

export default function SplashScreen({ navigation }) {

    useEffect(() => {
        const timeout = setTimeout(() => {
            navigation.replace('WelcomeScreen');
        }, 2000);

        // Clear the timeout to prevent memory leaks
        return () => clearTimeout(timeout);
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Image
                source={require("../img/logoColored.png")}
                style={styles.logo}
            />
            <Text style={styles.splashText}>
                Swift Rent
            </Text>
            {/* Remove the Pressable button since the navigation will happen automatically */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: 'center',
        justifyContent: 'center',
    },

    logo: {
        height: 300,
        width: 300,
        marginTop: 20
    },

    splashText: {
        paddingTop: 20,
        fontSize: 50,
        color: "#000",
        fontWeight: 'bold',
    }
});
