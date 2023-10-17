import * as React from 'react';
import { StyleSheet, Text, View, Image, Pressable, TextInput } from 'react-native';

export default function LoginScreen({navigation}) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>

                <Text style={styles.headerText}>We need your information</Text>
            </View>

            <TextInput style={styles.input} placeholder="Email Address" keyboardType="email-address"/>
            <TextInput style={styles.input} placeholder="Mobile Number"  keyboardType="numeric"/>
            <View style={styles.buttonContainer}>
                <Pressable style={styles.button}>
                    <Text style={styles.buttonText}>Back</Text>
                </Pressable>
                <View style={styles.space} />
                <Pressable style={styles.button} onPress={() => navigation.navigate('SetPassword')}>
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
        marginTop: -50,
    },
    logo: {
        width: 100,
        height: 100,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: -300,
        marginBottom: 10,
    },
    headerText: {
        fontSize: 50,
        paddingTop: 15,
        color: 'black',
        fontWeight: 'bold',
    },
    input: {
        width: 250,
        height: 40,
        borderColor: '#1363DF',
        borderWidth: 1,
        borderRadius: 20,
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#47B5FF',
        color: 'white',
        fontWeight: 'bold',
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
        backgroundColor: '#47B5FF',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 20,
        padding: 10,
    },
    space: {
        width: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
