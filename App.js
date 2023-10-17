import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './Components/WelcomeScreen';
import SplashScreen from "./Components/SplashScreen";
import LoginScreen from "./Components/LoginScreen";
import LoginAs from "./Components/LoginAs";
import  WhoAreYou from "./Components/WhoAreYou"
import GetToKnow from "./Components/GetToKnow"
import ContactInfo from "./Components/ContactInfo"
import SetPassword from "./Components/SetPassword"
import SetUp from "./Components/SetUp"
const Stack = createNativeStackNavigator();

export default function App() {
    return (
    <NavigationContainer>

      <Stack.Navigator initialRouteName="SplashScreen">


        <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="LoginAs" component={LoginAs} />
          <Stack.Screen name="WhoAreYou" component={WhoAreYou} />
          <Stack.Screen name="GetToKnow" component={GetToKnow} />
          <Stack.Screen name="ContactInfo" component={ContactInfo} />
          <Stack.Screen name="SetPassword" component={SetPassword} />
          <Stack.Screen name="SetUp" component={SetUp} />


        {/* Add other screens here */}

      </Stack.Navigator>

    </NavigationContainer>
    
       
    );
}
