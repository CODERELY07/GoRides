import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreenComponent from "./screens/LoginScreenComponent";
import HomeScreenComponent from "./screens/HomeScreenComponent";
import UserProfileScreen from "./screens/UserProfileScreen";
import RideHistoryScreen from "./screens/RideHistoryScreen";
import TrackLocationScreen from "./screens/TrackLocationScreen";
import TabScreenComponent from "./screens/TabScreenComponent";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreenComponent}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Map"
          component={TrackLocationScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Tab"
          options={{ headerShown: false }}
          component={TabScreenComponent}
        />
        <Stack.Screen
          name="RideHistory"
          component={RideHistoryScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
