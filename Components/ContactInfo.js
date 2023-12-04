import * as React from 'react';
import {Alert, Dimensions, Image, Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {useState} from "react";
import axios from "axios";

export default function LoginScreen({ navigation }) {

    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const handleNext = async () => {
        try {
            console.log(email);
            console.log(phone);

            const response = await axios.post('http://192.168.1.9:3000/api/signup-contact', {
                email: email,
                phone: phone,
            });

            // Check the response for success or error
            if (response.data.success) {
                // Navigate to the next screen or perform other actions
                navigation.navigate('SetPassword');
                Alert.alert('Credentials are Unique!');
            } else {
                // Handle errors, show appropriate messages to the user
                console.error('API Error:', response.data.error, response.statusText);
            }
        } catch (error) {
            console.error('Network Error:', error);
            // Handle network errors, show appropriate messages to the user
        }
    };
    return (
        <View style={styles.container}>

                <Image source={require('../img/logoColored.png')} style={styles.logo} />


            <Text style={styles.headerText}>We need your information</Text>
            <View style={styles.inputContainer}>
                <View style={styles.inputWithIcon}>
                    <TextInput
                        style={styles.input}
                        placeholder="Email Address"
                        placeholderTextColor="#888"
                        keyboardType="email-address"
                        value={email}
                        onChangeText={setEmail}/>
                    <Image source={require('../img/email.png')} style={styles.imageStyle} />
                </View>
            </View>

            <View style={styles.inputContainer}>
                <View style={styles.inputWithIcon}>
                    <TextInput
                        style={styles.input}
                        placeholder="Mobile Number"
                        placeholderTextColor="#888"
                        keyboardType="numeric"
                        value={phone}
                        onChangeText={setPhone}/>
                    <Image source={require('../img/hashtag.png')} style={styles.imageStyle} />
                </View>
            </View>

            <View style={styles.buttonContainer}>
                <Pressable onPress={() => navigation.goBack()} style={styles.button} >
                    <Text style={styles.buttonText}>Back</Text>
                </Pressable>
                <View style={styles.space} />
                <Pressable style={styles.button} onPress={handleNext}>
                    <Text style={styles.buttonText}>Next</Text>
                </Pressable>
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
        width: '100%',
        padding: windowWidth * 0.05,
    },
    logo: {
        width: windowWidth * 0.25,
        height: windowWidth * 0.25,
        marginTop: -windowHeight * 0.25,
    },

    headerText: {
        fontSize: windowWidth * 0.07,
        marginTop: windowHeight * 0.02,
        fontWeight: 'bold',
        marginBottom: windowHeight * 0.02,
        color: '#47b5ff',
    },
    inputContainer: {
        marginBottom: windowHeight * 0.0125,    // = 10
    },
    inputWithIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        width: windowWidth * 0.8,
        borderColor: '#06283d',
        borderWidth: 2,
        borderRadius: windowWidth * 0.05,
        backgroundColor: '#fff',
        marginBottom: windowHeight * 0.01,
        position: 'relative',
    },
    input: {
        width: '90%',
        height: windowHeight * 0.06,
        padding: windowWidth * 0.03,
        // fontWeight: 'bold',
    },
    imageStyle: {
        position: 'absolute',
        right: windowWidth * 0.025,
        width: 25,
        height: 25,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '55%',
        marginTop: windowHeight * 0.02,
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e5e5e5',
        borderColor: '#cdcdcd',
        borderWidth: 2,
        borderRadius: windowWidth * 0.06,
        padding: windowWidth * 0.02,
    },
    space: {
        width: windowWidth * 0.04,
    },
    buttonText: {
        color: 'black',
    },
});
