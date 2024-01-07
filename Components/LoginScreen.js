import React, {useRef} from 'react';
import {Alert, Dimensions, Image, Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import axios from 'axios';
import {md5} from 'js-md5';
import {Formik} from 'formik';
import * as Yup from 'yup';

const loginSchema = Yup.object().shape({
    emailOrPhone: Yup.string()
        .required('Email or Phone is required.'),
    password: Yup.string()
        .required('Password is required.')
        .min(8, 'Password should be at least 8 characters long.'),
});

export default function LoginScreen({navigation, route}) {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const ipAddress = route.params.ipAddress;
    const {flag} = route.params;

    const handleLogin = async (values) => {
        try {
            console.log(values.emailOrPhone);
            console.log(values.password);

            const response = await axios.post(ipAddress + 'api/login', {
                emailOrPhone: values.emailOrPhone,
                password: md5(values.password),
            });

            if (response.data.success) {
                console.log('Login Successful');
                Alert.alert('Login Successful!');
                // ... (rest of your code)
                var {userID, ownerID, tenantID} = response.data;
                if (flag) {
                    if (ownerID !== 0 && tenantID !== 0) {
                        Alert.alert("All roles already created!");
                    } else if (ownerID !== 0) {
                        const tenantResponse = await axios.post(ipAddress + 'api/new-role-registration', {
                            userID: userID,
                            userType: "tenant"
                        });
                        tenantID = tenantResponse.data.tenantID;
                        navigation.navigate('TenantNotification', {userID, tenantID});
                    } else if (tenantID !== 0) {
                        const ownerResponse = await axios.post(ipAddress + 'api/new-role-registration', {
                            userID: userID,
                            userType: "owner"
                        });
                        ownerID = ownerResponse.data.ownerID;
                        navigation.navigate('AnalyticsOwner', {userID, ownerID});
                    }
                } else {
                    if (ownerID !== 0 && tenantID !== 0) {
                        navigation.navigate('LoginAs', {userID, ownerID, tenantID});
                    } else if (ownerID !== 0) {
                        navigation.reset({
                            index: 0,
                            routes: [{name: 'AnalyticsOwner', params: {userID, ownerID}}],
                        });
                    } else if (tenantID !== 0) {
                        navigation.reset({
                            index: 0,
                            routes: [{name: 'TenantNotification', params: {userID, tenantID}}],
                        });
                    }
                }
            } else {
                console.log('Login Failed:', response.data.error);
                Alert.alert('Login Failed', response.data.error);
            }
        } catch (error) {
            console.log('Login Error:', error);
            Alert.alert('Login Error', 'Email or Password Invalid!');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={require('../img/logoColored.png')} style={styles.logo}/>
            </View>
            <Text style={styles.loginText}>Login</Text>

            <Formik
                initialValues={{emailOrPhone: '', password: ''}}
                validationSchema={loginSchema}
                onSubmit={(values) => handleLogin(values)}
            >
                {({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
                    <>
                        <View style={styles.input}>
                            <TextInput
                                ref={emailRef}
                                placeholder="Email or Number"
                                value={values.emailOrPhone}
                                onChangeText={handleChange('emailOrPhone')}
                                onBlur={handleBlur('emailOrPhone')}
                                placeholderTextColor="#cdcdcd"
                                style={styles.textInput}
                                onSubmitEditing={() => {
                                    if (passwordRef.current) {
                                        passwordRef.current.focus();
                                    }
                                }}
                            />
                        </View>
                        {touched.emailOrPhone && errors.emailOrPhone && (
                            <Text style={{color: 'red'}}>{errors.emailOrPhone}</Text>
                        )}

                        <View style={styles.input}>
                            <TextInput
                                ref={passwordRef}
                                placeholder="Password"
                                value={values.password}
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                placeholderTextColor="#cdcdcd"
                                style={styles.textInput}
                                secureTextEntry={true}
                                onSubmitEditing={handleSubmit} // Or any other action after password input
                            />
                        </View>
                        {touched.password && errors.password && <Text style={{color: 'red'}}>{errors.password}</Text>}

                        <Pressable onPress={() => navigation.navigate('ResetPassword')}>
                            <Text>Forgot Password?</Text>
                        </Pressable>

                        <View style={styles.buttonContainer}>
                            <Pressable style={styles.button} onPress={handleSubmit}>
                                <Text style={styles.buttonText}>Continue</Text>
                            </Pressable>
                            <View style={styles.space}/>
                        </View>
                    </>
                )}
            </Formik>
        </View>
    );
}

// The rest of your styles remain unchanged

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginTop: -windowHeight * 0.19,
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
        marginTop: windowHeight * 0.02,
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

