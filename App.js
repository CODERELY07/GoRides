import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignUpScreenComponent from "./screens/SignUpScreenComponent";
import HomeScreenComponent from "./screens/HomeScreenComponent";
import LoginScreenComponent from "./screens/LoginScreenComponent";
import PickerScreen from "./screens/PickerScreen";
import TabScreenRidersComponent from "./screens/TabScreenRidersComponent";
import RideHistoryScreen from "./screens/RideHistoryScreen";
import TrackLocationScreen from "./screens/TrackLocationScreen";
import TabScreenComponent from "./screens/TabScreenComponent";  // Import the Tab navigator

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Signup">
        {/* Sign Up Screen */}
        <Stack.Screen
          name="Signup"
          component={SignUpScreenComponent}
          options={{ headerShown: false }}
        />
  <Stack.Screen
          name="Home"
          component={HomeScreenComponent}
          options={{ headerShown: false }}
        />
        {/* Login Screen */}
        <Stack.Screen
          name="Login"
          component={LoginScreenComponent}
          options={{ headerShown: false }}
        />

        {/* Map Screen */}
        <Stack.Screen
          name="Map"
          component={TrackLocationScreen}
          options={{ headerShown: false }}
        />

        {/* Tab Screen (Navigator) */}
        <Stack.Screen
          name="Tab"
          component={TabScreenComponent}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RiderTab"
          component={TabScreenRidersComponent}
          options={{ headerShown: false }}
        />

        {/* Ride History Screen */}
        <Stack.Screen
          name="RideHistory"
          component={RideHistoryScreen}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="Picker"
          component={PickerScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
