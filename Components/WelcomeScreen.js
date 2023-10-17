
import * as React from 'react';
import { StyleSheet, Text, View,Image,Pressable, TouchableOpacity} from 'react-native';


export default function WelcomeScreen({navigation}) {

    // let [fontsLoad] = useFonts({OpenSans_Bold});
    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <Image source={require('../img/logoColored.png')} style={styles.logo} />
                <Text style={styles.headerText}>Swift Rent</Text>
            </View>

            <Text style={styles.welcomeText}>Welcome!</Text>
            <Pressable style={styles.button} onPress={() => console.log('Login Pressed')}>
                <Text style={styles.buttonText}>Login</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => console.log('Create Account Pressed')}>
                <Text style={styles.buttonText}>Create Account</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('LoginScreen')}>
                <Text>Next</Text>
            </Pressable>

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
        marginBottom: 20

    },
    button: {
        width: '60%',
        paddingVertical: 25,
        padding: 20,
        backgroundColor: '#47B5FF',
        marginTop: 20,
        borderRadius: 20,
        borderColor: '#1363DF',
        borderWidth: 1.5,


        // borderRadius: "5"
    },
    buttonText: {
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 28,

    },
    footerContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
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