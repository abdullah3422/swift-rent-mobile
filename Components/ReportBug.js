import * as React from 'react';
import {Alert, StyleSheet, Text, TextInput, View, Pressable} from 'react-native';
import axios from 'axios';
import {useState} from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';

export default function ReportBug({navigation, route}) {
    const ipAddress = route.params.ipAddress;

    const {userID, ownerID, tenantID} = route.params;

    const [bugType, setBugType] = useState('');
    const [bugDescription, setBugDescription] = useState('');

    // Determine userType based on ownerID and tenantID
    let userType = '';
    if (ownerID !== undefined) {
        userType = 'O';
    } else if (tenantID !== undefined) {
        userType = 'T';
    }

    const submitBugReport = async (values) => {
        try {
            const response = await axios.post(ipAddress + 'api/report-bug', {
                userID: userID,
                userType: userType,
                bugType: values.bugType,
                bugDescription: values.bugDescription,
            });

            if (response.data.success) {
                // Handle success, e.g., show a confirmation message
                Alert.alert('Bug report submitted successfully');

                console.log('Bug report submitted successfully');

                if (ownerID !== undefined) {
                    navigation.navigate('OwnerProfile', { userID, ownerID });
                } else if (tenantID !== undefined) {
                    navigation.navigate('TenantProfile', { userID, tenantID });
                }
            }
        } catch (error) {
            Alert.alert('Error Submitting Bug Report');
            console.error('Error submitting bug report:', error);
        }
    };

    return (
        <Formik
            initialValues={{bugType: '', bugDescription: ''}}
            validationSchema={Yup.object().shape({
                bugType: Yup.string()
                    .max(30, 'Bug Type must be up to 30 characters')
                    .required('Bug Type is required'),
                bugDescription: Yup.string().required('Bug Description is required'),
            })}
            onSubmit={submitBugReport}
        >
            {({values, errors, touched, handleChange, setFieldTouched, isValid, handleSubmit}) => (
                <View style={styles.container}>
                    <Text style={styles.headerText}>Register a Complaint</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Type of Issue"
                        placeholderTextColor="#cdcdcd"
                        onChangeText={handleChange('bugType')}
                        onBlur={() => setFieldTouched('bugType')}
                        value={values.bugType}
                    />
                    {touched.bugType && errors.bugType && (
                        <Text style={styles.errorText}>{errors.bugType}</Text>
                    )}

                    <TextInput
                        style={styles.inputDescribe}
                        placeholder="Describe your problem"
                        placeholderTextColor="#cdcdcd"
                        multiline
                        numberOfLines={4}
                        onChangeText={handleChange('bugDescription')}
                        onBlur={() => setFieldTouched('bugDescription')}
                        value={values.bugDescription}
                    />
                    {touched.bugDescription && errors.bugDescription && (
                        <Text style={styles.errorText}>{errors.bugDescription}</Text>
                    )}

                    <View style={styles.buttonContainer}>
                        <View style={styles.space}/>
                        <Pressable style={[styles.button, {width: 160}]} onPress={handleSubmit}>
                            <Text style={styles.buttonText}>Submit</Text>
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
        marginTop: '-45%',
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
        marginTop: '15%',
    },
    space: {
        width: 10,
    },
    buttonText: {
        color: 'black',
    },
    errorText: {
        color: 'red',
    },
});
