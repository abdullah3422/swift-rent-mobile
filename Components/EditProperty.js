import React, { useEffect } from 'react';
import { Alert, Text, TextInput, View, StyleSheet, Pressable } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import axios from "axios";

export default function EditProperty({ navigation, route }) {
    const { propertyID } = route.params;
    const ipAddress = route.params.ipAddress;

    const [data, setData] = React.useState({
        propertyAddress: 'default',
        dueDate: 'default',
        rent: 'default',
    });

    useFocusEffect(
        React.useCallback(() => {
            const handleInitialData = async () => {
                // Fetch Property Data here

            };
            handleInitialData();
        }, [propertyID])
    );

    function handlePropertyEdit() {

    }

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Edit Property {'\n'} Information</Text>

            <Text style={styles.fieldHeading}>  Property Address</Text>
            <TextInput
                style={styles.input}
                defaultValue={String(data.propertyAddress)}
                placeholderTextColor="#cdcdcd"
            />

            <Text style={styles.fieldHeading}>  Due Date</Text>
            <TextInput
                style={styles.input}
                defaultValue={String(data.dueDate)}
                placeholderTextColor="#cdcdcd"
            />

            <Text style={styles.fieldHeading}>  Rent</Text>
            <TextInput
                style={styles.input}
                defaultValue={String(data.rent)}
                placeholderTextColor="#cdcdcd"
            />

            <View style={styles.buttonContainer}>
                <View style={styles.space} />
                <Pressable style={[styles.button, { width: 160 }]} onPress={handlePropertyEdit}>
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
    fieldHeading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 0,
        color: 'grey',
        textAlign: 'left', // Aligning text to the left
        alignSelf: 'flex-start', // Move text to the start of the container
        width: '75%', // Adjust width to limit heading width
        marginLeft: '12%', // Add left margin for better alignment
        marginBottom: 5, // Adjust as needed
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
        marginBottom: 5,
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
