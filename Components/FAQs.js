import * as React from 'react';
import {Image, Pressable, StyleSheet, Text, TextInput, View} from 'react-native';

export default function FAQs({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Frequently Asked {'\n'}{'\t'}{'\t'}{'\t'}{'\t'}{'\t'}{'\t'}Questions</Text>

            <Pressable style={styles.button}>
                <Text>How to add a Property</Text>
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <Image style={styles.Pics} source={require('../img/downArrow.png')}/>
                </View>
            </Pressable>
            <Pressable style={styles.button}>
                <Text>How register a Tenant</Text>
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                <Image style={styles.Pics} source={require('../img/downArrow.png')}/>
                </View>
            </Pressable>
            <Pressable style={styles.detailedButton}>
                <Text>How to change a Tenant</Text>
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                <Image style={styles.Pics} source={require('../img/upArrow.png')}/>
                </View>
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
    button: {
        width: '90%',
        height: 40,
        borderColor: '#cdcdcd',
        borderWidth: 2,
        borderRadius: 30,
        padding: 10,
        paddingVertical:'2%',
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
    detailedButton: {
        width: '90%',
        height: 100,

        borderColor: '#cdcdcd',
        borderWidth: 2,
        borderRadius: 15,
        padding: 10,
        marginTop: 3,
        marginBottom: 10,
        backgroundColor: '#fff',
        fontWeight: 'bold',
    },

    space: {
        width: 10,
    },
    buttonText: {
        color: 'black',
    },
    Pics: {
        width: 20,
        height: 20,
        marginTop: -18
    }
});
