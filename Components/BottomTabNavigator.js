
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, StyleSheet, View} from 'react-native';
import Properties from './Properties';
import WhoAreYou from './WhoAreYou';


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
                        }else if (route.name === 'NotificationAlerts') {
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
                    component={WhoAreYou}
                    listeners={({ navigation }) => ({
                        tabPress: (e) => {
                            e.preventDefault();
                            navigation.navigate('WhoAreYou');
                        },
                    })}
                />
                <Tab.Screen
                    name="Profile"
                    component={WhoAreYou}
                    listeners={({ navigation }) => ({
                        tabPress: (e) => {
                            e.preventDefault();
                            navigation.navigate('WhoAreYou');
                        },
                    })}
                />
            </Tab.Navigator>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        paddingVertical: 17,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
});