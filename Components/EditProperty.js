import React, { useEffect } from 'react';
import { Alert, Text, TextInput, View, StyleSheet, Pressable } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import axios from "axios";
import * as Yup from "yup";
import {Formik} from "formik";

export default function EditProperty({ navigation, route }) {
    const { userID, ownerID, propertyID } = route.params;
    const ipAddress = route.params.ipAddress;
    console.log(route.params);

    const [data, setData] = React.useState({
        propertyAddress: '',
        dueDate: '',
        rent: '',
    });

    useFocusEffect(
        React.useCallback(() => {
            const handleInitialData = async () => {
                try {
                    const response = await axios.post(ipAddress + 'api/fetch-property', {
                        propertyID: propertyID,
                    });
                    if (response.data.success) {
                        setData({
                            propertyAddress: String(response.data.propertyAddress),
                            dueDate: String(response.data.dueDate),
                            rent: String(response.data.rent),
                        });
                    }
                } catch (error) {
                    console.log("Error fetching property data:", error);
                }
            };
            handleInitialData();
        }, [propertyID])
    );

    async function handlePropertyEdit() {
        try {
            console.log(data.propertyAddress);
            const response = await axios.post(ipAddress + 'api/edit-property', {
                propertyID: propertyID,
                propertyAddress: data.propertyAddress,
                dueDate: data.dueDate,
                rent: data.rent,
            });
            if (response.data.success) {
                Alert.alert('Success', 'Property data successfully updated')
                navigation.navigate('MyProperties', { userID, ownerID });
            }
        } catch (error) {
            console.log("Error updating property data:", error);
            Alert.alert("Error updating property data:");
        }
    }

    const editPropertiesSchema = Yup.object().shape({
        propertyAddress: Yup.string()
            .min(5, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        dueDate: Yup.number()
            .integer('Due Date must be an integer')
            .min(1, 'Due Date must be between 1 and 31')
            .max(31, 'Due Date must be between 1 and 31')
            .required('Required'),
        rent: Yup.number()
            .min(1, 'Rent Amount must be at least 1')
            // .max(1000000, 'Rent Amount must be less than 1,000,000')
            .required('Required'),
    });

    return (
        <Formik
            enableReinitialize={true}
            initialValues={{
                propertyAddress: data.propertyAddress,
                dueDate: data.dueDate,
                rent: data.rent }}
            validationSchema={editPropertiesSchema}
            onSubmit={handlePropertyEdit}
        >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (

                <View style={styles.container}>
                    <Text style={styles.headerText}>Edit Property {'\n'} Information</Text>

                    <Text style={styles.fieldHeading}> Property Address</Text>
                    <TextInput
                        style={styles.input}
                        defaultValue={String(data.propertyAddress)}
                        onChangeText={(text) => {
                            setData({ ...data, propertyAddress: text });
                            handleChange('propertyAddress')(text);
                        }}
                        onBlur={handleBlur('propertyAddress')}
                        placeholderTextColor="#cdcdcd"
                    />

                    {touched.propertyAddress && errors.propertyAddress && (
                        <Text style={styles.errorText}>{errors.propertyAddress}</Text>
                    )}

                    <Text style={styles.fieldHeading}> Due Date</Text>
                    <TextInput
                        style={styles.input}
                        defaultValue={String(data.dueDate)}
                        onChangeText={(text) => {
                            setData({ ...data, dueDate: text });
                            handleChange('dueDate')(text);
                        }}
                        onBlur={handleBlur('dueDate')}
                        placeholderTextColor="#cdcdcd"
                    />
                    {touched.dueDate && errors.dueDate && <Text style={styles.errorText}>{errors.dueDate}</Text>}
                    <Text style={styles.fieldHeading}> Rent</Text>
                    <TextInput
                        style={styles.input}
                        defaultValue={String(data.rent)}
                        onChangeText={(text) => {
                            setData({ ...data, rent: text });
                            handleChange('rent')(text);
                        }}
                        onBlur={handleBlur('rent')}
                        placeholderTextColor="#cdcdcd"
                    />
                    {touched.rent && errors.rent && <Text style={styles.errorText}>{errors.rent}</Text>}


                    <View style={styles.buttonContainer}>
                        <View style={styles.space} />
                        <Pressable style={[styles.button, { width: 160 }]} onPress={handleSubmit}>
                            <Text style={styles.buttonText}>Change</Text>
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
        marginTop: '-50%',
    },
    fieldHeading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 5,
        color: 'grey',
        textAlign: 'left', // Aligning text to the left
        alignSelf: 'flex-start', // Move text to the start of the container
        width: '75%', // Adjust width to limit heading width
        marginLeft: '12%', // Add left margin for better alignment
        marginBottom: 5, // Adjust as needed
    },
    headerText: {
        color: 'black',
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: '15%',
        justifyContent: 'center',
        alignContent: 'center',
    },
    input: {
        width: '75%',
        height: 40,
        borderColor: '#06283d',
        borderWidth: 2,
        borderRadius: 15,
        padding: 10,
        marginTop: 3,
        marginBottom: 5,
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
        marginTop: '15%',
    },
    space: {
        width: 10,
    },
    buttonText: {
        color: 'black',
    },
    errorText: {
        // fontSize: 12,
        color: '#FF0D10',

    },
});
