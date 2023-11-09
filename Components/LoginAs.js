import * as React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';


export default function LoginAs({navigation}) {

    // let [fontsLoad] = useFonts({OpenSans_Bold});
    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <Image source={require('../img/logoColored.png')} style={styles.logo} />

            </View>

            <Text style={styles.LoginAs}>Login As</Text>
            <Pressable style={styles.button} onPress={() => navigation.navigate('WhoAreYou')}>
                <Text style={styles.buttonText}>Property Owner</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => navigation.navigate('WhoAreYou')}>
                <Text style={styles.buttonText}>Property Agent</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => navigation.navigate('WhoAreYou')}>
                <Text style={styles.buttonText}>Tenant</Text>
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
        marginTop: -140
    },
    logo: {
        width: 100,
        height: 100,
    },
    header: {
        flexDirection: 'row',
        alignItems:'center',
    },

    headerText:{
        fontSize: 50,
        paddingTop: 15,
        color: "#1363DF",
        fontWeight: 'bold'
    },
    LoginAs: {

        marginTop: 20,
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#47b5ff'

    },
    button: {
        width: '60%',
        paddingVertical: 15,
        padding: 20,
        backgroundColor: '#e5e5e5',
        marginTop: 20,
        borderRadius: 30,
        borderColor: '#cdcdcd',
        borderWidth: 2,


        // borderRadius: "5"
    },
    buttonText: {
        color: '#06283d',
        textAlign: 'center',
        fontSize: 20,

    },

});