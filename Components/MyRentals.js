import React, { useState, useEffect } from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import axios from 'axios';
import {useFocusEffect} from "@react-navigation/native"; // Ensure axios is installed or use fetch API

export default function MyRentals({ navigation, route }) {
    const { userID, tenantID } = route.params;
    const ipAddress = route.params.ipAddress;
    const [activePage, setActivePage] = useState('MyRentals'); // Set the default active page

    // State for storing properties data
    const [rentalsData, setRentalsData] = useState([]);

    useFocusEffect(
        React.useCallback(() => {
            const fetchProperties = async () => {
                try {
                    const response = await axios.post(ipAddress + 'api/rental-list', {
                        tenantID: tenantID,
                    });
                    if (response.data && response.data.success) {
                        const transformedData = response.data.rentalList.map(rental => ({
                            rentStatus: rental.rentstatus,
                            ownerID: rental.ownerid,
                            propertyID: rental.propertyid,
                            dueDate: rental.duedate,
                            rent: rental.rent,
                            title: rental.propertyaddress,
                        }));
                        setRentalsData(transformedData);
                    }
                } catch (error) {
                    console.log("Error fetching rentals:", error);
                }
            };

            fetchProperties();
        }, [tenantID, ipAddress])
    );

    const renderItem = ({ item }) => (
        <Pressable style={styles.cardButtons} onPress={() => navigation.navigate('RentalMenu', {
            ownerID: item.ownerID,
            tenantID,
            userID,
            propertyID: item.propertyID,
            propertyAddress: item.title,
            status: item.rentStatus,
        })}>
            <Text style={styles.cardButtonText}>{item.title}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                <Text style={{ fontSize: 20 }}>Rent: {item.rent}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 0 }}>
                <Text style={{ fontSize: 20 }}>Due Date: {item.dueDate}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 0 }}>
                <Text style={{ fontSize: 20 }}>Rent Status: {item.rentStatus}</Text>
            </View>
        </Pressable>
    );

    return (

        <View style={styles.container}>
            <View style={styles.middleContainer}>
                <Text style={styles.middleContainerText}>My Rentals</Text>
                <FlatList
                    data={rentalsData}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />

            </View>
            <View style={styles.bottomContainer}>

                <View style={styles.bottomNavRow}>

                    <Pressable style={[styles.bottomNavButton]}>
                        <Image
                            style={{ width: 40, height: 40 }}
                            source={require('../img/propertiesIcon.png')}
                        />
                        <Text style={styles.bottomContainerText}>Rentals</Text>
                    </Pressable>

                    <Pressable style={styles.bottomNavButton} onPress={() => navigation.navigate('TenantNotification', {userID, tenantID })}>
                        <Image
                            style={{ width: 40, height: 40 }}
                            source={require('../img/notification.png')}
                        />
                        <Text style={styles.bottomContainerText}>Alerts</Text>
                    </Pressable>
                    <Pressable style={styles.bottomNavButton} onPress={() => navigation.navigate('TenantProfile', {userID, tenantID })}>
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
        marginTop: 20,
        borderRadius: 20,
        borderColor: '#1463df',
        borderWidth: 4,

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
        marginTop: 15,
        width: '100%',

    },
    middleContainerText: {
        color: "black",
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: 10,
        marginLeft: 10,

    },
    bottomContainer: {
        flex: 0.025,
        marginBottom: -80

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
        alignItems: 'left',
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
    activeBottomNavButton: {
        backgroundColor: '#47b5ff', // Change this to your desired highlight color
        padding: 10, // Adjust the padding as needed
        borderRadius: 20, // Adjust the border radius as needed
    },

});
