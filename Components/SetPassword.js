import * as React from 'react';
import {StyleSheet, Text, View, Pressable, TextInput, Image} from 'react-native';

export default function RegisterScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={require('../img/logoColored.png')} style={styles.logo} />
            </View>
            <Text style={styles.passwordText}>Please set a {'\n'}Strong Password</Text>

            <TextInput
                style={styles.input}
                placeholder="Enter Password"
                placeholderTextColor="#cdcdcd"
                secureTextEntry={true}
            />
            <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                placeholderTextColor="#cdcdcd"
                secureTextEntry={true}
            />
            <View style={styles.buttonContainer}>
                <Pressable style={[styles.button, { width: 160 }]}>
                    <Text style={styles.buttonText}>Back</Text>
                </Pressable>
                <View style={styles.space} />
                <Pressable style={[styles.button, { width: 160 }]} onPress={() => navigation.navigate('SetUp')}>
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
        marginTop: -50,

    },
    logo: {
        width: 100,
        height: 100,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: -180,
        marginBottom: 10,
    },
    headerText: {
        fontSize: 28,
        color: 'black',
        fontWeight: 'bold',

    },
    passwordText: {
        color: "#47B5FF",
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 15,

    },
    input: {
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
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 165,
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
