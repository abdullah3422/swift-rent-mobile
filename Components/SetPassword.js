import * as React from 'react';
import {Alert, Dimensions, Image, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import {md5} from 'js-md5';

export default function SetPassword({navigation, route}) {
    const [passwordsMatch, setPasswordsMatch] = React.useState(true); // Initialize to true initially

    // Routing the ipAddress as a prop through the route keyword
    const ipAddress = route.params.ipAddress;

    const handleRegister = async (values) => {
        try {
            const {userType, firstName, lastName, DOB, email, phone} = route.params;
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
                userType: userType, firstName: firstName,
                lastName: lastName, DOB: DOB,
                email: email, phone: phone,
                password: md5(password)
            });

            if (response.data.success) {
                console.log('Registration successful', response.data);
                const {userID, ownerID, tenantID, digiCode} = response.data;
                navigation.navigate('DigiCode', {userType, userID, ownerID, tenantID, digiCode});
            } else {
                console.log('Registration failed', response.data.error);
            }
        } catch (error) {
            console.log('Error during registration:', error);
            const lastThreeNumbers = String(error).match(/\d{3}$/);
            if (String(lastThreeNumbers) === "500") {
                Alert.alert("Something went wrong","We apologize for the inconvenience Contact us: swiftrent2023@gmail.com");
            }
        }
    };


    const passwordValidationSchema = Yup.object().shape({
        password: Yup.string()
            .required('Cant leave empty')
            .min(8, 'Too Short'),

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
            {({values, errors, touched, handleChange, setFieldTouched, isValid, handleSubmit}) => (
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Image source={require('../img/logoColored.png')} style={styles.logo}/>
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

                    <TextInput
                        style={styles.input}
                        placeholder="Confirm Password"
                        placeholderTextColor="#888"
                        secureTextEntry={true}
                        value={values.confirmPassword}
                        onChangeText={handleChange('confirmPassword')}
                        onBlur={() => setFieldTouched('confirmPassword')}
                    />
                    <View style={{flexDirection: "row", height: 20}} >
                        {touched.password && errors.password && (
                            <Text style={styles.errorTxt}>{errors.password}</Text>
                        )}
                        {touched.confirmPassword && errors.confirmPassword && (
                        <Text style={styles.errorTxt}>{errors.confirmPassword}</Text>
                        )}
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={[styles.button, {width: 160}]} onPress={() => navigation.goBack()}>
                            <Text style={styles.buttonText}>Back</Text>
                        </TouchableOpacity>
                        <View style={styles.space}/>
                        <Pressable style={[styles.button]} onPress={handleSubmit}>
                            <Text style={styles.buttonText}>Register</Text>
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        width: '100%',
        height: 800,
    },
    logo: {
        width: windowWidth * 0.25,
        height: windowWidth * 0.25,
        marginTop: -108,
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
        textAlign: 'center', // Center the text horizontally
        alignSelf: 'center', // Center the text within its container
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
        marginHorizontal: 5,
    },
});
