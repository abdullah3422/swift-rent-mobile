import * as React from 'react';
import { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, TextInput, View, Alert } from 'react-native';
import axios from 'axios';
import {md5} from "js-md5"; // Import axios

export default function ChangePassword({ navigation, route }) {

    const { userID, ownerID, tenantID } = route.params;
    const ipAddress = route.params.ipAddress;

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [oldPassword, setOldPassword] = useState('');

    const handleChangePassword = () => {
        if (password !== confirmPassword) {
            Alert.alert("Passwords do not match");
            return;
        }

        // Define the API endpoint URL
        const apiUrl = ipAddress+ 'api/change-password'; // Replace with your API URL

        // Define the request body
        const requestBody = {
            userID: userID, // Replace with the actual user ID
            oldPassword: md5(oldPassword), // Provide the old password if needed
            newPassword: md5(password),
        };

        // Make the API request
        axios.post(apiUrl, requestBody)
            .then((response) => {
                if (response.data.success) {
                    Alert.alert("Password changed successfully");
                    navigation.navigate('NotificationAlerts'); // Navigate to the next screen on success
                } else {
                    Alert.alert("Failed to change password");
                }
            })
            .catch((error) => {
                console.error("Error changing password:", error);
                Alert.alert("An error occurred. Please try again later.");
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Change Your {'\n'}  Password </Text>

            <TextInput
                style={styles.input}
                placeholder="Enter Old Password"
                placeholderTextColor="#cdcdcd"
                secureTextEntry={true}
                value={oldPassword}
                onChangeText={(text) => setOldPassword(text)}
            />

            <TextInput
                style={styles.input}
                placeholder="Enter Password"
                placeholderTextColor="#cdcdcd"
                secureTextEntry={true}
                value={password}
                onChangeText={(text) => setPassword(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Confirm Password"
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
