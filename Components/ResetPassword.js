// noinspection JSValidateTypes

import React from 'react';
import {Alert, Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import axios from 'axios';
import {md5} from 'js-md5';
import {Formik} from 'formik';
import * as Yup from 'yup';

export default function ResetPassword({navigation, route}) {
    const ipAddress = route.params.ipAddress;

    //Give me variables (emailOrPhone, digiCode, newPassword, confirmPassword) here to use for my api calls
    function handleForget() {
        Alert.alert("Forgot 16 Digit-Code?", "Email us at:\nswiftrent2023@gmail.com");
    }

    //const handleSubmit
    return (
        <Formik
            initialValues={{emailOrPhone: '', currentDigiCode: '', newPassword: '', confirmPassword: ''}}
            validationSchema={Yup.object().shape({
                emailOrPhone: Yup.string()
                    .required('Email or Phone empty'),
                currentDigiCode: Yup.string()
                    .required('Code Required')
                    .matches(/^[0-9a-zA-Z]{16}$/, 'Must be 16-digits'),
                newPassword: Yup.string()
                    .required('Enter new password')
                    .min(8, 'Password too short'),
                confirmPassword: Yup.string()
                    .required('Confirm new password.')
                    .oneOf([Yup.ref('newPassword'), null], 'Password do not match.'),
            })}
            onSubmit={async (values, {setFieldError}) => {
                if (values.newPassword !== values.confirmPassword) {
                    Alert.alert('New password and confirm password do not match.');
                    setFieldError('confirmPassword', 'New password and confirm password do not match.');
                    return;
                }

                try {
                    const response = await axios.post(ipAddress + 'api/reset-password', {
                        emailOrPhone: values.emailOrPhone,
                        currentDigiCode: values.currentDigiCode,
                        newPassword: md5(values.newPassword),
                    });

                    if (response.data.success) {
                        const {digiCode} = response.data;
                        Alert.alert('Password Successfully Reset', `New 16 digit code: ${digiCode}`);
                        navigation.navigate('LoginScreen');
                    }
                } catch (error) {
                    Alert.alert('Old password does not match');
                    setFieldError('currentDigiCode', 'Old Password Does not match');
                    console.log('Error during changing password:', error);
                }
            }}
        >
            {({values, errors, touched, handleChange, setFieldTouched, isValid, handleSubmit}) => (
                <View style={styles.container}>
                    <Text style={styles.headerText}>Reset Your {'\n'} Password </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Email or Phone"
                        placeholderTextColor="#cdcdcd"
                        onChangeText={handleChange('emailOrPhone')}
                        onBlur={() => setFieldTouched('emailOrPhone')}
                        value={values.emailOrPhone}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="16 Digit Code"
                        placeholderTextColor="#cdcdcd"
                        secureTextEntry={false}
                        onChangeText={handleChange('currentDigiCode')}
                        onBlur={() => setFieldTouched('currentDigiCode')}
                        value={values.currentDigiCode}
                    />

                    <View style={{flexDirection: "row", height: 20}} >
                        {touched.emailOrPhone && errors.emailOrPhone && (
                            <Text style={styles.errorText}>{errors.emailOrPhone}</Text>
                        )}
                        {touched.currentDigiCode && errors.currentDigiCode && (
                            <Text style={styles.errorText}>{errors.currentDigiCode}</Text>
                        )}
                    </View>

                    <TextInput
                        style={styles.input}
                        placeholder="New Password"
                        placeholderTextColor="#cdcdcd"
                        secureTextEntry={true}
                        onChangeText={handleChange('newPassword')}
                        onBlur={() => setFieldTouched('newPassword')}
                        value={values.newPassword}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Confirm New Password"
                        placeholderTextColor="#cdcdcd"
                        secureTextEntry={true}
                        onChangeText={handleChange('confirmPassword')}
                        onBlur={() => setFieldTouched('confirmPassword')}
                        value={values.confirmPassword}
                    />

                    <View style={{flexDirection: "row", height: 20}} >
                        {touched.newPassword && errors.newPassword && (
                            <Text style={styles.errorText}>{errors.newPassword}</Text>
                        )}
                        {touched.confirmPassword && errors.confirmPassword && (
                            <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                        )}
                    </View>

                    <Pressable style={[{width: 'auto'}]} onPress={handleForget}>
                        <Text style={{padding:6}}>Forgot your 16 Digit-Code?</Text>
                    </Pressable>
                    <View style={styles.buttonContainer}>
                        <View style={styles.space}/>
                        <Pressable style={[styles.button, {width: 160}]} onPress={handleSubmit}>
                            <Text style={styles.buttonText}>Change</Text>
                        </Pressable>
                    </View>
                </View>
            )}
        </Formik>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        width: '100%',
        height: 800,
    },

    headerText: {
        color: 'black',
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: '15%',
        marginTop: -200,
        justifyContent: 'center',
        alignContent: 'center',
    },
    input: {
        width: '75%',
        height: 40,
        borderColor: '#06283d',
        borderWidth: 2,
        borderRadius: 15,
        padding: 10,
        marginTop: 3,
        marginBottom: 10,
        backgroundColor: '#fff',
        fontWeight: 'bold',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '35%',
        marginTop: 10,
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e5e5e5',
        borderColor: '#cdcdcd',
        borderWidth: 2,
        borderRadius: 20,
        padding: 10,
        marginTop: '15%',
    },
    space: {
        width: 10,
    },
    buttonText: {
        color: 'black',
    },
    errorText: {
        fontSize: 12,
        color: '#FF0D10',
        marginHorizontal: 5,
    },
});
