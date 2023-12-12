import React, { useState } from 'react';
import {Image, Pressable, StyleSheet, Text, TextInput, View, Alert, Dimensions} from 'react-native';
import axios from 'axios';
import { md5 } from 'js-md5';


export default function LoginScreen({ navigation, route }) {

    const [emailOrPhone, setEmailOrPhone] = useState('');
    const [password, setPassword] = useState('');

    const ipAddress = route.params.ipAddress;

    const handleLogin = async () => {
        try {
            const response = await axios.post(ipAddress + 'api/login', {
                emailOrPhone: emailOrPhone,
                password: md5(password)
            });

            if (response.data.success) {
                console.log('Login Successful');
                Alert.alert('Login Successful!');

                // Extracting ownerId and tenantId from the response
                const { userID, ownerID, tenantID } = response.data;

                if (ownerID !== 0 && tenantID !== 0) {
                    navigation.navigate('LoginAs', { userID ,ownerID, tenantID });
                } else if (ownerID !== 0) {
                    navigation.navigate('NotificationAlerts', { userID, ownerID});
                } else if (tenantID !== 0) {
                    Alert.alert("Not Developed Yet :(");
                    //navigation.navigate('NotificationAlerts', { userID, tenantID });
                }

            } else {
                console.log('Login Failed:', response.data.error);
                Alert.alert('Login Failed', response.data.error);
            }
        } catch (error) {
            console.error('Login Error:', error);
            Alert.alert('Login Error', 'Email or Password Invalid!');
        }
    };


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={require('../img/logoColored.png')} style={styles.logo} />
            </View>
            <Text style={styles.loginText}>Login</Text>

            <View style={styles.input}>
                <TextInput
                    placeholder="Email or Number"
                    placeholderTextColor="#cdcdcd"
                    style={styles.textInput}
                    value={emailOrPhone}
                    onChangeText={setEmailOrPhone}
                />
                <View style={styles.iconContainer}>
                    <Image source={require('../assets/userIcon.png')} style={styles.placeholderIcon} />
                </View>
            </View>
            <View style={styles.input}>
                <TextInput
                    placeholder="Password"
                    placeholderTextColor="#cdcdcd"
                    style={styles.textInput}
                    secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword}
                />
                <View style={styles.iconContainer}>
                    <Image source={require('../assets/eye.png')} style={styles.placeholderIcon} />
                </View>
            </View>

            <View style={styles.buttonContainer}>
                <Pressable style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Continue</Text>
                </Pressable>
                <View style={styles.space} />
            </View>
        </View>
    );
}
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginTop: -windowHeight *0.11,
    },
    logo: {
        width: windowWidth * 0.25,
        height: windowWidth * 0.25,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: windowHeight * 0.025,
        marginBottom: windowHeight * 0.0125,
    },
    input: {
        flexDirection: 'row',
        alignItems: 'center',
        width: windowHeight * 0.33,     // = 250
        height: windowHeight * 0.055,
        borderColor: '#06283d',
        borderWidth: 2,
        borderRadius: 15,
        padding: windowHeight * 0.013,      //  = 10
        marginTop: windowHeight * 0.003,    //= 3
        marginBottom: windowHeight * 0.01,
        backgroundColor: '#fff',
        fontWeight: 'bold',
    },
    placeholderIcon: {
        width: windowHeight * 0.025,
        height: windowHeight * 0.025,

    },
    textInput: {
        flex: 1,
        color: '#06283d',
    },
    iconContainer: {
        justifyContent: 'flex-end',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: windowWidth * 0.38, // = 150
        marginTop:  windowHeight * 0.02,
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: windowWidth * 0.4,
        backgroundColor: '#e5e5e5',
        borderColor: '#cdcdcd',
        borderWidth: 2,
        borderRadius: 30,
        padding: windowHeight * 0.013,
    },
    space: {
        width: windowHeight * 0.01,
    },
    buttonText: {
        color: '#06283d',

    },
    loginText: {
        color: "#47B5FF",
        fontSize: windowWidth * 0.07,
        fontWeight: 'bold',
        marginBottom: windowHeight * 0.013,

    },

});

