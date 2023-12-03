import * as React from 'react';
import {useState} from 'react';
import {Dimensions, Image, Platform, Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import RNDateTimePicker from "@react-native-community/datetimepicker";

import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';



export default function GetToKnow({ navigation }) {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

    const handleDateChange = (event, date) => {
        if (Platform.OS === 'android' && event.type === 'set') {
            setShowDatePicker(false);
            setSelectedDate(date || selectedDate);
        }
    };

    const getToKnowSchema = Yup.object().shape({
        firstName: Yup.string()
            .matches(/^[a-zA-Z.]+$/, 'Only letters are allowed')
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        lastName: Yup.string()
            .matches(/^[a-zA-Z.]+$/, 'Only letters are allowed')
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        email: Yup.string().email('Invalid email').required('Required'),
    });

    return (

        <Formik initialValues={{
            firstName: '',
            lastName:''
        }}
                validationSchema={getToKnowSchema}
        >
            {({values,errors,touched,handleChange,setFieldTouched,isValid,handleSubmit}) =>(

            <View style={styles.container}>
                <Image source={require('../img/logoColored.png' )} style={styles.logo} />
                <Text style={styles.postHeader}>Let's Get to Know You!</Text>

                <View style={styles.input}>

                    <TextInput
                        placeholder="First Name"
                        placeholderTextColor="#888"
                        tyle={styles.textInput}
                        value={values.firstName}
                        onChangeText={handleChange('firstName')}
                        onBlur={() => setFieldTouched('firstName')}
                    />


                    <View style={styles.iconContainer}>
                        <Image source={require('../assets/userIcon.png')} style={styles.placeholderIcon} />
                    </View>
                </View>
                {touched.firstName && errors.firstName && (
                    <Text style={styles.errorTxt} >{errors.firstName}</Text>
                )}
                <View style={styles.input}>
                    <TextInput
                        placeholder="Last Name"
                        placeholderTextColor="#888"
                        style={styles.textInput}
                        value={values.lastName}
                        onChangeText={handleChange('lastName')}
                        onBlur={() => setFieldTouched('lastName')}
                    />


                    <View style={styles.iconContainer}>
                        <Image source={require('../assets/userIcon.png')} style={styles.placeholderIcon} />
                    </View>
                </View>
                {touched.lastName && errors.lastName && (
                    <Text style={styles.errorTxt} >{errors.lastName}</Text>
                )}
                <View style={styles.datePickerContainer}>
                    <Pressable
                        style={{
                            marginTop: 5,
                            marginBottom: 5,
                            padding: 10,
                            borderWidth: 2,
                            borderRadius: 20,
                            flexDirection: 'row',
                            alignItems: 'center',

                            width: windowWidth * 0.8
                        }}
                        onPress={() => setShowDatePicker(true)}
                    >
                        {/*add placeholder color change when select date*/}

                        <Text style={{ color: '#888' ,width: 200}}>{selectedDate.toDateString()}</Text>
                        <Image source={require('../img/calendarIcon.png')} style={styles.datePlaceholderIcon} />
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
                    <Pressable style={styles.button} onPress={() => navigation.navigate('WhoAreYou')}>
                        <Text style={styles.buttonText}>Back</Text>
                    </Pressable>

                    <View style={styles.space} />
                    <Pressable style={styles.button} onPress={() => navigation.navigate('ContactInfo')}>
                        <Text style={styles.buttonText}>Next</Text>
                    </Pressable>
                </View>
            </View>
                )}
        </Formik>

    );
}



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        width: '100%',
        padding: windowWidth * 0.05,
    },
    logo: {
        width: windowWidth * 0.25,
        height: windowWidth * 0.25,
        marginTop: -windowHeight * 0.2,
    },
    headerText: {
        fontSize: windowWidth * 0.05,
        paddingTop: windowHeight * 0.02,
        color: 'black',
        fontWeight: 'bold',
    },
    input: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%',
        height: windowHeight * 0.06,
        borderColor: '#06283d',
        borderWidth: 2,
        borderRadius: windowWidth * 0.05,
        padding: windowWidth * 0.03,
        marginTop: windowHeight * 0.005,
        marginBottom: windowHeight * 0.01,
        backgroundColor: '#fff',
        fontWeight: 'bold',
        justifyContent: 'space-between',
    },
    placeholderIcon: {
        width: windowWidth * 0.06,
        height: windowWidth * 0.06,
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
        width: '55%',
        marginTop: windowHeight * 0.02,
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e5e5e5',
        borderColor: '#cdcdcd',
        borderWidth: 2,
        borderRadius: windowWidth * 0.06,
        padding: windowWidth * 0.02,
    },
    space: {
        width: windowWidth * 0.04,
    },
    buttonText: {
        color: 'black',
    },
    datePickerContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        //width: '90%',
    },
    datePlaceholderIcon: {
        width: windowWidth * 0.06,
        height: windowWidth * 0.05,
        marginLeft: windowWidth * 0.17,
    },
    selectDateText: {
        color: '#47B5FF',
        fontWeight: 'bold',
        marginBottom: windowHeight * 0.01,
    },
    postHeader: {
        marginTop: windowHeight * 0.02,
        fontSize: windowWidth * 0.07,
        fontWeight: 'bold',
        marginBottom: windowHeight * 0.02,
        color: '#47b5ff',
    },
    errorTxt: {
        fontSize: windowWidth * 0.03,
        color: '#FF0D10',
    },
});


