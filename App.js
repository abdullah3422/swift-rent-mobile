import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WelcomeScreen from './Components/WelcomeScreen';
import SplashScreen from "./Components/SplashScreen";
import LoginScreen from "./Components/LoginScreen";
import LoginAs from "./Components/LoginAs";
import WhoAreYou from "./Components/WhoAreYou"
import GetToKnow from "./Components/GetToKnow"
import ContactInfo from "./Components/ContactInfo"
import SetPassword from "./Components/SetPassword"
import SetUp from "./Components/SetUp"
import AnalyticsOwner from "./Components/AnalyticsOwner"
import Properties from "./Components/Properties";
import AddProperty from "./Components/AddProperty";
import PropertyInformation from "./Components/PropertyInformation";
import TenantData from "./Components/TenanData"
import NotificationAlerts from "./Components/NotificationAlerts";
import OwnersDashboard from "./Components/OwnersDashboard";


import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
    return (
    <NavigationContainer>

      <Stack.Navigator initialRouteName="AddProperty">


        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="LoginAs" component={LoginAs} options={{ headerShown: false }}/>
          <Stack.Screen name="WhoAreYou" component={WhoAreYou} options={{ headerShown: false }}/>
          <Stack.Screen name="GetToKnow" component={GetToKnow} options={{ headerShown: false }}/>
          <Stack.Screen name="ContactInfo" component={ContactInfo} options={{ headerShown: false }}/>
          <Stack.Screen name="SetPassword" component={SetPassword} options={{ headerShown: false }}/>
          <Stack.Screen name="SetUp" component={SetUp} options={{ headerShown: false }}/>
          <Stack.Screen name="AnalyticsOwner" component={AnalyticsOwner} options={{ headerShown: false }}/>
          <Stack.Screen name="Properties" component={Properties} options={{ headerShown: false }}/>
          <Stack.Screen name="AddProperty" component={AddProperty} options={{ headerShown: false }}/>
          <Stack.Screen name="PropertyInformation" component={PropertyInformation} options={{ headerShown: false }}/>
        <Stack.Screen name="TenantData" component={TenantData} options={{ headerShown: false }}/>
        <Stack.Screen name="NotificationAlerts" component={NotificationAlerts} options={{ headerShown: false }}/>
        <Stack.Screen name="OwnersDashboard" component={OwnersDashboard} options={{ headerShown: false }}/>

</Stack.Navigator>




    </NavigationContainer>

       
    );
}
