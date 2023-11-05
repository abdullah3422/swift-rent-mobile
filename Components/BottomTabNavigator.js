// BottomTabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet, View } from 'react-native';
import Properties from './Properties';
import WelcomeScreen from './WelcomeScreen';

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
                        } else if (route.name === 'WelcomeScreen') {
                            iconPath = focused ? require('../img/analyticIconFocused.png') : require('../img/analyticIcon.png');
                        }else if (route.name === 'WelcomeScreen') {
                            iconPath = focused ? require('../img/analyticIconFocused.png') : require('../img/analyticIcon.png');
                        }else if (route.name === 'WelcomeScreen') {
                            iconPath = focused ? require('../img/analyticIconFocused.png') : require('../img/analyticIcon.png');
                        }
                        // ... (Repeat for other tabs)

                        return <Image source={iconPath} style={{ width: 40, height: 40, margin: 5}} />;
                    },
                })}
            >
                <Tab.Screen name="Properties" component={Properties} />
                <Tab.Screen name="WelcomeScreen" component={WelcomeScreen} />
                {/* Add other screens */}
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
