import * as React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {SafeAreaProvider} from "react-native-safe-area-context";

export default function FAQs() {
    return (
        <SafeAreaProvider>
            <View style={styles.container}>
                <Text style={styles.headerText}>Frequently
                    Asked {'\n'}{'\t'}{'\t'}{'\t'}{'\t'}{'\t'}{'\t'}Questions</Text>
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}>
                    <View style={styles.scrollContainer}>
                        <View style={styles.border}>
                            <Text style={styles.questionText}>How can I register my property?</Text>
                            <Text style={styles.button}>In “Properties” section, select “Add a Property” button. Add the property details on the screen and press “Register” button. </Text>
                        </View>
                        <View style={styles.border}>
                            <Text style={styles.questionText}>How do I edit the details of my property?</Text>
                            <Text style={styles.button}>Tap properties icon at bottom-left to view added properties, tap on the desired property to edit it</Text>
                        </View>
                        <View style={styles.border}>
                        <Text style={styles.questionText}>Can I register as tenant and owner using the same email/phone number?</Text>
                        <Text style={styles.button}>Yes, tap register button, then tap create new role on existing credentials, login to register a new role</Text>
                         </View>
                        <View style={styles.border}>
                            <Text style={styles.questionText}>How can I view past rent history?</Text>
                            <Text style={styles.button}>Tap analytics icon at bottom-center to view the history</Text>
                        </View>
                        <View style={styles.border}>
                            <Text style={styles.questionText}>How do I register a complaint or request support?</Text>
                            <Text style={styles.button}>Tap the profile icon at the bottom-right corner, then tap on the complaints button to register a complaint</Text>
                        </View>
                        <View style={styles.border}>
                            <Text style={styles.questionText}>Can I see the payment status of rents?</Text>
                            <Text style={styles.button}>Tap properties icon at bottom-left to view payment status</Text>
                        </View>
                        <View style={styles.border}>
                            <Text style={styles.questionText}>Can I edit my account information?</Text>
                            <Text style={styles.button}>Yes, In “Profile” section, select the edit option on the top right of the screen. Then update the details against the required fields and select “Change” button.</Text>
                        </View>
                        <View style={styles.border}>
                            <Text style={styles.questionText}>How can I reset my password even after losing my 16-digit code?</Text>
                            <Text style={styles.button}>Yes, go to the login section and tap forgot password then further tap forgot 16 digit code. A pop-up containing the company mail will appear. Email us to get your password reset </Text>
                        </View>
                        <View style={styles.border}>
                            <Text style={styles.questionText}>How do I register a tenant on my property?</Text>
                            <Text style={styles.button}>In “Properties” Section, select the desired property against which you want to register the tenant for your property. Now, select the “Register” button and enter the email or phone number of registered tenant on the application. At the end, select “Register” button.</Text>
                        </View>
                        <View style={styles.border}>
                            <Text style={styles.questionText}>How do I pay rent for the registered property?</Text>
                            <Text style={styles.button}>In “Rentals” section, select the desired property and select “Request for Cash Collection”. Once that is done, the owner can visit you anytime to collect the rent.</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingTop: '10%', // Adjusted marginTop to paddingTop
        width: '100%',

    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        // marginTop: 20
    },

    headerText: {
        color: "black",
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: '15%',
        justifyContent: "center",
        alignContent: "center",
        marginTop: '10%'

    },
    button: {
        width: 'auto',
        height: 'auto',
        borderColor: '#cdcdcd',
        paddingVertical: '2%',
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: '#fff',
        fontSize: 18
    },
    border: {
        borderWidth: 2,
        borderRadius: 30,
        padding: 12,
        margin: 15,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 10,
    },
    detailedButton: {
        width: '90%',
        height: 100,
        borderColor: '#cdcdcd',
        borderWidth: 2,
        borderRadius: 15,
        padding: 10,
        marginTop: 3,
        marginBottom: 10,
        backgroundColor: '#fff',
        fontWeight: 'bold',
    },
    space: {
        width: 10,
    },
    buttonText: {
        color: 'black',
    },
    Pics: {
        width: 20,
        height: 20,
        marginTop: -18
    },
    questionText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'left',
        alignSelf: 'flex-start',
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%"
    },
    scrollContainer: {
        width: '100%'
    }

});