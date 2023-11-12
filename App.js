import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import WelcomeScreen from './Components/WelcomeScreen';
import SplashScreen from './Components/SplashScreen';
import LoginScreen from './Components/LoginScreen';
import LoginAs from './Components/LoginAs';
import WhoAreYou from './Components/WhoAreYou';
import GetToKnow from './Components/GetToKnow';
import ContactInfo from './Components/ContactInfo';
import SetPassword from './Components/SetPassword';
import SetUp from './Components/SetUp';
import AnalyticsOwner from './Components/AnalyticsOwner';
import Properties from './Components/Properties';
import AddProperty from './Components/AddProperty';
import PropertyInformation from './Components/PropertyInformation';
import TenantData from './Components/TenanData';
import NotificationAlerts from './Components/NotificationAlerts';
import OwnersDashboard from './Components/OwnersDashboard';
import UserProfile from "./Components/UserProfile";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator()



const DrawerNavigator = () => {
    return (
        <Drawer.Navigator initialRouteName="OwnersDashboard"
                          screenOptions={{
                              drawerStyle: {
                                  backgroundColor: '#fff',
                                  width: 240,
                              },
                              drawerPosition: "left",

                          }}>
            <Drawer.Screen name="OwnersDashboard" component={OwnersDashboard} />
            <Drawer.Screen name="AddProperty" component={AddProperty} options={{ headerShown: false }} />
            <Drawer.Screen name="AnalyticsOwner" component={AnalyticsOwner} options={{ headerShown: false }} />
            <Drawer.Screen name="Properties" component={Properties} options={{ headerShown: false }} />
            <Drawer.Screen name="PropertyInformation" component={PropertyInformation} options={{ headerShown: false }} />
            <Drawer.Screen name="TenantData" component={TenantData} options={{ headerShown: false }} />
            <Drawer.Screen name="NotificationAlerts" component={NotificationAlerts} options={{ headerShown: false }} />



        </Drawer.Navigator>
    );
};

const App = () => {
    return (

        <NavigationContainer>
            {/*<DrawerNavigator/>*/}

            <Stack.Navigator initialRouteName="SplashScreen">
                <Stack.Screen name="SplashScreen" component={SplashScreen} options={{headerShown: false}}/>
                <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{ headerShown: false }} />
                <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
                <Stack.Screen name="LoginAs" component={LoginAs} options={{ headerShown: false }} />
                <Stack.Screen name="WhoAreYou" component={WhoAreYou} options={{ headerShown: false }} />
                <Stack.Screen name="GetToKnow" component={GetToKnow} options={{ headerShown: false }} />
                <Stack.Screen name="ContactInfo" component={ContactInfo} options={{ headerShown: false }} />
                <Stack.Screen name="SetPassword" component={SetPassword} options={{ headerShown: false }} />
                <Stack.Screen name="SetUp" component={SetUp} options={{ headerShown: false }} />
                <Stack.Screen name="OwnersDashboard" component={DrawerNavigator} options={{ headerShown: false }}/>
                <Stack.Screen name="UserProfile" component={UserProfile} options={{ headerShown: false }}/>



            </Stack.Navigator>
        </NavigationContainer>
    );
};


export default App;
