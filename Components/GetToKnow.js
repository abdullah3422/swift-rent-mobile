import * as React from 'react';
import {useState} from 'react';
import {Dimensions, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import { isLeapYear, isValid, getDaysInMonth } from 'date-fns';

export default function GetToKnow({navigation, route}) {
    const {userType} = route.params;
    console.log(userType);
    const [year, setYear] = useState('');
    const [month, setMonth] = useState('');
    const [day, setDay] = useState('');

    const handleData = async (values) => {

        console.log(values.firstName);
        console.log(values.lastName);
        console.log(values.year + "-" + values.month + "-" + values.day);

        let firstName = values.firstName, lastName = values.lastName,
            DOB = values.year + "-" + values.month + "-" + values.day;
        navigation.navigate('ContactInfo', {userType, firstName, lastName, DOB});

    };

    const getToKnowSchema = Yup.object().shape({
        firstName: Yup.string()
            .matches(/^[a-zA-Z.\s]+$/, 'Only letters are allowed')
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('First Name Required'),
        lastName: Yup.string()
            .matches(/^[a-zA-Z.\s]+$/, 'Only letters are allowed')
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Last Name Required'),
        year: Yup.number()
            .min(1900, 'Invalid year')
            .max(2006, 'Must be 18 to Register')
            .required('Year Required')
            .test('valid-year', 'Invalid year', (value) => isValid(new Date(value, 0, 1))),
        month: Yup.number()
            .min(1, 'Invalid month')
            .max(12, 'Invalid month')
            .required('Month Required'),
        day: Yup.number()
            .min(1, 'Invalid day')
            .max(31, 'Invalid day')
            .required('Day Required')
            .test('valid-date', 'Invalid date', function (value) {
                const { year, month } = this.parent;

                // Check if it's a leap year
                const isLeap = isLeapYear(new Date(year, 1, 1));

                // Check if the day is within the valid range for the given month
                const maxDaysInMonth = getDaysInMonth(new Date(year, month - 1));

                return value >= 1 && value <= maxDaysInMonth && !(month === 2 && value === 29 && !isLeap);
            }),
    });

    return (
        <Formik
            initialValues={{
                firstName: '',
                lastName: '',
                year: '',
                month: '',
                day: ''
            }}
            validationSchema={getToKnowSchema}
            onSubmit={handleData}
        >
            {({values, errors, touched, handleChange, setFieldTouched, isValid, handleSubmit}) => (
                <View style={styles.container}>
                    <Image source={require('../img/logoColored.png')} style={styles.logo}/>
                    <Text style={styles.postHeader}>Let's Get to Know You!</Text>
                    <View style={styles.input}>
                        <TextInput
                            placeholder="First Name"
                            placeholderTextColor="#888"
                            style={styles.textInput}
                            value={values.firstName}
                            onChangeText={handleChange('firstName')}
                            onBlur={() => setFieldTouched('firstName')}
                        />
                        <View style={styles.iconContainer}>
                            <Image source={require('../assets/userIcon.png')} style={styles.placeholderIcon}/>
                        </View>
                    </View>
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
                            <Image source={require('../assets/userIcon.png')} style={styles.placeholderIcon}/>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row', height: 20}}>
                    {touched.firstName && errors.firstName && (
                        <Text style={styles.errorTxt}>{errors.firstName}</Text>
                    )}
                    {touched.lastName && errors.lastName && (
                        <Text style={styles.errorTxt}>{errors.lastName}</Text>
                    )}
                    </View>
                    <Text style={styles.postBody}>Enter your Date of Birth</Text>
                    <View style={styles.dateInputContainer}>
                        <TextInput
                            placeholder="Year"
                            //style={styles.dateInput}
                            placeholderTextColor="#888"
                            style={styles.dateInput}
                            keyboardType="number-pad"
                            value={values.year}
                            onChangeText={handleChange('year')}
                            onBlur={() => setFieldTouched('year')}
                        />
                        <TextInput
                            placeholder="Month"
                            //style={styles.dateInput}
                            placeholderTextColor="#888"
                            style={styles.dateInput}
                            keyboardType="number-pad"
                            value={values.month}
                            onChangeText={handleChange('month')}
                            onBlur={() => setFieldTouched('month')}
                        />
                        <TextInput
                            placeholder="Day"
                            //style={styles.dateInput}
                            placeholderTextColor="#888"
                            style={styles.dateInput}
                            keyboardType="number-pad"
                            value={values.day}
                            onChangeText={handleChange('day')}
                            onBlur={() => setFieldTouched('day')}
                        />
                    </View>

                    {/* Error Messages */}
                    <View style={{flexDirection: "row", height: 20}} >
                        {touched.year && errors.year && <Text style={styles.errorTxt}>{errors.year}</Text>}
                        {touched.month && errors.month && <Text style={styles.errorTxt}>{errors.month}</Text>}
                        {touched.day && errors.day && <Text style={styles.errorTxt}>{errors.day}</Text>}
                    </View>


                    {/* Existing buttons */}
                    <View style={styles.buttonContainer}>
                        <Pressable style={styles.button} onPress={() => navigation.navigate('WhoAreYou')}>
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


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        width: '100%',
        height: 800,
        padding: windowWidth * 0.05,
    },
    dateInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '97%',
        justifyContent: 'space-between',
        padding: 10
    },
    dateInput: {
        padding: 10,
        height: windowHeight * 0.055,
        borderRadius: windowWidth * 0.05,
        borderWidth: 2,
        borderColor: '#06283d',
        flex: 1,
        textAlign: "center",
        margin: 5,
        marginTop: 0
    },
    logo: {
        width: windowWidth * 0.25,
        height: windowWidth * 0.25,
        marginTop: -190,
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
    postBody: {
        marginTop: windowHeight * 0.0001,
        fontSize: windowWidth * 0.04,
        fontWeight: 'bold',
        color: '#47b5ff',
    },
    errorTxt: {
        fontSize: windowWidth * 0.03,
        color: '#FF0D10',
        marginHorizontal: 5,
    },
});


