import * as React from 'react';
import { StyleSheet, Text, View, Image, Pressable, TextInput, Platform } from 'react-native';
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";

export default function GetToKnow({ navigation }) {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

    const handleDateChange = (event, date) => {
        if (Platform.OS === 'android' && event.type === 'set') {
            setShowDatePicker(false);
            setSelectedDate(date || selectedDate);
        }
    };

    return (
        <View style={styles.container}>
            <Image source={require('../img/logoColored.png' )} style={styles.logo} />
            <Text style={styles.postHeader}>Let's Get to Know You!</Text>

            <View style={styles.input}>
                <TextInput placeholder="First Name" placeholderTextColor="#cdcdcd" style={styles.textInput} />
                <View style={styles.iconContainer}>
                    <Image source={require('../assets/userIcon.png')} style={styles.placeholderIcon} />
                </View>
            </View>
            <View style={styles.input}>
                <TextInput placeholder="Last Name" placeholderTextColor="#cdcdcd" style={styles.textInput} />
                <View style={styles.iconContainer}>
                    <Image source={require('../assets/userIcon.png')} style={styles.placeholderIcon} />
                </View>
            </View>

            <View style={styles.datePickerContainer}>
                <Pressable
                    style={{
                        backgroundColor: '#fff',
                        marginTop: 5,
                        marginBottom: 5,
                        padding: 10,
                        borderColor: 'black',
                        borderWidth: 2,
                        borderRadius: 20,
                        flexDirection: 'row',
                        alignItems: 'center',
                        color: '#cdcdcd',
                        width: '250'
                    }}
                    onPress={() => setShowDatePicker(true)}
                >
                    <Text style={{ color: '#cdcdcd' ,width: 200}}>{selectedDate.toDateString()}</Text>
                    <Image source={require('../img/calendarIcon.png')} style={{ width: 20, height: 20, marginLeft: 10 }} />
                </Pressable>
            </View>

            {showDatePicker && (
                <RNDateTimePicker
                    testID="dateTimePicker"
                    value={selectedDate}
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
                />)
            }

            <View style={styles.buttonContainer}>
                <Pressable style={styles.button}>
                    <Text style={styles.buttonText}>Back</Text>
                </Pressable>

                <View style={styles.space} />
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
    },
    logo: {
        width: 100,
        height: 100,
    },
    headerText: {
        fontSize: 25,
        paddingTop: 15,
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
        color: '#47b5ff'

    },
});
