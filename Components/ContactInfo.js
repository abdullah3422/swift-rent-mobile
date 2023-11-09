import * as React from 'react';
import {Image, Pressable, StyleSheet, Text, TextInput, View} from 'react-native';

export default function LoginScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={require('../img/logoColored.png')} style={styles.logo} />
                <View>
                    <Text style={styles.headerText}>We need your information</Text>
                </View>
            </View>

            <View style={styles.inputContainer}>
                <View style={styles.inputWithIcon}>
                    <TextInput style={styles.input} placeholder="Email Address" placeholderTextColor="#cdcdcd" keyboardType="email-address" />
                    <Image source={require('../img/email.png')} style={styles.imageStyle} />
                </View>
            </View>

            <View style={styles.inputContainer}>
                <View style={styles.inputWithIcon}>
                    <TextInput style={styles.input} placeholder="Mobile Number" placeholderTextColor="#cdcdcd" keyboardType="numeric" />
                    <Image source={require('../img/hashtag.png')} style={styles.imageStyle} />
                </View>
            </View>

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

    },
    logo: {
        width: 100,
        height: 100,
    },
    header: {
        flexDirection: 'column', // Align items in a column
        alignItems: 'center',
        marginTop: -180,
        marginBottom: 10,
    },
    headerText: {
        marginTop: 20,
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#47b5ff',
    },
    inputContainer: {
        marginBottom: 10,
    },
    inputWithIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 250,
        borderColor: '#06283d',
        borderWidth: 2,
        borderRadius: 15,
        backgroundColor: '#fff',
        marginBottom: 10,
        position: 'relative',
    },
    input: {
        width: '90%',
        height: 40,
        padding: 10,
        fontWeight: 'bold',
    },
    imageStyle: {
        position: 'absolute',
        right: 10,
        width: 25,
        height: 25,
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
        width: 10,
    },
    buttonText: {
        color: 'black',
    },
});
