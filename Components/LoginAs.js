import * as React from 'react';
import {Dimensions, Image, Pressable, StyleSheet, Text, View} from 'react-native';


export default function LoginAs({navigation}) {

    // let [fontsLoad] = useFonts({OpenSans_Bold});
    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <Image source={require('../img/logoColored.png')} style={styles.logo} />

            </View>

            <Text style={styles.LoginAs}>Login As</Text>
            <Pressable style={styles.button} onPress={() => navigation.navigate('WhoAreYou')}>
                <Text style={styles.buttonText}>Property Owner</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => navigation.navigate('WhoAreYou')}>
                <Text style={styles.buttonText}>Property Agent</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => navigation.navigate('WhoAreYou')}>
                <Text style={styles.buttonText}>Tenant</Text>
            </Pressable>


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
        marginTop: -windowHeight * 0.1
    },
    logo: {
        width: windowWidth * 0.25,
        height: windowWidth * 0.25,
    },
    header: {
        flexDirection: 'row',
        alignItems:'center',
    },

    headerText:{
        fontSize: windowWidth * 0.06,
        paddingTop: windowHeight * 0.15,
        color: "#1363DF",
        fontWeight: 'bold'
    },
    LoginAs: {

        marginTop: windowHeight * 0.025,    // = 20
        fontSize: windowWidth * 0.08,
        fontWeight: 'bold',
        marginBottom: windowHeight * 0.025,  // = 30
        color: '#47b5ff'

    },
    button: {
        width: '60%',
        paddingVertical: windowHeight * 0.02,  // = 15
        padding: windowHeight * 0.025,
        backgroundColor: '#e5e5e5',
        marginTop: windowHeight * 0.025,    // =20
        borderRadius: windowHeight * 0.3,
        borderColor: '#cdcdcd',
        borderWidth: windowHeight * 0.002,  // = 2


        // borderRadius: "5"
    },
    buttonText: {
        color: '#06283d',
        textAlign: 'center',
        fontSize: windowWidth * 0.05,       // = 20

    },

});