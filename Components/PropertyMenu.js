import * as React from 'react';
import { Alert, Dimensions, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import axios from "axios";

export default function PropertyMenu({ navigation, route }) {
    const { userID, ownerID, tenantID, propertyID, propertyAddress, rentStatus } = route.params;
    const ipAddress = route.params.ipAddress;
    console.log("Property Menu:");
    console.log(route.params);



    async function handleUnregister() {
        //API to Un-register tenant
        try {
            const response = await axios.post(ipAddress + 'api/unregister-tenant', {
                propertyID: String(propertyID),
            });
            if (response.data.success) {
                Alert.alert('Success', 'Tenant successfully un-registered')
                navigation.navigate('MyProperties', { userID, ownerID });
            }
        } catch (error) {
            console.log("Error updating property data:", error);
            Alert.alert("Error un-registering tenant");
        }
    }

    async function handleDelete() {
        // Display a confirmation alert
        Alert.alert(
            "Confirm Delete",
            "Are you sure you want to delete this property? This action cannot be undone.",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Delete",
                    onPress: async () => {
                        try {
                            const response = await axios.post(ipAddress + 'api/delete-property', {
                                propertyID: String(propertyID),
                            });
                            if (response.data.success) {
                                Alert.alert('Success', 'Property has been deleted successfully');
                                navigation.navigate('MyProperties', { userID, ownerID });
                            }
                        } catch (error) {
                            console.log("Error deleting property:", error);
                            Alert.alert("Error deleting property");
                        }
                    },
                    style: "destructive", // This makes the button appear in red to indicate it's destructive
                },
            ]
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.PropertyAddress}>{propertyAddress}</Text>
            <Pressable style={styles.button} onPress={() => navigation.navigate('EditProperty', { userID, ownerID, propertyID })}>
                <Text style={styles.buttonText}>Edit Property</Text>
            </Pressable>
            {!tenantID && (
                <Pressable style={styles.button} onPress={() => navigation.navigate('RegisterTenant', { userID, ownerID, propertyID })}>
                    <Text style={styles.buttonText}>Register</Text>
                </Pressable>
            )}
            {tenantID !== undefined && tenantID !== 0 && (
                <Pressable style={styles.button} onPress={handleUnregister}>
                    <Text style={styles.buttonText}>Un-Register</Text>
                </Pressable>
            )}
            {tenantID !== undefined && tenantID !== 0 && rentStatus === "Collect" &&(
                <Pressable style={styles.button} onPress={() => navigation.navigate('ReceiveRent', { userID, ownerID, propertyID })}>
                    <Text style={styles.buttonText}>Receive Rent</Text>
                </Pressable>
            )}
            {!tenantID && (
            <Pressable style={styles.button} onPress={handleDelete}>
                <Text style={styles.buttonText}>Delete Property</Text>
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
