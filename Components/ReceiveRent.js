import React from 'react';
import { Alert, Text, TextInput, View, StyleSheet, Pressable } from 'react-native';
import axios from 'axios';
import { useState } from 'react';
import { md5 } from 'js-md5';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {useFocusEffect} from "@react-navigation/native";

export default function ReceiveRent({ navigation, route }) {
    const { userID, ownerID, propertyID } = route.params;
    const ipAddress = route.params.ipAddress;
    const [data, setData] = React.useState({
        rentAmount: '',
        propertyAddress: '',
        dueDate: '',
        rent: '',
    });
    useFocusEffect(
        React.useCallback(() => {
            const handleInitialData = async () => {
                try {
                    const response = await axios.post(ipAddress + 'api/fetch-property', {
                        propertyID: propertyID,
                    });
                    if (response.data.success) {
                        setData({
                            propertyAddress: String(response.data.propertyAddress),
                            dueDate: String(response.data.dueDate),
                            rent: String(response.data.rent),
                        });
                    }
                } catch (error) {
                    console.log("Error fetching property data:", error);
                }
            };
            handleInitialData();
        }, [propertyID])
    );

    async function handleRentCollection() {
        try {
            const response = await axios.post(ipAddress + 'api/receive-rent', {
                propertyID: String(propertyID),
                rent: data.rentAmount,
            });
            if (response.data.success) {
                Alert.alert('Success', 'Rent successfully received!')
                navigation.navigate('MyProperties', {userID, ownerID});
            }
        } catch (error) {
            console.log("Error receiving rent:", error);
            Alert.alert("Error receiving rent");
        }
    }

    return (

        <View style={styles.container}>
            <Text style={styles.headerText}>Receive Rent</Text>
            <View style={styles.textContainer}>
                <Text style={styles.bodyText}>{data.propertyAddress}</Text>
                <Text style={styles.bodyText}>Due Date: {data.dueDate}</Text>
                <Text style={styles.bodyText}>Rent: {data.rent}</Text>
            </View>
            <TextInput
                style={styles.input}
                placeholder="Rent Amount"
                placeholderTextColor="#cdcdcd"
                onChangeText={(text) => setData({ ...data, rentAmount: text })}
            />

            <View style={styles.buttonContainer}>
                <View style={styles.space} />
                <Pressable style={[styles.button, { width: 160 }]} onPress={handleRentCollection}>
                    <Text style={styles.buttonText}>Confirm</Text>
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
    textContainer: {
        textAlign: 'left',
    },
    bodyText: {
        color: 'black',
        fontSize: 15,
    },
    headerText: {
        color: 'black',
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: '15%',
        justifyContent: 'center',
        alignContent: 'center',
        textAlign: 'center'
    },
    input: {
        width: '75%',
        height: 40,
        borderColor: '#06283d',
        borderWidth: 2,
        borderRadius: 15,
        padding: 10,
        marginTop: 15,
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
