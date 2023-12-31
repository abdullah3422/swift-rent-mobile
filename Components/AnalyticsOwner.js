import * as React from 'react';
import {FlatList, Image, Pressable, StyleSheet, Text, View,BackHandler, Alert} from 'react-native';
import axios from "axios";
import { useFocusEffect } from '@react-navigation/native';

export default function AnalyticsOwner({ navigation, route }) {
    useFocusEffect(
        React.useCallback(() => {
            const backAction = () => {
                Alert.alert(
                    'Confirm Exit',
                    'Are you sure you want to exit the app?',
                    [
                        {
                            text: 'Cancel',
                            onPress: () => null,
                            style: 'cancel',
                        },
                        {
                            text: 'Exit',
                            onPress: () => BackHandler.exitApp(),
                        },
                    ],
                    { cancelable: false }
                );
                return true; // Return true to prevent the default behavior (closing the app)
            };

            const backHandler = BackHandler.addEventListener(
                'hardwareBackPress',
                backAction
            );

            return () => backHandler.remove(); // Clean up the event listener when the component unmounts
        }, [])
    );


    const {ipAddress, userID, ownerID } = route.params;
    const [ownerData, setOwnerData] = React.useState({
        currentMonth: '',
        currentYear: '',
        totalProfit: '',
        totalProperty: '',
        totalReceived: '',
        pendingRent: '',
    });
    console.log("userID: "+userID);
    console.log("ownerID: "+ownerID);
    React.useEffect(() => {
        const handleOwnerMonthAnalytics = async () => {
            try {
                const response = await axios.post(ipAddress + 'api/month-analytics', {
                    ownerID: ownerID
                });
                if (response.data.success) {
                    console.log(response.data);
                    // Update the state with the owner's data
                    setOwnerData({
                        currentMonth: response.data.currentMonth,
                        currentYear: response.data.currentYear,
                        totalProfit: response.data.totalProfit,
                        totalProperty: response.data.totalProperty,
                        totalReceived: response.data.totalReceived,
                        pendingRent: response.data.pendingRent,
                    });
                }
            } catch (error) {
                console.error('Error during fetching owner month analytics:', error);
            }
        };
        handleOwnerMonthAnalytics();
    }, [ownerID]);

    const cardButtons = [
        { title: 'Sept', details: '27,000   2,000' },
        { title: 'Aug', details: '23,000    1,100' },
        { title: 'Jul', details: '13,000    300' },
        { title: 'Feb', details: '20,000    300' },
    ];

    const renderItem = ({ item }) => (
        <Pressable style={styles.cardButtons}>
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
                    <Text style={{ fontSize: 30, fontWeight: 'bold' }}>{ownerData.currentMonth}, {ownerData.currentYear}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                        <Image source={require('../img/incomingArrow.png')} style={styles.arrowImage} />
                        <Text style={{ fontSize: 20 }}>{ownerData.totalProfit}</Text>
                        {/*<Image source={require('../img/outgoingArrow.png')} style={styles.arrowImage} />*/}
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                        <Text style={{ fontSize: 20, width: '60%' }}>Total Properties </Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{ownerData.totalProperty}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontSize: 20, width: '60%' }}>Rents Received </Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{ownerData.totalProfit}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontSize: 20, width: '60%' }}>Rents Pending </Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{ownerData.pendingRent}</Text>
                    </View>

                </View>
            </View>
            <View style={styles.middleContainer}>
                <Text style={styles.middleContainerText}>Monthly</Text>
                <FlatList
                    data={cardButtons}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
            <View style={styles.bottomContainer}>
                <View style={styles.bottomNavRow}>
                    <Pressable style={styles.bottomNavButton} onPress={() => navigation.navigate('MyProperties', {userID, ownerID })}>
                        <Image
                            style={{ width: 40, height: 40 }}
                            source={require('../img/propertiesIcon.png')}
                        />
                        <Text style={styles.bottomContainerText}>Properties</Text>
                    </Pressable>
                    <Pressable style={styles.bottomNavButton}>
                        <Image
                            style={{ width: 40, height: 40 }}
                            source={require('../img/analyticIcon.png')}
                        />
                        <Text style={styles.bottomContainerText}>Analytics</Text>
                    </Pressable>
                    <Pressable style={styles.bottomNavButton} onPress={() => navigation.navigate('OwnerNotification', {userID, ownerID })}>
                        <Image
                            style={{ width: 40, height: 40 }}
                            source={require('../img/notification.png')}
                        />
                        <Text style={styles.bottomContainerText}>Alerts</Text>
                    </Pressable>
                    <Pressable style={styles.bottomNavButton} onPress={() => navigation.navigate('OwnerProfile', {userID, ownerID })}>
                        <Image
                            style={{ width: 40, height: 40 }}
                            source={require('../img/profileFocused.png')}
                        />
                        <Text style={styles.bottomContainerText}>Profile</Text>
                    </Pressable>
                </View>
            </View>
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
        marginTop: 40,
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
    middleContainer: {
        flex: 0.7,
        backgroundColor: '#47b5ff',
        marginTop: 15,
        width: '100%',
        // marginBottom: -83

    },
    middleContainerText: {
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
        fontSize: 20,
        fontWeight: "bold"
    },

    cardButtonContainer: {
        alignItems: "center"
    },

    bottomContainer: {
        flex: 0.025,
        marginBottom: -15

    },
    bottomNavRow: {
        flexDirection: 'row',
        justifyContent: 'space-between', // Add spacing between Pressables
        alignItems: 'center',
        paddingHorizontal: 20, // Adjust the horizontal padding for spacing

    },
    bottomNavButton: {
        marginHorizontal: 20, // Adjust the margin for spacing
        marginTop: 10
    },
    bottomContainerText:{
        fontSize: 14,
        fontWeight: "bold"
    },


});
