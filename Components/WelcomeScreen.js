import * as React from 'react';
import {Alert, BackHandler, Dimensions, Image, Pressable, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useFocusEffect} from "@react-navigation/native";


export default function WelcomeScreen({navigation}) {
    useFocusEffect(
        React.useCallback(() => {
            const backAction = () => {
                Alert.alert(
                    'Confirm Exit',
                    'Are you sure you want to exit the app?',
                    [
                        {
                            text: 'Cancel',
                            onPress: () => null,
                            style: 'cancel',
                        },
                        {
                            text: 'Exit',
                            onPress: () => BackHandler.exitApp(),
                        },
                    ],
                    { cancelable: false }
                );
                return true; // Return true to prevent the default behavior (closing the app)
            };

            const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

            return () => backHandler.remove(); // Clean up the event listener when the component unmounts
        }, [])
    );
    let flag = 0;
    // let [fontsLoad] = useFonts({OpenSans_Bold});
    return (

        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={require('../img/logoColored.png')} style={styles.logo} />
            </View>

            <Text style={styles.welcomeText}>Welcome to {'\n'}Swift Rent</Text>
            <Pressable style={styles.button}
                       onPress={() => navigation.navigate('WhoAreYou')}>
                <Text style={styles.buttonText}>Sign-up</Text>
            </Pressable>
            <Pressable style={styles.loginText} onPress={() => navigation.navigate('LoginScreen', { flag })}>
                <Text style={{fontSize: 16}}>Already have an account? </Text>
                <Text style={{color:"#47b5ff", fontWeight: "bold", fontSize: 16}}>LogIn</Text>
            </Pressable>


            {/*<View style={styles.footerContainer}>*/}
            {/*    <View style={styles.centeredContent}>*/}
            {/*        <Image source={require('../img/langIcon.png')} style={styles.earthImage} />*/}
            {/*        <Text style={styles.selectLanguageText}>Select Language</Text>*/}
            {/*        <TouchableOpacity onPress={() => console.log('Dropdown Arrow Pressed')}>*/}
            {/*            <Image source={require('../img/dropDownArrow.png')} style={styles.dropdownArrow} />*/}
            {/*        </TouchableOpacity>*/}
            {/*    </View>*/}
            {/*</View>*/}

        </View>

    );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#fff",
        marginTop: "auto"
    },
    logo: {
        width: windowWidth * 0.25,
        height: windowWidth * 0.25,
    },
    header: {
        flexDirection: 'row',
        alignItems:'center',

    },
    welcomeText: {

        marginTop: windowHeight * 0.03,     // = 20
        fontSize: windowWidth * 0.07,
        fontWeight: 'bold',
        marginBottom: windowHeight * 0.03,
        color: "#47b5ff",
        textAlign: "center"

    },
    button: {
        width: '60%',
        paddingVertical: 2,
        backgroundColor: '#e5e5e5',
        marginTop: windowWidth * 0.38,
        borderRadius: 100,
        borderColor: '#cdcdcd',
        borderWidth: 1.5,
        marginBottom: windowHeight * 0.013

    },
    buttonText: {
        color: '#06283d',
        textAlign: 'center',
        fontSize: 25,

    },
    loginText: {

      paddingTop: 5,
        flexDirection: "row",

    },
    footerContainer: {
        position: 'absolute',
        bottom: 20,
        width: '50%',
        backgroundColor: '#e5e5e5',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 2,
        borderRadius: 30,
        paddingRight: -5


    },
    earthImage: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
        marginRight: 10,
        paddingRight: 10,
        paddingLeft: -10
    },
    selectLanguageText: {
        flex: 1,
        textAlign: 'center',
        fontSize: 12,

    },
    dropdownArrow: {
        width: 12,
        height: 12,
        marginTop: 4,
        marginLeft: 7
    },
    centeredContent: {
        flexDirection: 'row',
        // justifyContent: 'center',
        alignItems: 'center',
        marginRight: 24,
        marginLeft: 24,

    }
});