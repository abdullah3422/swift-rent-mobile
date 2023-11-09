import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View} from 'react-native';

export default function Goodbye() {
    return (
        <View >
            <Text style = {styles.headerText}>bye to Little Lemon!</Text>
            <StatusBar style="auto"/>
        </View>
    );
}

const styles = StyleSheet.create({
    headerText: {

        fontStyle: "italic",
        backgroundColor: '#672056',
        paddingTop: 20,
        paddingBottom:20,
        fontSize: 20,
        textAlign: 'center',
        flex: 1

    }
})

