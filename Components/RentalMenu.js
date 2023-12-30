import * as React from 'react';
import { Alert, Dimensions, Image, Pressable, StyleSheet, Text, View } from 'react-native';

export default function RentalMenu({ navigation, route }) {
    const { userID, ownerID, tenantID } = route.params;
    console.log(userID);

    return (
        <View style={styles.container}>
            <Text style={styles.LoginAs}>Rental Address</Text>
            <Pressable style={styles.button} >
                <Text style={styles.buttonText}>Request for Cash Collection</Text>
            </Pressable>
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
