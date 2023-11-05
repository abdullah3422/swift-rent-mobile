
import * as React from 'react';
import { StyleSheet, Text, View,Image,Pressable, TouchableOpacity} from 'react-native';
import BottomTabNavigator from "./BottomTabNavigator";


export default function OwnersDashboard({navigation}) {
    const cardButtons = [
        { title: 'Sept', details: '27,000   2,000' },
        { title: 'Aug', details: '23,000    1,100' },
        { title: 'Jul', details: '13,000    300' },

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
                <View style={styles.topContainerText}>
                    <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Owners Dashboard</Text>

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                            <Text style={{ fontSize: 16, width: '50%' }}>Rent Status </Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 16, }}>{'\t\t\t\t\t\t\t\t\t\t'}Paid</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontSize: 16, width: '50%' }}>Maintenance Tickets </Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 16, color: "red" }}>{'\t\t\t\t\t\t\t\t\t\t\t\t'}2</Text>
                    </View>


                </View>
            </View>

            <View style={styles.bottomContainer}>
                <Pressable onPress={() => navigation.navigate('AddProperty')}>
                    <View style={styles.buttonRow}>
                        <View style={styles.cardButtons}>
                            <Text style={styles.cardButtonsText}>Manage Properties</Text>
                        </View>
                        <View style={styles.cardButtons}>
                            <Text style={styles.cardButtonsText}>Manage Tenants</Text>
                        </View>
                    </View>
                </Pressable>


                <Pressable onPress={() => navigation.navigate('NotificationAlerts')}>
                    <View style={styles.buttonRow}>
                        <View style={styles.cardButtons}>
                            <Text style={styles.cardButtonsText}>Notification Alerts</Text>
                        </View>
                        <View style={[styles.cardButtons , styles.widthReduce]}>
                            <Text style={styles.cardButtonsText}>View Analytics</Text>
                        </View>
                    </View>
                </Pressable>


                <View style={[styles.cardButtons, styles.fullWidth]}>
                    <Text style={styles.cardButtonsText}>Edit User-Profile</Text>
                </View>
            </View>

            <Pressable onPress={() => navigation.navigate('AddProperty')}>
                <Text style={{ paddingTop: 15 }}>Next</Text>
            </Pressable>
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
        backgroundColor: '#a3a9b2',
        marginTop: 70,
        borderRadius: 20,
        // borderColor: '#1463df',
        // borderWidth: 4,
        fontSize: 25,
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
        flex: 0.8,
        backgroundColor: '#fff',
        marginTop: 15,
        width: '100%',

    },
    fullWidth: {
        width: '90%',
    },

    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },

    cardButtons: {
        width: '40%',
        paddingVertical: 25,
        padding: 20,
        backgroundColor: '#fff',
        marginTop: 20,
        marginLeft: 25,
        borderRadius: 20,
        borderColor: '#cdcdcd',
        borderWidth: 2,
        alignItems: 'center',
    },

    cardButtonsText: {
        color: '#06283d',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
    },
    cardButtonText: {
        color: '#06283d',
        textAlign: 'center',
        fontSize: 26,
        fontWeight: "bold"
    },
    widthReduce: {
        marginLeft: -30
        }



});
