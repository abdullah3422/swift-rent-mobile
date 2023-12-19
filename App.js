import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
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
import MyProperties from "./Components/MyProperties";
import AddProperties from "./Components/AddProperties";
import ChangePassword from "./Components/ChangePassword";
import NotificationAlerts from "./Components/NotificationAlerts";

import UserProfile from "./Components/UserProfile";
import ReportBug from "./Components/ReportBug";
import FAQs from "./Components/FAQs";

//instantiating Drawer and Stack component

const Stack = createNativeStackNavigator();

// passing this ipAddress as a prop to other screens where needed, so it needs to be change only here
const ipAddress = "http://192.168.18.59:3000/";

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="WelcomeScreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} initialParams={{ ipAddress: ipAddress }} />
        <Stack.Screen name="LoginAs" component={LoginAs} initialParams={{ ipAddress: ipAddress }}/>
        <Stack.Screen name="WhoAreYou" component={WhoAreYou} initialParams={{ ipAddress: ipAddress }} />
        <Stack.Screen name="GetToKnow" component={GetToKnow} initialParams={{ ipAddress: ipAddress }}/>
        <Stack.Screen name="ContactInfo" component={ContactInfo} initialParams={{ ipAddress: ipAddress }} />
        <Stack.Screen name="SetPassword" component={SetPassword} initialParams={{ ipAddress: ipAddress }} />
        <Stack.Screen name="SetUp" component={SetUp} />
        <Stack.Screen name="NotificationAlerts" component={NotificationAlerts} />
          <Stack.Screen name="MyProperties" component={MyProperties} initialParams={{ ipAddress: ipAddress }}/>
          <Stack.Screen name="AnalyticsOwner" component={AnalyticsOwner} initialParams={{ ipAddress: ipAddress }} />

          <Stack.Screen name="AddProperties" component={AddProperties} initialParams={{ ipAddress: ipAddress }} />
        <Stack.Screen name="UserProfile" component={UserProfile} initialParams={{ ipAddress: ipAddress }}/>
        <Stack.Screen name="ChangePassword" component={ChangePassword} initialParams={{ ipAddress: ipAddress }}/>
        <Stack.Screen name="ReportBug" component={ReportBug} initialParams={{ ipAddress: ipAddress }}/>
        <Stack.Screen name="FAQs" component={FAQs} initialParams={{ ipAddress: ipAddress }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
