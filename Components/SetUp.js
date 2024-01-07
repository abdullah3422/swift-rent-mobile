import * as React from 'react';
import {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';


export default function SetUp({navigation, route}) {
    useEffect(() => {
        const timeout = setTimeout(() => {
            const {userType, userID, ownerID, tenantID} = route.params;
            if (userType === 'owner') {
                navigation.reset({
                    index: 0,
                    routes: [{name: 'AnalyticsOwner', params: {userID, ownerID}}],
                });
            } else if (userType === 'tenant') {
                navigation.reset({
                    index: 0,
                    routes: [{name: 'MyRentals', params: {userID, tenantID}}],
                });
            }
        }, 2000);

        // Clear the timeout to prevent memory leaks
        return () => clearTimeout(timeout);
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Text style={styles.splashText}>
                You are all {'\n'}Set Up!
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -150
    },
    splashText: {
        paddingTop: 20,
        fontSize: 65,
        color: "#47b5ff",
        fontWeight: 'bold',
        textAlign: "center"
    }
});
