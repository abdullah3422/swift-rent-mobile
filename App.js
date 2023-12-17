import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import WelcomeScreen from "./Components/WelcomeScreen";
import SplashScreen from "./Components/SplashScreen";
import LoginScreen from "./Components/LoginScreen";
import LoginAs from "./Components/LoginAs";
import WhoAreYou from "./Components/WhoAreYou";
import GetToKnow from "./Components/GetToKnow";
import ContactInfo from "./Components/ContactInfo";
import SetPassword from "./Components/SetPassword";
import SetUp from "./Components/SetUp";
import AnalyticsOwner from "./Components/AnalyticsOwner";
import Properties from "./Components/Properties";
import AddProperty from "./Components/AddProperty";
import PropertyInformation from "./Components/PropertyInformation";
import ChangePassword from "./Components/ChangePassword";
import NotificationAlerts from "./Components/NotificationAlerts";

import UserProfile from "./Components/UserProfile";
import ReportBug from "./Components/ReportBug";
import FAQs from "./Components/FAQs";

//instantiating Drawer and Stack component
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

// passing this ipAddress as a prop to other screens where needed, so it needs to be change only here
const ipAddress = "http://192.168.0.39:3000/";

// Adding screens to DrawerNavigator in order to add a Drawer to the added screen
const DrawerComponent = ({ route }) => {
  return (
    <Drawer.Navigator
      initialRouteName="NotificationAlerts"
      screenOptions={{
        drawerStyle: {
          backgroundColor: "#fff",
          width: 240,
        },
        drawerPosition: "left",
        headerShown: false,
      }}
    >
      <Drawer.Screen name="AddProperty" component={AddProperty} />
      <Drawer.Screen name="AnalyticsOwner" component={AnalyticsOwner} />
      <Drawer.Screen name="Properties" component={Properties} />
      <Drawer.Screen name="PropertyInformation" component={PropertyInformation} />
      <Drawer.Screen name="NotificationAlerts" component={NotificationAlerts} initialParams={route.params} />
    </Drawer.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} initialParams={{ ipAddress: ipAddress }} />
        <Stack.Screen name="LoginAs" component={LoginAs} />
        <Stack.Screen name="WhoAreYou" component={WhoAreYou} initialParams={{ ipAddress: ipAddress }} />
        <Stack.Screen name="GetToKnow" component={GetToKnow} />
        <Stack.Screen name="ContactInfo" component={ContactInfo} initialParams={{ ipAddress: ipAddress }} />
        <Stack.Screen name="SetPassword" component={SetPassword} initialParams={{ ipAddress: ipAddress }} />
        <Stack.Screen name="SetUp" component={SetUp} />
        <Stack.Screen name="DrawerScreens" component={DrawerComponent} />
        <Stack.Screen name="UserProfile" component={UserProfile} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} />
        <Stack.Screen name="ReportBug" component={ReportBug} />
        <Stack.Screen name="FAQs" component={FAQs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
