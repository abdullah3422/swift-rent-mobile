import * as React from 'react';
import {Alert, Image, Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {useState} from "react";
import axios from "axios";

export default function AddProperties({ navigation, route }) {

    const {userID, ownerID, tenantID} = route.params;
    const ipAddress = route.params.ipAddress;

    console.log(userID);
    console.log(ownerID);
    console.log(tenantID);

    const [propertyAddress, setPropertyAddress] = useState('');
    const [noOfRooms, setNoOfRooms] = useState('');
    const [rentAmount, setRentAmount] = useState('');
    const [error, setError] = useState('');

    const handleAddProperty = async () => {
        try {
            const response = await axios.post(ipAddress + 'api/add-property', {
                ownerID: ownerID,
                rent: rentAmount,
                propertyAddress: propertyAddress,

            });

            if (response.data.success) {
                // Property added successfully, you can navigate to another screen or show a success message here.
                Alert.alert('Property Successfully Added!')
                navigation.navigate('MyProperties', {userID, ownerID, tenantID});
            }
        } catch (error) {
            setError('Error adding property');
            console.error('Error during adding property:', error);
        }
    };

    return (

        <View style={styles.container}>

            <Text style={styles.postHeader}>Add Property {'\n'}Information</Text>

            <View style={styles.input}>
                <TextInput
                    placeholder="Address"
                    placeholderTextColor="#cdcdcd"
                    style={styles.textInput}
                    value={propertyAddress}
                    onChangeText={(text) => setPropertyAddress(text)}
                />
                <View style={styles.iconContainer}>
                    <Image source={require('../img/locationIcon.png')} style={styles.placeholderIcon} />
                </View>
            </View>
            <View style={styles.input}>
                <TextInput
                    placeholder="No of Rooms"
                    placeholderTextColor="#cdcdcd"
                    style={styles.textInput}
                    value={noOfRooms}
                    onChangeText={(text) => setNoOfRooms(text)}
                />
                <View style={styles.iconContainer}>
                    <Image source={require('../img/hashtag.png')} style={styles.placeholderIcon} />
                </View>
            </View>
            <View style={styles.input}>
                <TextInput
                    placeholder="Rent Amount"
                    placeholderTextColor="#cdcdcd"
                    style={styles.textInput}
                    value={rentAmount}
                    onChangeText={(text) => setRentAmount(text)}
                />
                <View style={styles.iconContainer}>
                    <Image source={require('../img/dollarIcon.png')} style={styles.placeholderIcon} />
                </View>
            </View>



            <View style={styles.buttonContainer}>
                <Pressable style={styles.button} onPress={() => navigation.navigate('MyProperties')}>
                    <Text style={styles.buttonText}>Back</Text>
                </Pressable>

                <View style={styles.space} />
                <Pressable style={styles.button} onPress={handleAddProperty}>
                    <Text style={styles.buttonText}>Next</Text>
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
        marginTop: -200,
        marginBottom: 30
    },

    headerText: {
        fontSize: 25,
        paddingTop: 15,
        color: 'black',
        fontWeight: 'bold',
    },
    input: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 250,
        height: 40,
        borderColor: '#06283d',
        borderWidth: 2,
        borderRadius: 15,
        padding: 10,
        marginTop: 3,
        marginBottom: 10,
        backgroundColor: '#fff',
        fontWeight: 'bold',
        justifyContent: 'space-between',
    },
    placeholderIcon: {
        width: 20,
        height: 20,
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
        width: 150,
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

    },
    space: {
        width: 20,
    },
    buttonText: {
        color: 'black',

    },
    datePickerContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',

    },
    selectDateText: {
        color: '#47B5FF',
        fontWeight: 'bold',
        marginBottom: 5,
    },
    postHeader: {

        marginTop: 20,
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'black',
        textAlign: 'center'

    },
});
