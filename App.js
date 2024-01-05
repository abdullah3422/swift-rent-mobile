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
import DigiCode from "./Components/DigiCode";
import SetUp from "./Components/SetUp";

import AnalyticsOwner from "./Components/AnalyticsOwner";
import MyProperties from "./Components/MyProperties";
import AddProperties from "./Components/AddProperties";
import OwnerNotification from "./Components/OwnerNotification";
import OwnerProfile from "./Components/OwnerProfile";

import ChangePassword from "./Components/ChangePassword";
import ReportBug from "./Components/ReportBug";
import FAQs from "./Components/FAQs";

import TenantProfile from "./Components/TenantProfile";
import TenantNotification from "./Components/TenantNotification";
import MyRentals from "./Components/MyRentals";
import AddRentals from "./Components/AddRentals";
import ResetPassword from "./Components/ResetPassword"

import EditAccount from "./Components/EditAccount";
import EditProperty from "./Components/EditProperty";
import PropertyMenu from "./Components/PropertyMenu";
import RegisterTenant from "./Components/RegisterTenant";
import ReceiveRent from "./Components/ReceiveRent";
import RentalMenu from "./Components/RentalMenu";
//instantiating Drawer and Stack component

const Stack = createNativeStackNavigator();

// passing this ipAddress as a prop to other screens where needed, so it needs to be change only here
const ipAddress = "http://192.168.18.59:3000/";

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{ headerShown: false }}>

        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} initialParams={{ ipAddress: ipAddress }} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} initialParams={{ ipAddress: ipAddress }}/>
        <Stack.Screen name="LoginAs" component={LoginAs} initialParams={{ ipAddress: ipAddress }}/>
        <Stack.Screen name="WhoAreYou" component={WhoAreYou} initialParams={{ ipAddress: ipAddress }} />
        <Stack.Screen name="GetToKnow" component={GetToKnow} initialParams={{ ipAddress: ipAddress }}/>
        <Stack.Screen name="ContactInfo" component={ContactInfo} initialParams={{ ipAddress: ipAddress }} />
        <Stack.Screen name="SetPassword" component={SetPassword} initialParams={{ ipAddress: ipAddress }} />
        <Stack.Screen name="DigiCode" component={DigiCode} initialParams={{ ipAddress: ipAddress }}/>
        <Stack.Screen name="SetUp" component={SetUp} />
        {/*Owner Screens*/}
        <Stack.Screen name="OwnerProfile" component={OwnerProfile} initialParams={{ ipAddress: ipAddress }}/>
        <Stack.Screen name="OwnerNotification" component={OwnerNotification} />
        <Stack.Screen name="AnalyticsOwner" component={AnalyticsOwner} initialParams={{ ipAddress: ipAddress }} />
        <Stack.Screen name="MyProperties" component={MyProperties} initialParams={{ ipAddress: ipAddress }}/>
        <Stack.Screen name="AddProperties" component={AddProperties} initialParams={{ ipAddress: ipAddress }} />
        <Stack.Screen name="PropertyMenu" component={PropertyMenu} initialParams={{ ipAddress: ipAddress }}/>
        <Stack.Screen name="EditProperty" component={EditProperty} initialParams={{ ipAddress: ipAddress }}/>
        <Stack.Screen name="RegisterTenant" component={RegisterTenant} initialParams={{ ipAddress: ipAddress }}/>
        <Stack.Screen name="ReceiveRent" component={ReceiveRent} initialParams={{ ipAddress: ipAddress }}/>
        {/*Tenant Screens*/}
        <Stack.Screen name="TenantProfile" component={TenantProfile} initialParams={{ ipAddress: ipAddress }}/>
        <Stack.Screen name="TenantNotification" component={TenantNotification} initialParams={{ ipAddress: ipAddress }}/>
        <Stack.Screen name="MyRentals" component={MyRentals} initialParams={{ ipAddress: ipAddress }}/>
        <Stack.Screen name="AddRentals" component={AddRentals} initialParams={{ ipAddress: ipAddress }}/>
        <Stack.Screen name="RentalMenu" component={RentalMenu} initialParams={{ ipAddress: ipAddress }}/>
        {/*Common Functionality between Owner and Tenant*/}
        <Stack.Screen name="ChangePassword" component={ChangePassword} initialParams={{ ipAddress: ipAddress }}/>
        <Stack.Screen name="ReportBug" component={ReportBug} initialParams={{ ipAddress: ipAddress }}/>
        <Stack.Screen name="FAQs" component={FAQs} initialParams={{ ipAddress: ipAddress }}/>
        <Stack.Screen name="EditAccount" component={EditAccount} initialParams={{ ipAddress: ipAddress }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
