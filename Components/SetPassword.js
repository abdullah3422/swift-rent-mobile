import * as React from 'react';
import { StyleSheet, Text, View, Pressable, TextInput } from 'react-native';

export default function RegisterScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Please set a Strong Password</Text>
            </View>

            <TextInput
                style={styles.input}
                placeholder="Enter Password"
                placeholderTextColor="white"
                secureTextEntry={true}
            />
            <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                placeholderTextColor="white"
                secureTextEntry={true}
            />
            <View style={styles.buttonContainer}>
                <Pressable style={styles.button}>
                    <Text style={styles.buttonText}>Back</Text>
                </Pressable>
                <View style={styles.space} />
                <Pressable style={styles.button}>
                    <Text style={styles.buttonText}>Register</Text>
                </Pressable>
            </View>

            <Pressable style={{marginTop:10}} onPress={() => navigation.navigate('SetUp')}>
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
        marginTop: -50,
    },
    header: {
        marginTop: -300,
        marginBottom: 10,
    },
    headerText: {
        fontSize: 28,
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
        color: 'white',
        fontWeight: 'bold',
    },
});
