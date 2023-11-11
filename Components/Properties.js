import * as React from 'react';
import {StyleSheet, View} from 'react-native';


export default function Properties({navigation}) {

    return (
        <View style={styles.container}>


        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -150
    },
    splashText: {
        paddingTop: 20,
        fontSize: 65,
        color: "#47b5ff",
        fontWeight: 'bold',
        textAlign: "center"
    }
});
