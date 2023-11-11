import * as React from 'react';
import {FlatList, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import BottomTabNavigator from "./BottomTabNavigator";



const Tab = createBottomTabNavigator();

export default function AddProperty({ navigation }) {
    const cardButtons = [
        { title: '#1', details: '27,000    2,000' },
        { title: '#2', details: '23,000    1,100' },
        { title: '#3', details: '13,000    300' },

    ];

    const renderItem = ({ item }) => (
        <Pressable style={styles.cardButtons} onPress={() => navigation.navigate('WhoAreYou')}>
            <Text style={styles.cardButtonText}>{item.title}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                <Image source={require('../img/incomingArrow.png')} style={styles.arrowImage} />
                <Text style={{ fontSize: 20 }}> {item.details}</Text>
                <Image source={require('../img/outgoingArrow.png')} style={styles.arrowImage} />
            </View>
        </Pressable>
    );

    return (

        <View style={styles.container}>
            <View style={styles.topContainer}>
                <Pressable onPress={() => navigation.navigate('PropertyInformation')}>
                    <View style={styles.topContainerText}>
                        <Text style={{ fontSize: 35}}>+ Add a Property</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                        </View>
                    </View>
                </Pressable>

            </View>
            <View style={styles.bottomContainer}>
                <Text style={styles.bottomContainerText}>My Properties</Text>
                <FlatList
                    data={cardButtons}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />

            </View>

            <Pressable onPress={() => navigation.navigate('PropertyInformation')}>
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

    header: {
        flexDirection: 'row',
        alignItems: 'center',
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
        fontSize: 25,
        // borderRadius: "5"
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
        width: '100%',

    },
    bottomContainerText: {
        color: "#fff",
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: 10,
        marginLeft: 10,

    },

    cardButtons: {
        width: '90%',
        paddingVertical: 25,
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

    cardButtonText: {
        color: '#06283d',
        textAlign: 'left',
        fontSize: 28,
        fontWeight: "bold"
    },

    cardButtonContainer: {
        alignItems: "center"
    },
    tabNavigationContainer: {


    }


});
