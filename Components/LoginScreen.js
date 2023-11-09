import * as React from 'react';
import {Image, Pressable, StyleSheet, Text, TextInput, View} from 'react-native';

// Assume 'userIcon' and 'eyeIcon' are imported correctly or provided as local resources

export default function LoginScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={require('../img/logoColored.png')} style={styles.logo} />
            </View>
            <Text style={styles.loginText}>Login</Text>

            <View style={styles.input}>
                <TextInput placeholder="Email or Number" placeholderTextColor="#cdcdcd" style={styles.textInput} />
                <View style={styles.iconContainer}>
                    <Image source={require('../assets/userIcon.png')} style={styles.placeholderIcon} />
                </View>
            </View>
            <View style={styles.input}>
                <TextInput placeholder="Password" placeholderTextColor="#cdcdcd" style={styles.textInput} secureTextEntry={true} />
                <View style={styles.iconContainer}>
                    <Image source={require('../assets/eye.png')} style={styles.placeholderIcon} />
                </View>
            </View>

            <View style={styles.buttonContainer}>
                <Pressable style={styles.button}>
                    <Text onPress={() => navigation.navigate('LoginAs')} style={styles.buttonText}>Continue</Text>
                </Pressable>
                <View style={styles.space} />
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
    },
    logo: {
        width: 100,
        height: 100,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: -30,
        marginBottom: 10,
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
        width: 40,
        backgroundColor: '#e5e5e5',
        borderColor: '#cdcdcd',
        borderWidth: 2,
        borderRadius: 30,
        padding: 10,
    },
    space: {
        width: 10,
    },
    buttonText: {
        color: '#06283d',

    },
    loginText: {
        color: "#47B5FF",
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 5,
    },
});
