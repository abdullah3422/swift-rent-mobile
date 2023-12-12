import * as React from 'react';
import {Image, Pressable, StyleSheet, Text, TextInput, View} from 'react-native';

export default function ReportBug({ navigation,route }) {

    // const ipAddress = route.params.ipAddress;
    // console.log(ipAddress);

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Report a Bug </Text>

            <TextInput
                style={styles.input}
                placeholder="Type of Issue"
                placeholderTextColor="#cdcdcd"
                secureTextEntry={true}
            />
            <TextInput
                style={styles.inputDescribe}
                placeholder="Describe your problem"
                placeholderTextColor="#cdcdcd"
                secureTextEntry={true}
            />
            <View style={styles.buttonContainer}>
                <View style={styles.space} />
                <Pressable style={[styles.button, { width: 160 }]} >
                    <Text style={styles.buttonText}>Submit</Text>
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
        marginTop: '-45%',

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
        width: '80%',
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
    inputDescribe: {
        width: '80%',
        height: 100,

        borderColor: '#06283d',
        borderWidth: 2,
        borderRadius: 15,
        padding: 10,
        marginTop: 3,
        marginBottom: 10,
        backgroundColor: '#fff',
        fontWeight: 'bold',
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