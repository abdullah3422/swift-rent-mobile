import * as React from 'react';
import {FlatList, Image, Pressable, StyleSheet, Text, View,BackHandler, Alert} from 'react-native';
import axios from "axios";
import { useFocusEffect } from '@react-navigation/native';
import {useState} from "react";

export default function AnalyticsOwner({ navigation, route }) {
    const [monthlyAnalyticsDataList, setmonthlyAnalyticsDataList] = useState([]);

    //Prevent Going Back to log in screen
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


    useFocusEffect(
        React.useCallback(() => {
            const fetchData = async () => {
                try {
                    // Fetch owner month analytics
                    const ownerMonthAnalyticsResponse = await axios.post(ipAddress + 'api/month-analytics', {
                        ownerID: ownerID
                    });

                    if (ownerMonthAnalyticsResponse.data.success) {
                        setOwnerData({
                            currentMonth: ownerMonthAnalyticsResponse.data.currentMonth,
                            currentYear: ownerMonthAnalyticsResponse.data.currentYear,
                            totalProfit: ownerMonthAnalyticsResponse.data.totalProfit,
                            totalProperty: ownerMonthAnalyticsResponse.data.totalProperty,
                            totalReceived: ownerMonthAnalyticsResponse.data.totalReceived,
                            pendingRent: ownerMonthAnalyticsResponse.data.pendingRent,
                        });
                    }
                } catch (error) {
                    console.error('Error during fetching owner month analytics:', error);
                }

                try {
                    // Fetch monthly analytics
                    const monthlyAnalyticsResponse = await axios.post(ipAddress + 'api/monthly-analytics', {
                        ownerID: ownerID,
                    });

                    if (monthlyAnalyticsResponse.data && monthlyAnalyticsResponse.data.success) {
                        // Transform data to match your frontend structure
                        const transformedData = monthlyAnalyticsResponse.data.monthlyData.map(Analytics => ({
                            month: Analytics.month,
                            year: Analytics.year,
                            profit: Analytics.profit
                        }));
                        setmonthlyAnalyticsDataList(transformedData);
                    }
                } catch (error) {
                    console.log("Error fetching monthly analytics:", error);
                }
            };

            fetchData(); // Execute the fetch when the screen gains focus

            return () => {
                // Cleanup function when the component unmounts or loses focus
                // (if needed, such as clearing timers, subscriptions, etc.)
            };
        }, [ownerID]) // Run whenever ownerID changes
    );

    // const monthlyAnalyticsDataList = [
    //     { month: 'December', year: '2023', profit: '200000' },
    //     { month: 'November', year: '2023', profit: '400000' },
    //     { month: 'October', year: '2023', profit: '500000' },
    //     { month: 'September', year: '2023', profit: '100000' },
    // ];

    const renderItem = ({ item }) => (
        <Pressable style={styles.cardButtons}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between',}}>
                <Text style={styles.cardButtonText}>{item.month} {item.year}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', flex: 1 }}>
                    <Image source={require('../img/incomingArrow.png')} style={styles.arrowImage} />
                    <Text style={{ fontSize: 20 }}>{item.profit} PKR</Text>
                </View>
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
                        <Text style={{ fontSize: 20 }}>PKR {ownerData.totalProfit}</Text>
                        {/*<Image source={require('../img/outgoingArrow.png')} style={styles.arrowImage} />*/}
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                        <Text style={{ fontSize: 20, width: '60%' }}>Total Properties </Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{ownerData.totalProperty}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontSize: 20, width: '60%' }}>Rents Received </Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{ownerData.totalReceived}</Text>
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
                    data={monthlyAnalyticsDataList}
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
        width: '90%',
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
        marginBottom: -35
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
