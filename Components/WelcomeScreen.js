import * as React from 'react';
import {Image, Pressable, StyleSheet, Text, TouchableOpacity, View} from 'react-native';


export default function WelcomeScreen({navigation}) {

    // let [fontsLoad] = useFonts({OpenSans_Bold});
    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <Image source={require('../img/logoColored.png')} style={styles.logo} />
            </View>

            <Text style={styles.welcomeText}>Welcome to {'\n'}Swift Rent</Text>
            <Pressable style={styles.button}
                       onPress={() => navigation.navigate('LoginScreen')}>
                <Text style={styles.buttonText}>Get Started</Text>
            </Pressable>
            <Text style={styles.loginText}>Already have an account? LogIn</Text>

            <View style={styles.footerContainer}>
                <View style={styles.centeredContent}>
                    <Image source={require('../img/langIcon.gif')} style={styles.earthImage} />
                    <Text style={styles.selectLanguageText}>Select Language</Text>
                    <TouchableOpacity onPress={() => console.log('Dropdown Arrow Pressed')}>
                        <Image source={require('../img/dropDownArrow.png')} style={styles.dropdownArrow} />
                    </TouchableOpacity>
                </View>

            </View>

        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#fff",
        marginTop: -250
    },
    logo: {
        width: 100,
        height: 100,
    },
    header: {
        flexDirection: 'row',
        alignItems:'center',

    },

    headerText:{
        fontSize: 50,
        paddingTop: 15,
        color: "#1363DF",
        fontWeight: 'bold'
    },
    welcomeText: {

        marginTop: 20,
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
        color: "#47b5ff"

    },
    button: {
        width: '60%',
        paddingVertical: 2,
        backgroundColor: '#e5e5e5',
        marginTop: 100,
        borderRadius: 100,
        borderColor: '#cdcdcd',
        borderWidth: 1.5,


        // borderRadius: "5"
    },
    buttonText: {
        color: '#06283d',
        // fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 25,

    },
    loginText: {
      color: "#06283d",
      paddingTop: 5
    },
    footerContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: '#e5e5e5',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
    },
    earthImage: {
        width: 30,
        height: 30,
        marginRight: 10,
        paddingRight: 30,
    },
    selectLanguageText: {
        flex: 1,
        textAlign: 'center',
        fontSize: 16,
    },
    dropdownArrow: {
        width: 20,
        height: 20,
        marginTop: 7,
        marginLeft: 7
    },
    centeredContent: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: 100,
        paddingLeft: 100,
    }
});