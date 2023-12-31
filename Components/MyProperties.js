import React, { useState, useEffect } from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import axios from 'axios'; // Ensure axios is installed or use fetch API

export default function MyProperties({ navigation, route }) {
    const { userID, ownerID } = route.params;
    const ipAddress = route.params.ipAddress;

    // State for storing properties data
    const [propertiesData, setPropertiesData] = useState([]);

    useEffect(() => {
        // Function to fetch properties
        const fetchProperties = async () => {
            try {
                console.log("userID:" + userID);
                console.log("ownerID:" + ownerID);
                const response = await axios.post(ipAddress + 'api/property-list', {
                    ownerID: ownerID,
                });
                if(response.data && response.data.success) {
                    // Transform data to match your frontend structure
                    const transformedData = response.data.propertyList.map(property => ({
                        title: property.propertyAddress,
                        details: `${property.totalProfit}  ${property.status}`
                    }));
                    setPropertiesData(transformedData);
                }
            } catch (error) {
                console.log("Error fetching properties:", error);
            }
        };

        fetchProperties();
    }, [ownerID, ipAddress]); // Dependencies array

    const renderItem = ({ item }) => (
        <Pressable style={styles.cardButtons} onPress={() => navigation.navigate('PropertyMenu', {userID, ownerID })}>
            <Text style={styles.cardButtonText}>{item.title}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                <Image source={require('../img/incomingArrow.png')} style={styles.arrowImage} />
                <Text style={{ fontSize: 20 }}>PKR {item.details}</Text>
                {/*<Image source={require('../img/outgoingArrow.png')} style={styles.arrowImage} />*/}
            </View>
        </Pressable>
    );

    return (

        <View style={styles.container}>
            <View style={styles.topContainer}>
                <Pressable onPress={() => navigation.navigate('AddProperties', {userID, ownerID })}>
                    <View style={styles.topContainerText}>
                        <Text style={{ fontSize: 35}}>+ Add a Property</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                        </View>
                    </View>
                </Pressable>

            </View>
            <View style={styles.middleContainer}>
                <Text style={styles.middleContainerText}>My Properties</Text>
                <FlatList
                    data={propertiesData}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />

            </View>
            <View style={styles.bottomContainer}>

                <View style={styles.bottomNavRow}>

                    <Pressable style={styles.bottomNavButton}>
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
        backgroundColor: '#47b5ff',
        marginTop: 15,
        width: '100%',

    },
    middleContainerText: {
        color: "#fff",
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: 10,
        marginLeft: 10,

    },
    bottomContainer: {
        flex: 0.025,
        marginBottom: -30

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
    tabNavigationContainer: {


    }


});
