import React from 'react';
import {Alert, Dimensions, Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import axios from 'axios';
import {Formik} from 'formik';
import * as Yup from 'yup';
import { isValid, isLeapYear, getDaysInMonth } from 'date-fns';

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
                            email: response.data.email !== null ? response.data.email : "",
                            phone: response.data.phone !== null ? response.data.phone : "",
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
                            email: response.data.email !== null ? response.data.email : "",
                            phone: response.data.phone !== null ? response.data.phone : "",
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

    async function handleEditAccount() {
        try {
            const verificationResponse = await axios.post(ipAddress + 'api/signup-contact', {
                userID: userID,
                email: data.email,
                phone: data.phone,
            });
            if (data.email || data.phone) {
                if (verificationResponse.data.success) {
                    const editUserResponse = await axios.put(ipAddress + 'api/admin/edit-user', {
                        userID: userID,
                        userName: data.Name,
                        email: data.email,
                        phone: data.phone,
                        DOB: String(data.Year + "-" + data.Month + "-" + data.Day)
                    });
                    if (editUserResponse.data.success) {
                        Alert.alert('Data Successfully Updated');
                        if (ownerID !== undefined) {
                            navigation.navigate('OwnerProfile', {userID, ownerID});
                        } else if (tenantID !== undefined) {
                            navigation.navigate('TenantProfile', {userID, tenantID});
                        }
                    }
                }
            } else {
                Alert.alert('Fields Cannot be Empty', 'Please make sure that either email or phone is entered.')
            }
        } catch (error) {
            console.log('Error during updating data:', error);
            const lastThreeNumbers = String(error).match(/\d{3}$/);
            if (String(lastThreeNumbers) === "500") {
                Alert.alert("Error: Wrong Inputs","Make sure the date is valid.");
            }
            if (String(lastThreeNumbers) === "420") {
                Alert.alert("Error:","Credential(s) not unique.");
            }
        }
    }

    const editAccountSchema = Yup.object().shape({
        Name: Yup.string()
            .matches(/^[a-zA-Z.\s]+$/, 'Only letters are allowed')
            .min(2, 'Too Short!')
            .max(100, 'Too Long!')
            .required('Name Required'),
        email: Yup.string()
            .email('Invalid email')
            .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email'),
        phone: Yup.string()
            .matches(/^\d{11}$/, 'Invalid phone'),
        Year: Yup.number()
            .min(1900, 'Invalid year')
            .max(2006, 'Must be 18')
            .required('Year Required')
            .test('valid-year', 'Invalid year', (value) => isValid(new Date(value, 0, 1))),
        Month: Yup.number()
            .min(1, 'Invalid month')
            .max(12, 'Invalid month')
            .required('Month Required'),
        Day: Yup.number()
            .min(1, 'Invalid day')
            .max(31, 'Invalid day')
            .required('Day Required')
            .test('valid-date', 'Invalid date', function (value) {
                const { Year, Month } = this.parent;

                // Check if it's a leap year
                const isLeap = isLeapYear(new Date(Year, 1, 1));

                // Check if the day is within the valid range for the given month
                const maxDaysInMonth = getDaysInMonth(new Date(Year, Month - 1));

                return value >= 1 && value <= maxDaysInMonth && !(Month === 2 && value === 29 && !isLeap);
            }),
    });


    return (

        <Formik
            enableReinitialize={true}
            initialValues={{
                Name: data.Name,
                email: data.email,
                phone: data.phone,
                Year: data.Year,
                Month: data.Month,
                Day: data.Day,
            }}
            validationSchema={editAccountSchema}
            onSubmit={handleEditAccount}
        >
            {({values, errors, touched, handleChange, setFieldTouched, isValid, handleSubmit, handleBlur}) => (

                <View style={styles.container}>
                    <Text style={styles.headerText}>Edit Account {'\n'} Information </Text>

                    <TextInput
                        style={styles.input}
                        defaultValue={String(data.Name)}
                        onChangeText={(text) => {
                            setData({...data, Name: text});
                            handleChange('Name')(text);
                        }}
                        onBlur={handleBlur('Name')}
                    />

                    <TextInput
                        style={styles.input}
                        defaultValue={String(data.email)}
                        onChangeText={(text) => {
                            setData({...data, email: text});
                            handleChange('email')(text);
                        }}
                        onBlur={handleBlur('email')}
                    />

                    <TextInput
                        style={styles.input}
                        defaultValue={String(data.phone)}
                        onChangeText={(text) => {
                            setData({...data, phone: text});
                            handleChange('phone')(text);
                        }}
                        onBlur={handleBlur('phone')}
                    />
                    <View style={{flexDirection: "row", height: 20}} >
                        {touched.Name && errors.Name && <Text style={styles.errorText}>{errors.Name}</Text>}
                        {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
                        {touched.phone && errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
                    </View>

                    <View style={styles.dateInputContainer}>
                        <TextInput
                            defaultValue={String(data.Year)}
                            style={styles.dateInput}
                            keyboardType="number-pad"
                            onChangeText={(text) => {
                                setData({...data, Year: text});
                                handleChange('Year')(text);
                            }}
                            onBlur={handleBlur('Year')}
                        />

                        <TextInput
                            defaultValue={String(data.Month)}
                            style={styles.dateInput}
                            keyboardType="number-pad"
                            onChangeText={(text) => {
                                setData({...data, Month: text});
                                handleChange('Month')(text);
                            }}
                            onBlur={handleBlur('Month')}
                        />

                        <TextInput
                            defaultValue={String(data.Day)}
                            style={styles.dateInput}
                            keyboardType="number-pad"
                            onChangeText={(text) => {
                                setData({...data, Day: text});
                                handleChange('Day')(text);
                            }}
                            onBlur={handleBlur('Day')}
                        />

                    </View>
                    <View style={{flexDirection: "row", height: 20}} >
                        {touched.Year && errors.Year && <Text style={styles.errorText}>{errors.Year}</Text>}
                        {touched.Month && errors.Month && <Text style={styles.errorText}>{errors.Month}</Text>}
                        {touched.Day && errors.Day && <Text style={styles.errorText}>{errors.Day}</Text>}
                    </View>

                    <View style={styles.buttonContainer}>
                        <View style={styles.space}/>
                        <Pressable style={[styles.button, {width: 160}]} onPress={handleSubmit}>
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        width: '100%',
        height: 800,
    },
    headerText: {
        color: 'black',
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: -160,
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
        fontSize: 12,
        color: '#FF0D10',
        marginHorizontal: 5,
    },
});
