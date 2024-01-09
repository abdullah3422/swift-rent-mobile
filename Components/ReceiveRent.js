import React from 'react';
import {Alert, Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import axios from 'axios';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useFocusEffect} from "@react-navigation/native";

export default function ReceiveRent({navigation, route}) {
    const {userID, ownerID, propertyID} = route.params;
    const ipAddress = route.params.ipAddress;
    const [data, setData] = React.useState({
        rentAmount: '',
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

    const handleRentCollection = async (values) => {
        try {
            const response = await axios.post(ipAddress + 'api/receive-rent', {
                propertyID: String(propertyID),
                rent: values.rentAmount,
            });
            if (response.data.success) {
                Alert.alert('Success', 'Rent successfully received!')
                navigation.navigate('MyProperties', {userID, ownerID});
            }
        } catch (error) {
            console.log("Error receiving rent:", error);
            Alert.alert("Error receiving rent");
        }
    };

    const rentValidationSchema = Yup.object().shape({
        rentAmount: Yup.number()
            .typeError('Rent must be a number')
            .min( parseInt(data.rent), 'Rent must be ' + String(data.rent))
            .max( parseInt(data.rent), 'Rent must be ' + String(data.rent))
            .required('Rent is required'),
    });

    return (
        <Formik
            initialValues={{rentAmount: ''}}
            validationSchema={rentValidationSchema}
            onSubmit={(values) => handleRentCollection(values)}
        >
            {({values, errors, touched, handleChange, handleBlur, handleSubmit}) => (
                <View style={styles.container}>
                    <Text style={styles.headerText}>Receive Rent</Text>
                    <View style={styles.textContainer}>
                        <Text style={styles.bodyText}>{data.propertyAddress}</Text>
                        <Text style={styles.bodyText}>Due Date: {data.dueDate}</Text>
                        <Text style={styles.bodyText}>Rent: {data.rent}</Text>
                    </View>

                    <View style={styles.input}>
                        <TextInput
                            placeholder="Rent Amount"
                            placeholderTextColor="#cdcdcd"
                            onChangeText={handleChange('rentAmount')}
                            onBlur={handleBlur('rentAmount')}
                            value={values.rentAmount}
                            keyboardType="numeric"
                        />
                    </View>

                    <View style={{flexDirection: "row", height: 20}} >
                        {touched.rentAmount && errors.rentAmount && (
                            <Text style={styles.errorText}>{errors.rentAmount}</Text>
                        )}
                    </View>

                    <View style={styles.buttonContainer}>
                        <Pressable
                            style={[styles.button, {width: 160}]}
                            onPress={handleSubmit}
                        >
                            <Text style={styles.buttonText}>Confirm</Text>
                        </Pressable>
                    </View>
                </View>
            )}
        </Formik>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        width: '100%',
        height: 800,
    },
    textContainer: {
        textAlign: 'left',
    },
    bodyText: {
        color: 'black',
        fontSize: 15,
    },
    headerText: {
        color: 'black',
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 30,
        marginTop: -295,
        justifyContent: 'center',
        alignContent: 'center',
        textAlign: 'center'
    },
    input: {
        width: '75%',
        height: 40,
        borderColor: '#06283d',
        borderWidth: 2,
        borderRadius: 15,
        padding: 10,
        marginTop: 15,
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
        marginTop: '15%',
    },
    space: {
        width: 10,
    },
    buttonText: {
        color: 'black',
    },
    errorText: {
        fontSize: 12,
        color: '#FF0D10',
        marginHorizontal: 5,
    },
});
