import * as React from 'react';
import {Image, Pressable, StyleSheet, Text, TouchableOpacity, View} from 'react-native';


export default function DigiScreen({navigation}) {
    let flag = 0;
    // let [fontsLoad] = useFonts({OpenSans_Bold});
    return (
        <View style={styles.container}>

            <Text style={styles.digitCodeText}>Your 16 Digit {'\n'}Recovery Code</Text>
            <Text style={styles.recoveryText}>Save this code to {'\n'}recover your password</Text>
            <Text style={styles.digiCode}>16sas78W912345y6</Text>
            <Pressable style={styles.button}
                       onPress={() => navigation.navigate('WhoAreYou')}>
                <Text style={styles.buttonText}>Continue to {'\n'} Dashboard</Text>
            </Pressable>

        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#fff",
        marginTop: "auto"
    },
    logo: {
        width: 100,
        height: 100,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',

    },

    headerText: {
        fontSize: 50,
        paddingTop: 15,
        color: "#1363DF",
        fontWeight: 'bold'
    },
    digitCodeText: {

        marginTop: 0,
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
        color: "#47b5ff",
        textAlign: "center"

    },
    button: {
        width: '40%',
        paddingVertical: 2,

        backgroundColor: '#e5e5e5',
        marginTop: 150,
        borderRadius: 100,
        borderColor: '#cdcdcd',
        borderWidth: 1.5,
        marginBottom: 10

    },
    buttonText: {
        color: '#06283d',
        textAlign: 'center',
        fontSize: 18,

    },
    recoveryText: {
        paddingTop: 5,
        margin: 20,
        flexDirection: "row",
        fontSize: 16, textAlign: 'center'
    },
    footerContainer: {
        position: 'absolute',
        bottom: 20,
        width: '50%',
        backgroundColor: '#e5e5e5',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 2,
        borderRadius: 30,
        paddingRight: -5


    },
    earthImage: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
        marginRight: 10,
        paddingRight: 10,
        paddingLeft: -10
    },
    selectLanguageText: {
        flex: 1,
        textAlign: 'center',
        fontSize: 12,

    },
    dropdownArrow: {
        width: 12,
        height: 12,
        marginTop: 4,
        marginLeft: 7
    },
    centeredContent: {
        flexDirection: 'row',
        // justifyContent: 'center',
        alignItems: 'center',
        marginRight: 24,
        marginLeft: 24,

    },
    digiCode: {
        width: '75%',
        height: 50,
        borderColor: '#06283d',
        borderWidth: 2,
        borderRadius: 20,
        padding: 5,
        marginTop: 80,
        marginBottom: 10,
        backgroundColor: '#fff',
        fontWeight: 'bold',
        flexDirection: "row",
        fontSize: 26, textAlign: 'center'
    },
});