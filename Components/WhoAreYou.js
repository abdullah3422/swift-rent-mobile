
import * as React from 'react';
import { StyleSheet, Text, View,Image,Pressable, TouchableOpacity} from 'react-native';


export default function LoginAs({navigation}) {

    // let [fontsLoad] = useFonts({OpenSans_Bold});
    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <Image source={require('../img/logoColored.png')} style={styles.logo} />
                <Text style={styles.headerText}>Swift Rent</Text>
            </View>

            <Text style={styles.LoginAs}>Who are you?</Text>
            <Pressable style={styles.button} onPress={() => console.log('Property Owner')}>
                <Text style={styles.buttonText}>Property Owner</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => console.log('Property Manager')}>
                <Text style={styles.buttonText}>Property Manager</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => console.log('Tenant')}>
                <Text style={styles.buttonText}>Tenant</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('GetToKnow')}>
                <Text>Next</Text>
            </Pressable>

        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#dff6ff",
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
        marginBottom: 20

    },
    button: {
        width: '70%',
        paddingVertical: 25,
        padding: 20,
        backgroundColor: '#47B5FF',
        marginTop: 20,
        borderRadius: 20,
        borderColor: '#1363DF',
        borderWidth: 1.5,


        // borderRadius: "5"
    },
    buttonText: {
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 28,

    },

});