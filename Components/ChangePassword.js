import React, {useState} from 'react';
import {Alert, Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import axios from 'axios';
import {md5} from 'js-md5';
import {Formik} from 'formik';
import * as Yup from 'yup';

export default function ChangePassword({navigation, route}) {
    const {userID, ownerID, tenantID} = route.params;
    const ipAddress = route.params.ipAddress;

    const [error, setError] = useState('');

    return (
        <Formik
            initialValues={{oldPassword: '', newPassword: '', confirmPassword: ''}}
            validationSchema={Yup.object().shape({
                oldPassword: Yup.string()
                    .required('Enter old password')
                    .min(8, 'Too short'),
                newPassword: Yup.string()
                    .required('Enter new password')
                    .min(8, 'Too short'),
                confirmPassword: Yup.string()
                    .required('Confirm new password')
                    .oneOf([Yup.ref('newPassword'), null], 'Passwords do not match'),
            })}
            onSubmit={async (values, {setFieldError}) => {
                if (values.oldPassword === '') {
                    Alert.alert('Please enter your old password.');
                    setFieldError('oldPassword', 'Please enter your old password.');
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
                        oldPassword: md5(values.oldPassword),
                        newPassword: md5(values.newPassword),
                    });

                    if (response.data.success) {
                        const {digiCode} = response.data;
                        console.log(digiCode);
                        Alert.alert('Password Successfully Changed', `New 16 digit code: ${digiCode}`);
                        if (ownerID !== undefined) {
                            navigation.navigate('OwnerProfile', {userID, ownerID});
                        } else if (tenantID !== undefined) {
                            navigation.navigate('TenantProfile', {userID, tenantID});
                        }
                    }
                } catch (error) {
                    Alert.alert('Old password does not match');
                    setFieldError('oldPassword', 'Old Password Does not match');
                    console.log('Error during changing password:', error);
                }
            }}
        >
            {({values, errors, touched, handleChange, setFieldTouched, isValid, handleSubmit}) => (
                <View style={styles.container}>
                    <Text style={styles.headerText}>Change Your {'\n'} Password </Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Old Password"
                        placeholderTextColor="#cdcdcd"
                        secureTextEntry={true}
                        onChangeText={handleChange('oldPassword')}
                        onBlur={() => setFieldTouched('oldPassword')}
                        value={values.oldPassword}
                    />
                    <View style={{flexDirection: "row", height: 25}} >
                        {touched.oldPassword && errors.oldPassword && (
                            <Text style={styles.errorText}>{errors.oldPassword}</Text>
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
        marginBottom: 20,
        marginTop: -212,
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
