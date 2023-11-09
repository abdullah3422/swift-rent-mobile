import * as React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';

export default function SplashScreen({navigation}) {

    // let [fontsLoad] = useFonts({OpenSans_Bold});
    return (


        <View style ={styles.container}>
            <Image
                source={require("../img/logoColored.png")}
                style={styles.logo}
            />
            <Text style={styles.splashText}>
                Swift Rent
            </Text>
            <Pressable onPress={() => navigation.navigate('WelcomeScreen')}>
                <Text>Next</Text>
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
    },

    logo: {
        height: 300,
        width: 300,
        marginTop: 20
    },

    splashText: {
        paddingTop: 20,
        fontSize: 50,
        color:"#1363DF",
        fontWeight: 'bold',



    }
});
