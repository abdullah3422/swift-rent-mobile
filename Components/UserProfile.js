import * as React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";

import AddProperty from "./AddProperty";
import BottomTabNavigator from "./BottomTabNavigator";


const Tab = createBottomTabNavigator();

export default function UserProfile({ navigation }) {

    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>

                    <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Owner's Name </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                        <Text style={{ fontSize: 16, width: '50%'}}>phone number </Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontSize: 16, width: '50%' }}>name@email.com</Text>
                    </View>

            </View>
            <View style={styles.bottomContainer}>
                <View style={styles.cardButtons}>
                    <Text style={styles.cardButtonsText}>Change Password</Text>
                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                        <Image style={styles.Pics} source={require('../img/change.png') }/>
                    </View>
                </View>
                <View style={styles.cardButtons}>
                    <Text style={styles.cardButtonsText}>Report a bug</Text>
                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                        <Image style={styles.Pics} source={require('../img/bug.png') }/>
                    </View>
                </View>
                <View style={styles.cardButtons}>
                    <Text style={styles.cardButtonsText}>FAQs</Text>
                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                        <Image style={styles.Pics} source={require('../img/faqs.png') }/>
                    </View>
                </View>
                <View style={styles.cardButtons}>
                    <Text style={styles.cardButtonsText}>Logout</Text>
                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                        <Image style={styles.Pics} source={require('../img/logout.png') }/>
                    </View>
                </View>
            </View>

            <Pressable onPress={() => navigation.navigate('AddProperty')}>
                <Text style={{paddingTop: 15}}>Next</Text>
            </Pressable>

            <BottomTabNavigator/>
        </View>
    );
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#fff",
        marginTop: -70
    },
    topContainer: {
        width: '80%',
        paddingVertical: 15,
        padding: 20,
        backgroundColor: '#fff',
        marginTop: 20,
        borderRadius: 20,
        borderColor: '#1463df',
        borderWidth: 4,

    },
    topContainerText: {
        color: '#06283d',
        textAlign: 'center',
        fontSize: 25,
    },
    arrowImage: {
        width: 20,
        height: 20,
        marginHorizontal: 5,
    },
    bottomContainer: {
        flex: 0.7,
        backgroundColor: '#47b5ff',
        marginTop: 15,
        paddingBottom:200,
        marginBottom: -180,
        width: '100%',

    },
    cardButtons: {
        width: '90%',
        paddingVertical: 20,
        padding: 20,
        backgroundColor: '#fff',
        marginTop: 20,
        marginLeft: 25,
        borderRadius: 20,
        borderColor: '#cdcdcd',
        borderWidth: 2,
        flexDirection: 'row',
        alignItems: 'center',
    },
    cardButtonsText: {
        color: '#06283d',
        textAlign: 'left',
        fontSize: 24,
        fontWeight: "bold"
    },
    Pics: {
        width: 30,
        height: 30,


    },


});
