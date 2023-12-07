import * as React from 'react';
import {Alert, Dimensions, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {useState} from "react";
import axios from "axios";


export default function LoginAs({navigation, route}) {

    const [userType, setUserType] = useState('');

    const ipAddress = route.params.ipAddress;
    const handleRole = async (role) => {
        try {
            // Save the role into the userType state
            setUserType(role);

            console.log(userType);

            const response = await axios.post(ipAddress + 'api/register-account', {
                userType: role,
            });

            if (response.data.success) {
                // Navigate to the next screen or perform other actions
                navigation.navigate('SetPassword');
                console.log('User-Type-Added: ' + role);
            } else {
                // Handle errors, show appropriate messages to the user
                console.error('API Error:', response.data.error, response.statusText);
            }
        } catch (error) {
            console.error('Network Error:', error);
        }
    };



    // let [fontsLoad] = useFonts({OpenSans_Bold});
    return (


        <View style={styles.container}>

            <View style={styles.header}>
                <Image source={require('../img/logoColored.png')} style={styles.logo} />
            </View>
            <Text style={styles.postHeader}>Who are you?</Text>

            <Pressable style={styles.button} onPress={() => handleRole('owner')}>
                <Text style={styles.buttonText}>Property Owner</Text>
            </Pressable>
            {/*<Pressable style={styles.button} onPress={() => navigation.navigate('GetToKnow')}>*/}
            {/*    <Text style={styles.buttonText}>Property Agent</Text>*/}
            {/*</Pressable>*/}
            <Pressable style={styles.button} onPress={() => navigation.navigate('GetToKnow')}>
                <Text style={styles.buttonText}>Tenant</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('GetToKnow')}>
                <Text style={styles.newRoleText}>Create new role on existing credentials?</Text>
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
    postHeader: {

        marginTop: windowHeight * 0.025,
        fontSize: windowWidth * 0.077, // = 30
        fontWeight: 'bold',
        marginBottom: windowHeight * 0.025,
        color: '#47b5ff'

    },
    newRoleText:{
        marginTop: windowHeight *0.05,  // This will make the text fall almost to the end of the screen
        marginBottom: windowHeight * 0.03,  // Add some margin at the bottom
        fontSize: windowWidth * 0.04,  // Adjust the font size
        textDecorationLine: 'underline',  // Underline the text
        color: '#06283d',
    }

});