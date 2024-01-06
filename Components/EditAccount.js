import React from 'react';
import {Alert, Text, TextInput, View, StyleSheet, Pressable, Dimensions} from 'react-native';
import axios from 'axios';
import {useState} from 'react';
import {md5} from 'js-md5';
import {Formik} from 'formik';
import * as Yup from 'yup';

export default function EditAccount({navigation, route}) {
    const {userID, ownerID, tenantID} = route.params;
    const ipAddress = route.params.ipAddress;
    const [data, setData] = React.useState({
        Name: '',
        email: '',
        phone: '',
        Year: '',
        Month: '',
        Day: '',
    });
    React.useEffect(() => {
    const handleInitialData = async () => {
        if (ownerID !== undefined) {
            try {
                const response = await axios.post(ipAddress + 'api/owner-details', {
                    ownerID: ownerID
                });
                console.log(response.data.DOB);
                if (response.data.success) {
                    // Update the state with the owner's data
                    setData({
                        Name: response.data.ownerName,
                        email: response.data.email,
                        phone: response.data.phone,
                        Year: response.data.DOB.slice(0, 4),
                        Month: response.data.DOB.slice(5, 7),
                        Day: response.data.DOB.slice(8, 10),
                    });
                }
            } catch (error) {
                console.log('Error during fetching owner details:', error);
            }
        } else if (tenantID !== undefined) {
            try {
                const response = await axios.post(ipAddress + 'api/tenant-details', {
                    tenantID: tenantID
                });

                if (response.data.success) {
                    // Update the state with the owner's data
                    setData({
                        Name: response.data.tenantName,
                        email: response.data.email,
                        phone: response.data.phone,
                        Year: response.data.DOB.slice(0, 4),
                        Month: response.data.DOB.slice(5, 7),
                        Day: response.data.DOB.slice(8, 10),
                    });
                }
            } catch (error) {
                console.log('Error during fetching owner details:', error);
            }
        }
    };
    handleInitialData();
    }, [ownerID, tenantID, userID]);

    async function HandleChange() {
        try {
            const verificationResponse = await axios.post(ipAddress + 'api/signup-contact', {
                userID: userID,
                email: data.email,
                phone: data.phone,
            });
            if(verificationResponse.data.success){
                const editUserResponse = await axios.put(ipAddress + 'api/admin/edit-user', {
                    userID: userID,
                    userName: data.Name,
                    email: data.email,
                    phone: data.phone,
                    DOB: String(data.Year + "-" + data.Month + "-" + data.Day)
                });
                if(editUserResponse.data.success){
                    Alert.alert('Data Successfully Updated');
                    if (ownerID !== undefined) {
                        navigation.navigate('OwnerProfile', { userID, ownerID });
                    } else if (tenantID !== undefined) {
                        navigation.navigate('TenantProfile', { userID, tenantID });
                    }
                }
            }
        } catch (error) {
            console.log('Error during updating data:', error);
            const lastThreeNumbers = String(error).match(/\d{3}$/);
            if (String(lastThreeNumbers) === "420"){
                Alert.alert("Credential(s) not unique");
            }
        }
    }

        const editAccountSchema = Yup.object().shape({
            Name: Yup.string()
                .matches(/^[a-zA-Z.\s]+$/, 'Only letters are allowed')
                .min(2, 'Too Short!')
                .max(100, 'Too Long!')
                .required('Required'),
            email: Yup.string()
                .email('Invalid email address')
                .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email address')
            .required('Required'),
            phone: Yup.string()
                .matches(/^\d{11}$/, 'Invalid phone number')
                .required('Required'),
            Year: Yup.number().min(1900, 'Invalid year').max(2013, 'Invalid year').required('Year Required'),
            Month: Yup.number().min(1, 'Invalid month').max(12, 'Invalid month').required('Month Required'),
            Day: Yup.number().min(1, 'Invalid day').max(31, 'Invalid day').required(' Day Required')
        });


    return (

        <Formik
            initialValues={{
                Name: '',
                email:'',
                phone:'',
                Year: '',
                Month: '',
                Day: ''
            }}
            validationSchema={editAccountSchema}
            onSubmit={HandleChange}
        >
            {({ values, errors, touched, handleChange, setFieldTouched, isValid, handleSubmit, handleBlur }) => (

                <View style={styles.container}>
                    <Text style={styles.headerText}>Edit Account {'\n'} Information </Text>

                    <TextInput
                        style={styles.input}
                        defaultValue={data.Name}
                        onChangeText={handleChange('Name')}
                        onBlur={handleBlur('Name')}
                    />
                    {touched.Name && errors.Name && <Text style={styles.errorText}>{errors.Name}</Text>}
                    <TextInput
                        style={styles.input}
                        defaultValue={data.email}
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                    />
                    {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
                    <TextInput
                        style={styles.input}
                        defaultValue={data.phone}
                        onChangeText={handleChange('phone')}
                        onBlur={handleBlur('phone')}
                    />
                    {touched.phone && errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
                    <View style={styles.dateInputContainer}>
                        <TextInput
                            defaultValue={data.Year}
                            style={styles.dateInput}
                            keyboardType="number-pad"
                            onChangeText={handleChange('Year')}
                            onBlur={handleBlur('Year')}
                        />

                        <TextInput
                            defaultValue={data.Month}
                            style={styles.dateInput}
                            keyboardType="number-pad"
                            onChangeText={handleChange('Month')}
                            onBlur={handleBlur('Month')}
                        />

                        <TextInput
                            defaultValue={data.Day}
                            style={styles.dateInput}
                            keyboardType="number-pad"
                            onChangeText={handleChange('Day')}
                            onBlur={handleBlur('Day')}
                        />

                    </View>
                    {touched.Year && errors.Year && <Text style={styles.errorText}>{errors.Year}</Text>}
                    {touched.Month && errors.Month && <Text style={styles.errorText}>{errors.Month}</Text>}
                    {touched.Day && errors.Day && <Text style={styles.errorText}>{errors.Day}</Text>}
                    <View style={styles.buttonContainer}>
                        <View style={styles.space}/>
                        <Pressable style={[styles.button, {width: 160}]} onPress={handleChange}>
                            <Text style={styles.buttonText}>Change</Text>
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
        marginTop: '-25%',
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
    dateInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '81%',
        justifyContent: 'space-between',
        padding: 10
    },
    dateInput: {
        padding: 10,
        height: windowHeight * 0.06,
        borderRadius: windowWidth * 0.05,
        borderWidth: 2,
        borderColor: '#06283d',
        flex: 1,
        textAlign: "center",
        margin: 3,
        marginTop: 0
    },
    errorText: {
        fontSize: windowWidth * 0.03,
        color: '#FF0D10',
    },
});
