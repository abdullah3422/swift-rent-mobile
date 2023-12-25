import * as React from 'react';
import {Alert, Dimensions, Image, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import CryptoJS from "react-native-crypto-js";
import { md5 } from 'js-md5';

export default function SetPassword({ navigation, route }) {
    const [passwordsMatch, setPasswordsMatch] = React.useState(true); // Initialize to true initially

    // Routing the ipAddress as a prop through the route keyword
    const ipAddress = route.params.ipAddress;

    const handleRegister = async (values) => {
        try {
            const { userType, firstName, lastName, DOB, email, phone } = route.params;
            console.log(route.params);
            console.log(userType);
            console.log(userType);
            console.log(firstName);
            console.log(lastName);
            console.log(DOB);
            console.log(email);
            console.log(phone);
            let password = values.password;
            console.log(password);


            console.log(ipAddress);
            const response = await axios.post(ipAddress + 'api/register-account', {
                    userType : userType,    firstName : firstName,
                    lastName : lastName,    DOB : DOB,
                    email : email,          phone : phone,
                    password : md5(password)
            });

            if (response.data.success) {
                console.log('Registration successful', response.data);

                // Extracting ownerId and tenantId from the response
                const { userID, ownerID, tenantID } = response.data;
                if (userType === 'owner') {
                    navigation.navigate('AnalyticsOwner', { userID, ownerID });
                } else if (userType === 'tenant') {
                    Alert.alert("Not Developed Yet :(");
                    //navigation.navigate('OwnerNotification', { userID, tenantID });
                }
            } else {
                console.error('Registration failed', response.data.error);
            }
        } catch (error) {
            console.error('Error during registration:', error);
        }
    };


    const passwordValidationSchema = Yup.object().shape({
        password: Yup.string()
            .min(8, 'Password too Short!')
            .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, 'Must contain 8 characters, at least one uppercase and one lowercase, and a number!')
            .required('Cant leave empty'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), 'Your Passwords dont match!'], 'Passwords must match!')
            .required('Confirm password is needed')
    });

    return (
        <Formik
            initialValues={{
                password: '',
                confirmPassword: '',
            }}
            validationSchema={passwordValidationSchema}
            onSubmit={handleRegister}
        >
            {({ values, errors, touched, handleChange, setFieldTouched, isValid, handleSubmit }) => (
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Image source={require('../img/logoColored.png')} style={styles.logo} />
                    </View>
                    <Text style={styles.passwordText}>Please set a {'\n'}Strong Password</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Password"
                        placeholderTextColor="#888"
                        secureTextEntry={true}
                        value={values.password}
                        onChangeText={handleChange('password')}
                        onBlur={() => setFieldTouched('password')}
                    />
                    {touched.password && errors.password && (
                        <Text style={styles.errorTxt}>{errors.password}</Text>
                    )}
                    <TextInput
                        style={styles.input}
                        placeholder="Confirm Password"
                        placeholderTextColor="#888"
                        secureTextEntry={true}
                        value={values.confirmPassword}
                        onChangeText={handleChange('confirmPassword')}
                        onBlur={() => setFieldTouched('confirmPassword')}
                    />
                    {touched.confirmPassword && errors.confirmPassword && (
                        <Text style={styles.errorTxt}>{errors.confirmPassword}</Text>
                    )}
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={[styles.button, { width: 160 }]} onPress={() => navigation.goBack()}>
                            <Text style={styles.buttonText}>Back</Text>
                        </TouchableOpacity>
                        <View style={styles.space} />
                        <Pressable style={[ styles.button]} onPress={handleSubmit}>
                            <Text style={styles.buttonText} >Register</Text>
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
        marginTop: -windowHeight * 0.025,
    },
    logo: {
        width: windowWidth * 0.25,
        height: windowWidth * 0.25,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: -windowHeight * 0.2,
        marginBottom: windowHeight * 0.01,
    },
    headerText: {
        fontSize: windowWidth * 0.06,
        color: 'black',
        fontWeight: 'bold',
    },
    passwordText: {
        color: '#47B5FF',
        fontSize: windowWidth * 0.08,
        fontWeight: 'bold',
        marginBottom: windowHeight * 0.02,
    },
    input: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '80%',
        height: windowHeight * 0.06,
        borderColor: '#06283d',
        borderWidth: 2,
        borderRadius: windowWidth * 0.05,
        padding: windowWidth * 0.03,
        marginTop: windowHeight * 0.005,
        marginBottom: windowHeight * 0.01,
        backgroundColor: '#fff',
        fontWeight: 'bold',
        justifyContent: 'space-between',
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
        width: windowWidth * 0.02,
    },
    buttonText: {
        color: 'black',
    },
    errorTxt: {
        fontSize: windowWidth * 0.03,
        color: '#FF0D10',
    },
});
