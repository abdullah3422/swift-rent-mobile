import * as React from 'react';
import { StyleSheet, Text, View, Image, Pressable, TextInput } from 'react-native';
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
            <View style={styles.header}>

                <Text style={styles.headerText}>Let's Get to Know You!</Text>
            </View>

            <TextInput style={styles.input} placeholder="First Name" />
            <TextInput style={styles.input} placeholder="Last Name" />

            <View style={styles.datePickerContainer}>

                <Pressable
                    style={{
                        backgroundColor: '#47B5FF',
                        marginTop:5,
                        marginBottom:5,
                        padding: 10,
                        borderColor: '#1363DF',
                        borderWidth: 1,
                        borderRadius: 20,
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                    onPress={() => setShowDatePicker(true)}
                >
                    <Text style={{ color: 'white' }}>{selectedDate.toDateString()}</Text>
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
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: -300,
        marginBottom: 50,
    },
    headerText: {
        fontSize: 50,
        paddingTop: 15,
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
        color: '#fff',
        fontWeight: 'bold',
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
});
