import React, { useState } from 'react';
import { Alert, Text, TextInput, View, StyleSheet, Pressable } from 'react-native';
import axios from 'axios';

export default function RegisterTenant({ navigation, route }) {
    const { userID, ownerID, propertyID } = route.params;
    const ipAddress = route.params.ipAddress;

    const [tenantInfo, setTenantInfo] = useState({
        emailOrPhone: '', // Initialize state for email/phone input
    });

    // Function to handle registration
    const handleRegister = async () => {
        const { emailOrPhone } = tenantInfo;
        try {
            const response = await axios.post(ipAddress + 'api/register-tenant', {
                propertyID: String(propertyID),
                tenantEmailorPhone: emailOrPhone,
            });
            if (response.data.success) {
                Alert.alert('Success', 'Tenant successfully registered')
                navigation.navigate('MyProperties', { userID, ownerID });
            }
        } catch (error) {
            console.log("Error updating property data:", error);
            Alert.alert("Error","Tenant does not exist");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Register a{'\n'}Tenant</Text>

            <TextInput
                style={styles.input}
                placeholder="Tenant email or phone"
                placeholderTextColor="#cdcdcd"
                value={tenantInfo.emailOrPhone}
                onChangeText={(text) => setTenantInfo({ ...tenantInfo, emailOrPhone: text })}
            />

            <View style={styles.buttonContainer}>
                <View style={styles.space} />
                <Pressable style={[styles.button, { width: 160 }]} onPress={handleRegister}>
                    <Text style={styles.buttonText}>Register</Text>
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
});
