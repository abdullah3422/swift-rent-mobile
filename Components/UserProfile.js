import * as React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import axios from "axios";
export default function UserProfile({ navigation, route }) {
    const {ipAddress, userID, ownerID, tenantID} = route.params;
    const [ownerData, setOwnerData] = React.useState({
        ownerName: '',
        email: '',
        phone: '',
    });
    console.log("userID: "+userID);
    console.log("ownerID: "+ownerID);
    console.log("tenantID: "+tenantID);
    React.useEffect(() => {
        const handleOwnerDetails = async () => {
            try {
                const response = await axios.post(ipAddress + 'api/owner-details', {
                    ownerID: ownerID
                });

                if (response.data.success) {
                    // Update the state with the owner's data
                    setOwnerData({
                        ownerName: response.data.ownerName,
                        email: response.data.email,
                        phone: response.data.phone,
                    });
                }
            } catch (error) {
                console.error('Error during fetching owner details:', error);
            }
        };

        handleOwnerDetails();
    }, [ownerID]);

    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>

                <Text style={{ fontSize: 30, fontWeight: 'bold' }}>{ownerData.ownerName}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                    <Text style={{ fontSize: 16, width: '95%' }}>{ownerData.phone}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ fontSize: 16, width: '95%' }}>{ownerData.email}</Text>
                </View>

            </View>
            <View style={styles.middleContainer}>
                <Pressable style={styles.cardButtons} onPress={() => navigation.navigate('ChangePassword', {userID, ownerID, tenantID})}>
                    <Text style={styles.cardButtonsText}>Change Password</Text>
                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                        <Image style={styles.Pics} source={require('../img/change.png') }/>
                    </View>
                </Pressable>
                <Pressable style={styles.cardButtons} onPress={() => navigation.navigate('ReportBug', {userID, ownerID})}>
                    <Text style={styles.cardButtonsText}>Report a bug</Text>
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
                <Pressable onPress={() => navigation.navigate('WelcomeScreen')}>
                    <View style={styles.cardButtons}>
                        <Text style={styles.cardButtonsText}>Logout</Text>
                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                            <Image style={styles.Pics} source={require('../img/logout.png') }/>
                        </View>
                    </View>
                </Pressable>

            </View>
            {/*<Pressable onPress={() => navigation.navigate('AddProperty')}>*/}
            {/*    <Text style={{paddingTop: 15}}>Next</Text>*/}
            {/*</Pressable>*/}
            <View style={styles.bottomContainer}>
                <View style={styles.bottomNavRow}>
                    <Pressable style={styles.bottomNavButton} onPress={() => navigation.navigate('MyProperties', {userID, ownerID, tenantID})}>
                        <Image
                            style={{ width: 40, height: 40 }}
                            source={require('../img/propertiesIcon.png')}
                        />
                        <Text style={styles.bottomContainerText}>Properties</Text>
                    </Pressable>
                    <Pressable style={styles.bottomNavButton} onPress={() => navigation.navigate('AnalyticsOwner', {userID, ownerID, tenantID})}>
                        <Image
                            style={{ width: 40, height: 40 }}
                            source={require('../img/analyticIcon.png')}
                        />
                        <Text style={styles.bottomContainerText}>Analytics</Text>
                    </Pressable>
                    <Pressable style={styles.bottomNavButton} onPress={() => navigation.navigate('NotificationAlerts', {userID, ownerID, tenantID})}>
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
        width: '80%',
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
        marginBottom: -40
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
