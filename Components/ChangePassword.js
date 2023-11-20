import * as React from 'react';
import {Image, Pressable, StyleSheet, Text, TextInput, View} from 'react-native';

export default function ChangePassword({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Change Your {'\n'}  Password </Text>

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
                <View style={styles.space} />
                <Pressable style={[styles.button, { width: 160 }]} onPress={() => navigation.navigate('SetUp')}>
                    <Text style={styles.buttonText}>Change</Text>
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

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: -180,
        marginBottom: 10,
    },

    headerText: {
        color: "black",
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: '15%',
        justifyContent: "center",
        alignContent: "center",


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
        marginTop: '15%'
    },
    space: {
        width: 10,
    },
    buttonText: {
        color: 'black',
    },
});
