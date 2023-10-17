import * as React from 'react';
import { StyleSheet, Text, View, Image, Pressable, TextInput } from 'react-native';

export default function LoginScreen({navigation}) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={require('../img/logoColored.png')} style={styles.logo} />
                <Text style={styles.headerText}>Swift Rent</Text>
            </View>

            <TextInput style={styles.input} placeholder="Username" />
            <TextInput style={styles.input} placeholder="Password" secureTextEntry={true} />
            <View style={styles.buttonContainer}>
                <Pressable style={styles.button}>
                    <Text style={styles.buttonText}>Back</Text>
                </Pressable>
                <View style={styles.space} />
                <Pressable style={styles.button}>
                    <Text style={styles.buttonText}>Login</Text>
                </Pressable>

            </View>
            <Pressable onPress={() => navigation.navigate('LoginAs')}>
                <Text>Next</Text>
            </Pressable>
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
        marginTop: -180,
        marginBottom: 10,
    },
    headerText: {
        fontSize: 50,
        paddingTop: 15,
        color: '#1363DF',
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
