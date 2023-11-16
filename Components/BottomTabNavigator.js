
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, StyleSheet, View} from 'react-native';
import Properties from './Properties';
import WhoAreYou from './WhoAreYou';
import NotificationAlerts from "./NotificationAlerts";
import UserProfile from "./UserProfile";


const Tab = createBottomTabNavigator();

export default function BottomTabNavigator(navigation) {
    return (
        <View style={styles.container}>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconPath;

                        if (route.name === 'Properties') {
                            iconPath = focused ? require('../img/propertiesIconFocused.png') : require('../img/propertiesIcon.png');
                        } else if (route.name === 'Analytics') {
                            iconPath = focused ? require('../img/analyticIconFocused.png') : require('../img/analyticIcon.png');
                        }else if (route.name === 'Alerts') {
                            iconPath = focused ? require('../img/notificationFocused.png') : require('../img/notification.png');
                        }else if (route.name === 'Profile') {
                            iconPath = focused ? require('../img/profile.png') : require('../img/profileFocused.png');
                        }
                        // ... (Repeat for other tabs)

                        return <Image source={iconPath} style={{ width: 40, height: 40, margin: 5}} />;
                    },
                })}
            >
                <Tab.Screen
                    name="Properties"
                    component={Properties}
                    listeners={({ navigation }) => ({
                        tabPress: (e) => {
                            e.preventDefault();
                            navigation.navigate('Properties');
                        },
                    })}
                />
                <Tab.Screen
                    name="Analytics"
                    component={WhoAreYou}
                    listeners={({ navigation }) => ({
                        tabPress: (e) => {
                            e.preventDefault();
                            navigation.navigate('WhoAreYou');
                        },
                    })}
                />
                <Tab.Screen
                    name="Alerts"
                    component={NotificationAlerts}
                    listeners={({ navigation }) => ({
                        tabPress: (e) => {
                            e.preventDefault();
                            navigation.navigate('NotificationAlerts');
                        },
                    })}
                />
                <Tab.Screen
                    name="Profile"
                    component={UserProfile}
                    listeners={({ navigation }) => ({
                        tabPress: (e) => {
                            e.preventDefault();
                            navigation.navigate('UserProfile');
                        },
                    })}
                />
            </Tab.Navigator>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop:20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        paddingVertical: 17,
        position: 'absolute',
        bottom: -16,
        left: 0,
        right: 0,
    },
});
