// TabScreenRidersComponent.js
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import RiderHomeScreen from "./RiderHomeScreen";
import RideHistoryScreenRider from "../screens/RideHistoryScreenRider"; // Import the new rider's ride history screen
import UserProfileScreen from "../screens/UserProfileScreen";

const Tab = createBottomTabNavigator();

export default function TabScreenRidersComponent() {
  return (
    <Tab.Navigator initialRouteName="RiderHome">
      <Tab.Screen
        name="RiderHome"
        component={RiderHomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="RideHistory"
        component={RideHistoryScreenRider} // Updated to Rider's History
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="motorcycle" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={UserProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="user" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
