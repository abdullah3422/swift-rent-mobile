import * as React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';


export default function SplashScreen({navigation}) {

    return (
        <View style ={styles.container}>
            <Text style={styles.splashText}>
               You are all {'\n'}Set Up!
            </Text>
            <Pressable onPress={() => navigation.navigate('AnalyticsOwner')}>
                <Text style={{paddingTop: 15}}>Next</Text>
            </Pressable>
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
