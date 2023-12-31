import React from 'react';
import {Alert, Text, TextInput, View, StyleSheet, Pressable, Dimensions} from 'react-native';
import axios from 'axios';
import {useState} from 'react';
import {md5} from 'js-md5';
import {Formik} from 'formik';
import * as Yup from 'yup';

export default function EditAccount({navigation, route}) {
    const {userID, ownerID, tenantID} = route.params;
    const ipAddress = route.params.ipAddress;

    const [error, setError] = useState('');

    return (

        <View style={styles.container}>
            <Text style={styles.headerText}>Edit Account {'\n'} Information </Text>

            <TextInput
                style={styles.input}
                placeholder="John"
                placeholderTextColor="#cdcdcd"
                secureTextEntry={true}
            />

            <TextInput
                style={styles.input}
                placeholder="Doe"
                placeholderTextColor="#cdcdcd"
                secureTextEntry={true}
            />

            <TextInput
                style={styles.input}
                placeholder="0312121212"
                placeholderTextColor="#cdcdcd"

            />

            <TextInput
                style={styles.input}
                placeholder="j@email.com"
                placeholderTextColor="#cdcdcd"
            />
            <View style={styles.dateInputContainer}>
                <TextInput
                    placeholder="Year"
                    //style={styles.dateInput}
                    placeholderTextColor="#888"
                    style={styles.dateInput}
                    keyboardType="number-pad"

                />
                <TextInput
                    placeholder="Month"
                    //style={styles.dateInput}
                    placeholderTextColor="#888"
                    style={styles.dateInput}
                    keyboardType="number-pad"

                />
                <TextInput
                    placeholder="Day"
                    //style={styles.dateInput}
                    placeholderTextColor="#888"
                    style={styles.dateInput}
                    keyboardType="number-pad"

                />
            </View>

            <View style={styles.buttonContainer}>
                <View style={styles.space}/>
                <Pressable style={[styles.button, {width: 160}]}>
                    <Text style={styles.buttonText}>Change</Text>
                </Pressable>
            </View>
        </View>


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
        marginTop: '-25%',
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
    dateInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '81%',
        justifyContent: 'space-between',
        padding: 10
    },
    dateInput: {
        padding: 10,
        height: windowHeight * 0.06,
        borderRadius: windowWidth * 0.05,
        borderWidth: 2,
        borderColor: '#06283d',
        flex: 1,
        textAlign: "center",
        margin: 3,
        marginTop: 0
    },
});