import * as React from 'react';
import {Image, Pressable, StyleSheet, Text, View, Alert, useState } from 'react-native';
import axios from "axios";
import { useFocusEffect } from '@react-navigation/native';



export default function OwnerProfile({ navigation, route }) {
    const handleLogout = () => {
        Alert.alert(
            'Confirm Logout',
            'Are you sure you want to logout?',
            [
                {
                    text: 'Cancel',
                    onPress: () => null,
                    style: 'cancel',
                },
                {
                    text: 'Logout',
                    onPress: () => {
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'WelcomeScreen' }],
                        });
                    },
                },
            ],
            { cancelable: false }
        );
    };
    const {ipAddress, userID, ownerID } = route.params;
    const [ownerData, setOwnerData] = React.useState({
        ownerName: '',
        email: '',
        phone: '',
        DOB: '',
    });
    console.log("userID: "+userID);
    console.log("ownerID: "+ownerID);
    const handleOwnerDetails = async () => {
        try {
            const response = await axios.post(ipAddress + 'api/owner-details', {
                ownerID: ownerID
            });

            if (response.data.success) {
                setOwnerData({
                    ownerName: response.data.ownerName,
                    email: response.data.email,
                    phone: response.data.phone,
                    DOB: response.data.DOB.slice(0, 10),
                });
            }
        } catch (error) {
            console.error('Error during fetching owner details:', error);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            handleOwnerDetails();
        }, [])
    );

    return (
        <View style={styles.container}>
                <Pressable style={styles.topContainer} onPress={() => navigation.navigate('EditAccount', {userID, ownerID })}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ fontSize: 30, fontWeight: 'bold' }}>{ownerData.ownerName}</Text>
                        <Image style={styles.profileImage} source={require('../img/edit.png')} />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                        <Text style={{ fontSize: 16, width: '95%' }}>{ownerData.phone}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontSize: 16, width: '95%' }}>{ownerData.email}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontSize: 16, width: '95%' }}>{ownerData.DOB}</Text>
                    </View>
                </Pressable>
            <View style={styles.middleContainer}>
                <Pressable style={styles.cardButtons} onPress={() => navigation.navigate('ChangePassword', {userID, ownerID })}>
                    <Text style={styles.cardButtonsText}>Change Password</Text>
                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                        <Image style={styles.Pics} source={require('../img/change.png') }/>
                    </View>
                </Pressable>
                <Pressable style={styles.cardButtons} onPress={() => navigation.navigate('ReportBug', {userID, ownerID})}>
                    <Text style={styles.cardButtonsText}>Register a Complaint</Text>
                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                        <Image style={styles.Pics} source={require('../img/bug.png') }/>
                    </View>
                </Pressable>
                <Pressable style={styles.cardButtons} onPress={() => navigation.navigate('FAQs')}>
                    <Text style={styles.cardButtonsText}>FAQs</Text>
                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                        <Image style={styles.Pics} source={require('../img/faqs.png') }/>
                    </View>
                </Pressable>
                <Pressable onPress={handleLogout}>
                    <View style={styles.cardButtons}>
                        <Text style={styles.cardButtonsText}>Logout</Text>
                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                            <Image style={styles.Pics} source={require('../img/logout.png') }/>
                        </View>
                    </View>
                </Pressable>

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
                    <Pressable style={styles.bottomNavButton} onPress={() => navigation.navigate('AnalyticsOwner', {userID, ownerID })}>
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
                    <Pressable style={styles.bottomNavButton}>
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
        marginTop: -70,

    },
    topContainer: {
        width: '90%',
        paddingVertical: 15,
        padding: 20,
        backgroundColor: '#fff',
        marginTop: 70,
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
    middleContainer: {
        flex: 0.6,
        backgroundColor: '#47b5ff',
        marginTop: '5%',
        paddingBottom:290,
        marginBottom: '1%',
        width: '100%',
        paddingTop:'4%'

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

    bottomContainer: {
        marginBottom: -35
    },
    profileImage: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
    },
    bottomNavRow: {
        flexDirection: 'row',
        justifyContent: 'space-between', // Add spacing between Pressables
        alignItems: 'center',
        paddingHorizontal: 20, // Adjust the horizontal padding for spacing

    },
    bottomNavButton: {
        marginHorizontal: 20, // Adjust the margin for spacing
        marginTop: 2
    },
    bottomContainerText:{
        fontSize: 14,
        fontWeight: "bold"
    },
});
