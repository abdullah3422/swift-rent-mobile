import * as React from 'react';
import { Dimensions, Image, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export default function SetPassword({ navigation }) {
    const [passwordsMatch, setPasswordsMatch] = React.useState(true); // Initialize to true initially

    // Validation schema used from formik's official website:

    const passwordValidationSchema = Yup.object().shape({
        password: Yup.string()
            .min(8, 'Password too Short!')
            .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, 'Must contain 8 characters, at least one uppercase and one lowercase, and a number!')
            .required('Cant leave empty'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), 'Your Passwords dont match!'], 'Passwords must match!')
            .required('Confirm password is needed'),
        email: Yup.string().email('Invalid email').required('Required'),
    });

    return (
        <Formik
            initialValues={{
                password: '',
                confirmPassword: '',
            }}
            validationSchema={passwordValidationSchema}
            onSubmit={(values) => {
                // form submission logic here
                // You can check passwords match here if needed
                if (values.password === values.confirmPassword) {
                    setPasswordsMatch(true);
                    // Perform your registration logic here
                    navigation.navigate('SetUp'); // Navigate to the next screen upon successful submission
                } else {
                    setPasswordsMatch(false);
                }
            }}
        >
            {({ values, errors, touched, handleChange, setFieldTouched, isValid, handleSubmit }) => (
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Image source={require('../img/logoColored.png')} style={styles.logo} />
                    </View>
                    <Text style={styles.passwordText}>Please set a {'\n'}Strong Password</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Password"
                        placeholderTextColor="#888"
                        secureTextEntry={true}
                        value={values.password}
                        onChangeText={handleChange('password')}
                        onBlur={() => setFieldTouched('password')}
                    />
                    {touched.password && errors.password && (
                        <Text style={styles.errorTxt}>{errors.password}</Text>
                    )}
                    <TextInput
                        style={styles.input}
                        placeholder="Confirm Password"
                        placeholderTextColor="#888"
                        secureTextEntry={true}
                        value={values.confirmPassword}
                        onChangeText={handleChange('confirmPassword')}
                        onBlur={() => setFieldTouched('confirmPassword')}
                    />
                    {touched.confirmPassword && errors.confirmPassword && (
                        <Text style={styles.errorTxt}>{errors.confirmPassword}</Text>
                    )}
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={[styles.button, { width: 160 }]} onPress={() => navigation.goBack()}>
                            <Text style={styles.buttonText}>Back</Text>
                        </TouchableOpacity>
                        <View style={styles.space} />
                        <TouchableOpacity
                            onPress={ () =>{navigation.navigate('SetUp')}}
                            disabled={!passwordsMatch || (touched.password && errors.password) || (touched.confirmPassword && errors.confirmPassword)} // Disable the button only if passwords don't match
                            style={[
                                styles.button,
                                //{ backgroundColor: (!passwordsMatch || (touched.password && errors.password) || (touched.confirmPassword && errors.confirmPassword)) ? 'red' : '#e5e5e5' }
                            ]}
                        >
                            <Text style={styles.buttonText}>Register</Text>
                        </TouchableOpacity>
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
        marginTop: -windowHeight * 0.025, // Responsive marginTop
    },
    logo: {
        width: windowWidth * 0.25, // Responsive logo size
        height: windowWidth * 0.25, // Responsive logo size
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: -windowHeight * 0.2, // Responsive marginTop
        marginBottom: windowHeight * 0.01, // Responsive marginBottom
    },
    headerText: {
        fontSize: windowWidth * 0.06, // Responsive font size
        color: 'black',
        fontWeight: 'bold',
    },
    passwordText: {
        color: '#47B5FF',
        fontSize: windowWidth * 0.08, // Responsive font size
        fontWeight: 'bold',
        marginBottom: windowHeight * 0.02, // Responsive marginBottom
    },
    input: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '80%', // Take up the full width
        height: windowHeight * 0.06, // Responsive height
        borderColor: '#06283d',
        borderWidth: 2,
        borderRadius: windowWidth * 0.05, // Responsive border radius
        padding: windowWidth * 0.03, // Responsive padding
        marginTop: windowHeight * 0.005, // Responsive spacing
        marginBottom: windowHeight * 0.01, // Responsive spacing
        backgroundColor: '#fff',
        fontWeight: 'bold',
        justifyContent: 'space-between',
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
        width: windowWidth * 0.02, // Responsive width
    },
    buttonText: {
        color: 'black',
    },
    errorTxt: {
        fontSize: windowWidth * 0.03, // Responsive font size
        color: '#FF0D10',
    },
});
