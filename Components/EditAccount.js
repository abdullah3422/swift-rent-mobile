import React from 'react';
import {Alert, Text, TextInput, View, StyleSheet, Pressable, Dimensions} from 'react-native';
import axios from 'axios';
import {useState} from 'react';
import {md5} from 'js-md5';
import {Formik} from 'formik';
import * as Yup from 'yup';

export default function EditAccount({navigation, route}) {
    const {userID, ownerID, tenantID} = route.params;
    const ipAddress = route.params.ipAddress;
    const [data, setData] = React.useState({
        Name: '',
        email: '',
        phone: '',
        Year: '',
        Month: '',
        Day: '',
    });
    React.useEffect(() => {
    const handleInitialData = async () => {
        if (ownerID !== undefined) {
            try {
                const response = await axios.post(ipAddress + 'api/owner-details', {
                    ownerID: ownerID
                });
                console.log(response.data.DOB);
                if (response.data.success) {
                    // Update the state with the owner's data
                    setData({
                        Name: response.data.ownerName,
                        email: response.data.email,
                        phone: response.data.phone,
                        Year: response.data.DOB.slice(0, 4),
                        Month: response.data.DOB.slice(5, 7),
                        Day: response.data.DOB.slice(8, 10),
                    });
                }
            } catch (error) {
                console.log('Error during fetching owner details:', error);
            }
        } else if (tenantID !== undefined) {
            try {
                const response = await axios.post(ipAddress + 'api/tenant-details', {
                    tenantID: tenantID
                });

                if (response.data.success) {
                    // Update the state with the owner's data
                    setData({
                        Name: response.data.tenantName,
                        email: response.data.email,
                        phone: response.data.phone,
                        Year: response.data.DOB.slice(0, 4),
                        Month: response.data.DOB.slice(5, 7),
                        Day: response.data.DOB.slice(8, 10),
                    });
                }
            } catch (error) {
                console.log('Error during fetching owner details:', error);
            }
        }
    };
    handleInitialData();
    }, [ownerID, tenantID, userID]);
    async function HandleChange() {
        try {
            const verificationResponse = await axios.post(ipAddress + 'api/signup-contact', {
                userID: userID,
                email: data.email,
                phone: data.phone,
            });
            if(verificationResponse.data.success){
                const editUserResponse = await axios.put(ipAddress + 'api/admin/edit-user', {
                    userID: userID,
                    userName: data.Name,
                    email: data.email,
                    phone: data.phone,
                    DOB: String(data.Year + "-" + data.Month + "-" + data.Day)
                });
                if(editUserResponse.data.success){
                    Alert.alert('Data Successfully Updated');
                    if (ownerID !== undefined) {
                        navigation.navigate('OwnerProfile', { userID, ownerID });
                    } else if (tenantID !== undefined) {
                        navigation.navigate('TenantProfile', { userID, tenantID });
                    }
                }
            }
        } catch (error) {
            console.log('Error during updating data:', error);
            const lastThreeNumbers = String(error).match(/\d{3}$/);
            if (String(lastThreeNumbers) === "420"){
                Alert.alert("Credential(s) not unique");
            }
        }
    }

    return (

        <View style={styles.container}>
            <Text style={styles.headerText}>Edit Account {'\n'} Information </Text>

            <TextInput
                style={styles.input}
                defaultValue={data.Name}
                onChangeText={(text) => setData({ ...data, Name: text })}
            />

            <TextInput
                style={styles.input}
                defaultValue={data.email}
                onChangeText={(text) => setData({ ...data, email: text })}
            />

            <TextInput
                style={styles.input}
                defaultValue={data.phone}
                onChangeText={(text) => setData({ ...data, phone: text })}
            />
            <View style={styles.dateInputContainer}>
                <TextInput
                    defaultValue={data.Year}
                    style={styles.dateInput}
                    keyboardType="number-pad"
                    onChangeText={(text) => setData({ ...data, Year: text })}
                />

                <TextInput
                    defaultValue={data.Month}
                    style={styles.dateInput}
                    keyboardType="number-pad"
                    onChangeText={(text) => setData({ ...data, Month: text })}
                />

                <TextInput
                    defaultValue={data.Day}
                    style={styles.dateInput}
                    keyboardType="number-pad"
                    onChangeText={(text) => setData({ ...data, Day: text })}
                />
            </View>

            <View style={styles.buttonContainer}>
                <View style={styles.space}/>
                <Pressable style={[styles.button, {width: 160}]} onPress={HandleChange}>
                    <Text style={styles.buttonText}>Change</Text>
                </Pressable>
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
        backgroundColor: '#fff',
        marginTop: '-25%',
    },
    headerText: {
        color: 'black',
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: '15%',
        justifyContent: 'center',
        alignContent: 'center',
    },
    input: {
        width: '75%',
        height: 40,
        borderColor: '#06283d',
        borderWidth: 2,
        borderRadius: 15,
        padding: 10,
        marginTop: 3,
        marginBottom: 10,
        backgroundColor: '#fff',
        fontWeight: 'bold',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '35%',
        marginTop: 10,
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e5e5e5',
        borderColor: '#cdcdcd',
        borderWidth: 2,
        borderRadius: 20,
        padding: 10,
        marginTop: '15%',
    },
    space: {
        width: 10,
    },
    buttonText: {
        color: 'black',
    },
    errorText: {
        color: 'red',
    },
    dateInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '81%',
        justifyContent: 'space-between',
        padding: 10
    },
    dateInput: {
        padding: 10,
        height: windowHeight * 0.06,
        borderRadius: windowWidth * 0.05,
        borderWidth: 2,
        borderColor: '#06283d',
        flex: 1,
        textAlign: "center",
        margin: 3,
        marginTop: 0
    },
});
