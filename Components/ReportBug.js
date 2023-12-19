import * as React from 'react';
import {Alert, Image, Pressable, StyleSheet, Text, TextInput, View, ScrollView, KeyboardAvoidingView, Platform} from 'react-native';
import {useState} from "react";
import axios from "axios";

export default function ReportBug({ navigation, route }) {

    const ipAddress = route.params.ipAddress;

    const {userID, ownerID, tenantID} = route.params;
    console.log(userID);
    console.log(ownerID);
    console.log(tenantID);
    console.log(ipAddress);

    const [bugType, setBugType] = useState('');
    const [bugDescription, setBugDescription] = useState('');

    // Determine userType based on ownerID and tenantID
    let userType = '';
    if (ownerID !== undefined) {
        userType = 'O';
    } else if (tenantID !== undefined) {
        userType = 'T';
    }
    console.log(userType);
    const submitBugReport = async () => {
        try {
            const response = await axios.post(ipAddress + 'api/report-bug', {
                userID: userID,
                userType: userType,
                bugType: bugType,
                bugDescription: bugDescription,
            });

            if (response.data.success) {
                // Handle success, e.g., show a confirmation message
                Alert.alert('Bug report submitted successfully');
                console.log('Bug report submitted successfully');
            }
        } catch (error) {
            Alert.alert('Error Submitting Bug Report');
            console.error('Error submitting bug report:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Report a Bug</Text>

            <TextInput
                style={styles.input}
                placeholder="Type of Issue"
                placeholderTextColor="#cdcdcd"
                onChangeText={text => setBugType(text)}
            />
            <TextInput
                style={styles.inputDescribe}
                placeholder="Describe your problem"
                placeholderTextColor="#cdcdcd"
                multiline
                numberOfLines={4}
                onChangeText={text => setBugDescription(text)}
            />
            <View style={styles.buttonContainer}>
                <View style={styles.space} />
                <Pressable style={[styles.button, { width: 160 }]} onPress={submitBugReport}>
                    <Text style={styles.buttonText}>Submit</Text>
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
        marginTop: '-45%',

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
        width: '80%',
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
    inputDescribe: {
        width: '80%',
        height: 100,

        borderColor: '#06283d',
        borderWidth: 2,
        borderRadius: 15,
        padding: 10,
        marginTop: 3,
        marginBottom: 10,
        backgroundColor: '#fff',
        fontWeight: 'bold',
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
