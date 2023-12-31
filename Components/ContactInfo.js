import * as React from 'react';
import { Alert, Dimensions, TextInput, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useState } from "react";
import axios from "axios";
import { Formik } from 'formik';
import * as Yup from 'yup';

export default function LoginScreen({ navigation, route }) {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    // Routing the ipAddress as a prop through the route keyword
    const ipAddress = route.params.ipAddress;
    console.log(route.params);
    const handleNext = async (values) => {
        try {
            console.log(values.email);
            console.log(values.phoneNumber);
            if ( values.email !== '' || values.phoneNumber !== '' ){
                const response = await axios.post(ipAddress + 'api/signup-contact', {
                    email: values.email,
                    phone: values.phoneNumber,
                });
                if (response.data.success) {
                    // Navigate to the next screen or perform other actions
                    const { userType, firstName, lastName, DOB } = route.params;
                    let email = values.email, phone = values.phoneNumber;
                    console.log(userType);
                    console.log(firstName);
                    console.log(lastName);
                    console.log(DOB);
                    console.log(phone);
                    navigation.navigate('SetPassword', { userType, firstName, lastName, DOB, email, phone});
                } else {
                    // Handle errors, show appropriate messages to the user
                    console.error('API Error:', response.data.error, response.statusText);
                }
            }else {
                Alert.alert('Fields Cannot be Empty','Please make sure that either email or phone is entered.')
            }
        } catch (error) {
            console.log('Network Error:', error);
            const lastThreeNumbers = String(error).match(/\d{3}$/);
            if (String(lastThreeNumbers) === "420"){
                Alert.alert("Credential(s) not unique");
            }
            // Handle network errors, show appropriate messages to the user
        }
    };

    const loginSchema = Yup.object().shape({
        email: Yup.string()
            .email('Invalid email address')
            .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email address'),
        phoneNumber: Yup.string()
            .matches(/^\d{11}$/, 'Invalid phone number'),
    });

    return (
        <Formik
            initialValues={{
                email: '',
                phoneNumber: '',
            }}
            validationSchema={loginSchema}
            onSubmit={handleNext}
        >
            {({ values, errors, touched, handleChange, setFieldTouched, isValid, handleSubmit }) => (
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
                                value={values.email}
                                onChangeText={handleChange('email')}
                                onBlur={() => setFieldTouched('email')}
                            />
                            <Image source={require('../img/email.png')} style={styles.imageStyle} />
                        </View>
                        {touched.email && errors.email && <Text style={styles.errorTxt}>{errors.email}</Text>}
                    </View>

                    <View style={styles.inputContainer}>
                        <View style={styles.inputWithIcon}>
                            <TextInput
                                style={styles.input}
                                placeholder="Mobile Number"
                                placeholderTextColor="#888"
                                keyboardType="numeric"
                                value={values.phoneNumber}
                                onChangeText={handleChange('phoneNumber')}
                                onBlur={() => setFieldTouched('phoneNumber')}
                            />
                            <Image source={require('../img/hashtag.png')} style={styles.imageStyle} />
                        </View>
                        {touched.phoneNumber && errors.phoneNumber && <Text style={styles.errorTxt}>{errors.phoneNumber}</Text>}
                    </View>

                    <View style={styles.buttonContainer}>
                        <Pressable onPress={() => navigation.goBack()} style={styles.button} >
                            <Text style={styles.buttonText}>Back</Text>
                        </Pressable>
                        <View style={styles.space} />
                        <Pressable style={styles.button} onPress={handleSubmit}>
                            <Text style={styles.buttonText}>Next</Text>
                        </Pressable>
                    </View>
                </View>
            )}
        </Formik>
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
        marginBottom: windowHeight * 0.0125,
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
    errorTxt: {
        fontSize: windowWidth * 0.03,
        color: '#FF0D10',
    },
});