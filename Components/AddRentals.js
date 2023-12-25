import * as React from 'react';
import {Alert, Image, Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {useState} from "react";
import axios from "axios";
import {Formik} from 'formik';
import * as Yup from 'yup';

export default function AddRentals({navigation, route}) {

    const {userID, tenantID } = route.params;
    const ipAddress = route.params.ipAddress;
    console.log("userID: " + userID);
    console.log("tenantID: " + tenantID);

    const [propertyAddress, setPropertyAddress] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [rentAmount, setRentAmount] = useState('');
    const [error, setError] = useState('');


    const addPropertiesSchema = Yup.object().shape({
        propertyAddress: Yup.string()
            .min(5, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        dueDate: Yup.number()
            .integer('Due Date must be an integer')
            .min(1, 'Due Date must be between 1 and 31')
            .max(31, 'Due Date must be between 1 and 31')
            .required('Required'),
        rentAmount: Yup.number()
            .min(1, 'Rent Amount must be at least 1')
            // .max(1000000, 'Rent Amount must be less than 1,000,000')
            .required('Required'),
    });

    const handleAddProperty = async (values) => {
        try {
            const response = await axios.post(ipAddress + 'api/add-property', {
                ownerID: ownerID,
                rent: values.rentAmount,
                dueDate: values.dueDate,
                propertyAddress: values.propertyAddress
            });

            if (response.data.success) {
                Alert.alert('Property Successfully Added!')
                navigation.navigate('MyProperties', {userID, tenantID });
            }
        } catch (error) {
            console.error('Error during adding property:', error);
        }
    };

    return (

        <Formik
            initialValues={{propertyAddress: '', dueDate: '', rentAmount: ''}}
            validationSchema={addPropertiesSchema}
            onSubmit={handleAddProperty}
        >
            {({values, errors, touched, handleChange, setFieldTouched, isValid, handleSubmit}) => (

                <View style={styles.container}>

                    <Text style={styles.postHeader}>Add Property {'\n'}Information</Text>

                    <View style={styles.input}>
                        <TextInput
                            placeholder="Address"
                            style={styles.textInput}
                            onChangeText={handleChange('propertyAddress')}
                            onBlur={() => setFieldTouched('propertyAddress')}
                            value={values.propertyAddress}
                        />
                        <View style={styles.iconContainer}>
                            <Image source={require('../img/locationIcon.png')} style={styles.placeholderIcon}/>
                        </View>
                    </View>
                    {touched.propertyAddress && errors.propertyAddress &&
                        <Text style={styles.errorText}>{errors.propertyAddress}</Text>
                    }
                    <View style={styles.input}>
                        <TextInput
                            placeholder="Due Date"
                            keyboardType="numeric"
                            style={styles.textInput}
                            onChangeText={handleChange('dueDate')}
                            onBlur={() => setFieldTouched('dueDate')}
                            value={values.dueDate}
                        />
                        <View style={styles.iconContainer}>
                            <Image source={require('../img/hashtag.png')} style={styles.placeholderIcon}/>
                        </View>
                    </View>
                    {touched.dueDate && errors.dueDate &&
                        <Text style={styles.errorText}>{errors.dueDate}</Text>
                    }

                    <View style={styles.input}>
                        <TextInput
                            placeholder="Rent Amount"
                            keyboardType="numeric"
                            style={styles.textInput}
                            onChangeText={handleChange('rentAmount')}
                            onBlur={() => setFieldTouched('rentAmount')}
                            value={values.rentAmount}
                        />
                        <View style={styles.iconContainer}>
                            <Image source={require('../img/dollarIcon.png')} style={styles.placeholderIcon}/>
                        </View>
                    </View>
                    {touched.rentAmount && errors.rentAmount &&
                        <Text style={styles.errorText}>{errors.rentAmount}</Text>
                    }

                    <View style={styles.buttonContainer}>
                        <Pressable style={styles.button}
                                   onPress={() => navigation.navigate('MyRentals', {userID, tenantID })}>
                            <Text style={styles.buttonText}>Back</Text>
                        </Pressable>

                        <View style={styles.space}/>
                        <Pressable style={styles.button} onPress={handleSubmit}>
                            <Text style={styles.buttonText}>Next</Text>
                        </Pressable>

                    </View>
                </View>
            )}
        </Formik>

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
        color: 'black',
        textAlign: 'center'

    },
    errorText: {
        fontSize: 12,
        color: '#FF0D10',

    },
});
