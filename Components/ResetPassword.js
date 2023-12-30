import React from 'react';
import { Alert, Text, TextInput, View, StyleSheet, Pressable } from 'react-native';
import axios from 'axios';
import { useState } from 'react';
import { md5 } from 'js-md5';
import { Formik } from 'formik';
import * as Yup from 'yup';

export default function ResetPassword({ navigation, route }) {
    const { userID, ownerID, tenantID } = route.params;
    const ipAddress = route.params.ipAddress;

    const [error, setError] = useState('');

    return (
        <Formik
            initialValues={{ digiCode: '', newPassword: '', confirmPassword: '' }}
            validationSchema={Yup.object().shape({
                digiCode: Yup.string()
                    .required('Please enter your old password.')
                    .matches(/^[0-9a-zA-Z]{16}$/, 'Must be a 16-digit alphanumeric code.'),
                newPassword: Yup.string()
                    .required('Please enter your new password.')
                    .min(8, 'Password too Short!')
                    .matches(
                        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                        'Must contain 8 characters, at least one uppercase and one lowercase, and a number!'
                    ),
                confirmPassword: Yup.string()
                    .required('Please confirm your new password.')
                    .oneOf([Yup.ref('newPassword'), null], 'New password and confirm password do not match.'),
            })}
            onSubmit={async (values, { setFieldError }) => {
                if (values.digiCode === '') {
                    Alert.alert('Please enter your old password.');
                    setFieldError('digiCode', 'Please enter your old password.');
                    return;
                }

                if (values.newPassword !== values.confirmPassword) {
                    Alert.alert('New password and confirm password do not match.');
                    setFieldError('confirmPassword', 'New password and confirm password do not match.');
                    return;
                }

                try {
                    const response = await axios.post(ipAddress + 'api/change-password', {
                        userID: userID,
                        digiCode: md5(values.digiCode),
                        newPassword: md5(values.newPassword),
                    });

                    if (response.data.success) {
                        Alert.alert('Password Successfully Changed');
                        navigation.navigate('LoginScreen');
                    }
                } catch (error) {
                    Alert.alert('Old password does not match');
                    setFieldError('digiCode', 'Old Password Does not match');
                    console.error('Error during changing password:', error);
                }
            }}
        >
            {({ values, errors, touched, handleChange, setFieldTouched, isValid, handleSubmit}) => (
                <View style={styles.container}>
                    <Text style={styles.headerText}>Reset Your {'\n'}  Password </Text>

                    <TextInput
                        style={styles.input}
                        placeholder="16 Digit Code"
                        placeholderTextColor="#cdcdcd"
                        secureTextEntry={false}
                        onChangeText={handleChange('digiCode')}
                        onBlur={() => setFieldTouched('digiCode')}
                        value={values.digiCode}
                    />
                    {touched.digiCode && errors.digiCode && (
                        <Text style={styles.errorText}>{errors.digiCode}</Text>
                    )}

                    <TextInput
                        style={styles.input}
                        placeholder="New Password"
                        placeholderTextColor="#cdcdcd"
                        secureTextEntry={true}
                        onChangeText={handleChange('newPassword')}
                        onBlur={() => setFieldTouched('newPassword')}
                        value={values.newPassword}
                    />
                    {touched.newPassword && errors.newPassword && (
                        <Text style={styles.errorText}>{errors.newPassword}</Text>
                    )}

                    <TextInput
                        style={styles.input}
                        placeholder="Confirm New Password"
                        placeholderTextColor="#cdcdcd"
                        secureTextEntry={true}
                        onChangeText={handleChange('confirmPassword')}
                        onBlur={() => setFieldTouched('confirmPassword')}
                        value={values.confirmPassword}
                    />
                    {touched.confirmPassword && errors.confirmPassword && (
                        <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                    )}

                    <View style={styles.buttonContainer}>
                        <View style={styles.space} />
                        <Pressable style={[styles.button, { width: 160 }]} onPress={handleSubmit}>
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginTop: '-50%',
    },

    headerText: {
        color: 'black',
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: '15%',
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
        color: 'red',
    },
});
