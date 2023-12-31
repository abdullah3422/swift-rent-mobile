import * as React from 'react';
import {Dimensions, Image, Pressable, StyleSheet, Text, View} from 'react-native';

export default function OwnerNotification({navigation, route}) {

    const {userID, ownerID} = route.params;
    console.log("userID: " + userID);
    console.log("ownerID: " + ownerID);

    const renderItem = ({item}) => (
        <Pressable style={styles.cardButtons} onPress={() => navigation.navigate('WhoAreYou')}>
            <Text style={styles.cardButtonText}>{item.title}</Text>
            <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
                <Image source={require('../img/incomingArrow.png')} style={styles.arrowImage}/>
                <Text style={{fontSize: 20}}> {item.details}</Text>
                <Image source={require('../img/outgoingArrow.png')} style={styles.arrowImage}/>
            </View>
        </Pressable>
    );

    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <Text style={{fontSize: 30, fontWeight: 'bold'}}>Notifications {'\t\t\t'} 23</Text>
                <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 15}}>
                    <Text style={{fontSize: 20, width: '50%'}}>Rents </Text>
                    <Text style={{fontWeight: 'bold', fontSize: 20,}}>25</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{fontSize: 20, width: '50%'}}>Tenants</Text>
                    <Text style={{fontWeight: 'bold', fontSize: 20}}>15</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{fontSize: 20, width: '50%'}}>Managers</Text>
                    <Text style={{fontWeight: 'bold', fontSize: 20}}>10</Text>
                </View>
            </View>
            <View style={styles.middleContainer}>
                <View style={styles.cardButtons}>
                    <Text style={styles.cardButtonsText}>Saqib Ali is Requesting Maintenance</Text>
                    <View style={{flex: 1, alignItems: 'flex-end'}}>
                        <Image style={styles.arrow} source={require('../img/upRightArrow.png')}/>
                    </View>
                </View>
                <View style={styles.cardButtons}>
                    <Text style={styles.cardButtonsText}> Saad Ijaz has paid their rent</Text>
                    <View style={{flex: 1, alignItems: 'flex-end'}}>
                        <Image style={styles.arrow} source={require('../img/upRightArrow.png')}/>
                    </View>
                </View>
                <View style={styles.cardButtons}>
                    <Text style={styles.cardButtonsText}>Hussain collected Saad’s rent </Text>
                    <View style={{flex: 1, alignItems: 'flex-end'}}>
                        <Image style={styles.arrow} source={require('../img/upRightArrow.png')}/>
                    </View>
                </View>
                <View style={styles.cardButtons}>
                    <Text style={styles.cardButtonsText}>Baqir's rent is overdue</Text>
                    <View style={{flex: 1, alignItems: 'flex-end'}}>
                        <Image style={styles.arrow} source={require('../img/upRightArrow.png')}/>
                    </View>
                </View>
            </View>
            <View style={styles.bottomContainer}>
                <View style={styles.bottomNavRow}>
                    <Pressable style={styles.bottomNavButton}
                               onPress={() => navigation.navigate('MyProperties', {userID, ownerID})}>
                        <Image
                            style={{width: 40, height: 40}}
                            source={require('../img/propertiesIcon.png')}
                        />
                        <Text style={styles.bottomContainerText}>Properties</Text>
                    </Pressable>
                    <Pressable style={styles.bottomNavButton}
                               onPress={() => navigation.navigate('AnalyticsOwner', {userID, ownerID})}>
                        <Image
                            style={{width: 40, height: 40}}
                            source={require('../img/analyticIcon.png')}
                        />
                        <Text style={styles.bottomContainerText}>Analytics</Text>
                    </Pressable>
                    <Pressable style={styles.bottomNavButton}>
                        <Image
                            style={{width: 40, height: 40}}
                            source={require('../img/notificationFocused.png')}
                        />
                        <Text style={styles.bottomContainerText}>Alerts</Text>
                    </Pressable>
                    <Pressable style={styles.bottomNavButton}
                               onPress={() => navigation.navigate('OwnerProfile', {userID, ownerID})}>
                        <Image
                            style={{width: 40, height: 40}}
                            source={require('../img/profile.png')}
                        />
                        <Text style={styles.bottomContainerText}>Profile</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#fff",
        marginTop: -windowHeight * 0.077    // = 70
    },
    topContainer: {
        width: '80%',
        paddingVertical: 15,
        padding: windowHeight * 0.024,       // 20
        backgroundColor: '#fff',
        marginTop: windowHeight * 0.024,
        borderRadius: 20,
        borderColor: '#1463df',
        borderWidth: 4,

    },
    arrowImage: {
        width: windowWidth * 0.020,
        height: windowHeight * 0.020,
        marginHorizontal: 5,
    },
    middleContainer: {
        flex: 0.7,
        backgroundColor: '#47b5ff',
        marginTop: windowHeight * 0.024,
        width: '100%',

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
    bottomContainerText: {
        fontSize: 14,
        fontWeight: "bold"
    },
    arrow: {
        width: 20,
        height: 20,
    },
});
