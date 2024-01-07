import * as React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {SafeAreaProvider} from "react-native-safe-area-context";

export default function FAQs() {
    return (
        <SafeAreaProvider>
            <View style={styles.container}>
                <Text style={styles.headerText}>Frequently Asked {'\n'}{'\t'}{'\t'}{'\t'}{'\t'}{'\t'}{'\t'}Questions</Text>
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}>
                    <View style={styles.scrollContainer}>
                        <View style={styles.border}>
                            <Text style={styles.questionText}>How to add a Property?</Text>
                            <Text style={styles.button}>lorem ipsum dolores set lorem ipsum dolores set lorem ipsum dolores set</Text>
                        </View>
                        <View style={styles.border}>
                            <Text style={styles.questionText}>How to add a Tenant?</Text>
                            <Text style={styles.button}>lorem ipsum dolores set</Text>
                        </View>
                        <View style={styles.border}>
                            <Text style={styles.questionText}>How to add a Property?</Text>
                            <Text style={styles.button}>lorem ipsum dolores set</Text>
                        </View>
                        <View style={styles.border}>
                            <Text style={styles.questionText}>How to add a Property?</Text>
                            <Text style={styles.button}>lorem ipsum dolores set</Text>
                        </View>
                        <View style={styles.border}>
                            <Text style={styles.questionText}>How to add a Property?</Text>
                            <Text style={styles.button}>lorem ipsum dolores set</Text>
                        </View>
                        <View style={styles.border}>
                            <Text style={styles.questionText}>How to add a Property?</Text>
                            <Text style={styles.button}>lorem ipsum dolores set</Text>
                        </View>
                        <View style={styles.border}>
                            <Text style={styles.questionText}>How to add a Property?</Text>
                            <Text style={styles.button}>lorem ipsum dolores set</Text>
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
        // marginTop: -180,
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
        paddingVertical:'2%',
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: '#fff',
        fontSize: 20
    },
    border:{
        borderWidth: 2,
        borderRadius: 30,
        padding: 12,
        margin: 5,
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
        fontSize: 25,
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
