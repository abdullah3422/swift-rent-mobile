import * as React from 'react';
import { Alert, Dimensions, Image, Pressable, StyleSheet, Text, View } from 'react-native';

export default function PropertyMenu({ navigation, route }) {
    const { tenantID, propertyID, propertyAddress } = route.params;

    //Logic for register/unregister tenant and showing receive rent:
    let registrationPlaceholder = tenantID ? 'Un-register' : 'Register';

    console.log("Property Menu:");
    console.log(route.params);



    function handleUnregister() {
        //API to Un-register tenant
    }

    return (
        <View style={styles.container}>
            <Text style={styles.PropertyAddress}>{propertyAddress}</Text>
            <Pressable style={styles.button} onPress={() => navigation.navigate('EditProperty', { propertyID })}>
                <Text style={styles.buttonText}>Edit Property</Text>
            </Pressable>
            {!tenantID && (
                <Pressable style={styles.button} onPress={() => navigation.navigate('RegisterTenant', { propertyID })}>
                    <Text style={styles.buttonText}>Register</Text>
                </Pressable>
            )}
            {tenantID !== undefined && tenantID !== 0 && (
                <Pressable style={styles.button} onPress={handleUnregister}>
                    <Text style={styles.buttonText}>Un-Register</Text>
                </Pressable>
            )}
            {tenantID !== undefined && tenantID !== 0 && (
                <Pressable style={styles.button} onPress={() => navigation.navigate('ReceiveRent', { propertyID })}>
                    <Text style={styles.buttonText}>Receive Rent</Text>
                </Pressable>
            )}
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
        backgroundColor: "#fff",
        marginTop: -windowHeight * 0.1
    },
    logo: {
        width: windowWidth * 0.25,
        height: windowWidth * 0.25,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    PropertyAddress: {
        marginTop: windowHeight * 0.025,
        width: "90%",
        textAlign: "center",
        marginBottom: windowHeight * 0.2,
        fontSize: windowWidth * 0.08,
        fontWeight: 'bold',
        color: '#47b5ff'
    },
    button: {
        width: '60%',
        paddingVertical: windowHeight * 0.02,
        padding: windowHeight * 0.025,
        backgroundColor: '#e5e5e5',
        marginTop: windowHeight * 0.025,
        borderRadius: windowHeight * 0.3,
        borderColor: '#cdcdcd',
        borderWidth: windowHeight * 0.002,
    },
    buttonText: {
        color: '#06283d',
        textAlign: 'center',
        fontSize: windowWidth * 0.05,
    },
});
