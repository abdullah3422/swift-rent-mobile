import * as React from 'react';
import {Image, Pressable, StyleSheet, Text, TextInput, View} from 'react-native';

export default function TenantData({navigation}) {


    return (
        <View style={styles.container}>

            <Text style={styles.postHeader}>Tenant Data</Text>

            <View style={styles.input}>
                <TextInput placeholder="Name" placeholderTextColor="#cdcdcd" style={styles.textInput}/>
                <View style={styles.iconContainer}>
                    <Image source={require('../img/userIcon.png')} style={styles.placeholderIcon}/>
                </View>
            </View>
            <View style={styles.input}>
                <TextInput placeholder="Address" placeholderTextColor="#cdcdcd" style={styles.textInput}/>
                <View style={styles.iconContainer}>
                    <Image source={require('../img/locationIcon.png')} style={styles.placeholderIcon}/>
                </View>
            </View>
            <View style={styles.input}>
                <TextInput placeholder="Contact No." placeholderTextColor="#cdcdcd" style={styles.textInput}/>
                <View style={styles.iconContainer}>
                    <Image source={require('../img/hashtag.png')} style={styles.placeholderIcon}/>
                </View>
            </View>
            <View style={styles.input}>
                <TextInput placeholder="Email" placeholderTextColor="#cdcdcd" style={styles.textInput}/>
                <View style={styles.iconContainer}>
                    <Image source={require('../img/email.png')} style={styles.placeholderIcon}/>
                </View>
            </View>


            <View style={styles.buttonContainer}>
                <Pressable style={styles.button}>
                    <Text style={styles.buttonText}>Back</Text>
                </Pressable>

                <View style={styles.space}/>
                <Pressable style={styles.button} onPress={() => navigation.navigate('ContactInfo')}>
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
        marginTop: -200,
        marginBottom: 30
    },

    headerText: {
        fontSize: 25,
        paddingTop: 16,
        color: 'black',
        fontWeight: 'bold',
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
        justifyContent: 'space-between',
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
        backgroundColor: '#e5e5e5',
        borderColor: '#cdcdcd',
        borderWidth: 2,
        borderRadius: 20,
        padding: 10,

    },
    space: {
        width: 20,
    },
    buttonText: {
        color: 'black',

    },
    datePickerContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',

    },
    selectDateText: {
        color: '#47B5FF',
        fontWeight: 'bold',
        marginBottom: 5,
    },
    postHeader: {

        marginTop: 20,
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'black',
        textAlign: 'center'

    },
});
