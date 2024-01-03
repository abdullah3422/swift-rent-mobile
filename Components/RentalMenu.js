import * as React from 'react';
import { Alert, Dimensions, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import axios from "axios";

export default function RentalMenu({ navigation, route }) {
    const { userID, ownerID, tenantID, propertyID, propertyAddress, status } = route.params;
    const ipAddress = route.params.ipAddress;
    async function handleCashCollection() {
        //API to delete property handle admin side deleted properties check for owner as well
        try {
            const response = await axios.post(ipAddress + 'api/request-cash-collection', {
                ownerID: ownerID,
                tenantID: tenantID,
                propertyID: propertyID,
                paymentType:'P',
            });
            if (response.data.success) {
                Alert.alert('Success', 'Request Submitted')
                navigation.navigate('MyRentals', {userID, tenantID});
            }
        } catch (error) {
            console.log("Error submitting request:", error);
            Alert.alert("Error submitting request:");
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.LoginAs}>{propertyAddress}</Text>
            {status === "Pending" &&(
            <Pressable style={styles.button} onPress={handleCashCollection}>
                <Text style={styles.buttonText}>Request for Cash Collection</Text>
            </Pressable>
            )}
            {status === "Paid" &&(
                <Pressable style={styles.button}>
                    <Text style={styles.buttonText}>Already Requested</Text>
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
    LoginAs: {
        marginTop: windowHeight * 0.025,
        marginBottom: windowHeight * 0.2,
        fontSize: windowWidth * 0.08,
        fontWeight: 'bold',
        flexDirection: 'row',
        alignItems: 'center',
        textAlign: "center",
        color: '#47b5ff'
    },
    button: {
        width: '60%',
        paddingVertical: windowHeight * 0.02,
        padding: windowHeight * 0.025,
        backgroundColor: '#e5e5e5',
        marginTop: windowHeight * 0.2,
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
