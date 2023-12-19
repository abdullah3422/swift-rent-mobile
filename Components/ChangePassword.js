import * as React from 'react';
import {Alert, Image, Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import axios from 'axios';
import {useState} from "react";
import {md5} from "js-md5";


export default function ChangePassword({ navigation, route }) {

    const {userID, ownerID, tenantID} = route.params;
    const ipAddress = route.params.ipAddress;
    console.log(userID);
    console.log(ownerID);
    console.log(tenantID);
    console.log(ipAddress);

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleChangePassword = async () => {
        if (oldPassword === '') {
            setError('Please enter your old password.');
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('New password and confirm password do not match.');
            return;
        }

        try {
            const response = await axios.post(ipAddress + 'api/change-password', {
                userID: userID,
                oldPassword: md5(oldPassword),
                newPassword: md5(newPassword),
            });

            if (response.data.success) {
                // Password changed successfully, you can navigate to another screen or show a success message here.
                // For example:
                navigation.navigate('NotificationAlerts', {userID, ownerID, tenantID});
            }
        } catch (error) {
            setError('Old Password Does not match');
            console.error('Error during changing password:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Change Your {'\n'}  Password </Text>

            <TextInput
                style={styles.input}
                placeholder="Old Password"
                placeholderTextColor="#cdcdcd"
                secureTextEntry={true}
                value={oldPassword}
                onChangeText={(text) => setOldPassword(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="New Password"
                placeholderTextColor="#cdcdcd"
                secureTextEntry={true}
                value={newPassword}
                onChangeText={(text) => setNewPassword(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Confirm New Password"
                placeholderTextColor="#cdcdcd"
                secureTextEntry={true}
                value={confirmPassword}
                onChangeText={(text) => setConfirmPassword(text)}
            />


            <View style={styles.buttonContainer}>
                <View style={styles.space} />
                <Pressable style={[styles.button, { width: 160 }]} onPress={handleChangePassword}>

                    <Text style={styles.buttonText}>Change</Text>
                </Pressable>

            </View>
        </View>
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

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: -180,
        marginBottom: 10,
    },

    headerText: {
        color: "black",
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: '15%',
        justifyContent: "center",
        alignContent: "center",


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
        marginTop: '15%'
    },
    space: {
        width: 10,
    },
    buttonText: {
        color: 'black',
    },
});
