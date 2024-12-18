import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";


import SignUpScreenComponent from "./screens/SignUpScreenComponent";
import HomeScreenComponent from "./screens/HomeScreenComponent";
import LoginScreenComponent from "./screens/LoginScreenComponent";
import RideHistoryScreen from "./screens/RideHistoryScreen";
import UserProfileScreen from "./screens/UserProfileScreen";
import RideHistoryScreenRider from "./screens/RideHistoryScreenRider";
import RiderHomeScreen from "./screens/RiderHomeScreen";
import PickerScreen from "./screens/PickerScreen";

import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabScreenComponent({ setIsLoggedIn }) {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={HomeScreenComponent}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="RideHistory"
        component={RideHistoryScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="motorcycle" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="UserProfile"
        children={(props) => <UserProfileScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
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

function TabScreenRidersComponent({ setIsLoggedIn }) {
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
        component={RideHistoryScreenRider}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="motorcycle" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="UserProfile"
        children={(props) => <UserProfileScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
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

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [role, setRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
   
    const checkLoginStatus = async () => {
      const userID = await AsyncStorage.getItem("userID"); 
      if (userID) {
        setIsLoggedIn(true); 
        const userRole = await AsyncStorage.getItem("role"); 
        setRole(userRole); 
      } else {
        setIsLoggedIn(false); 
      }
      setIsLoading(false); 
    };

    checkLoginStatus();
  }, []);

  
  if (isLoading) {
    return null; 
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={
          isLoggedIn
            ? role === "rider"
              ? "RiderTab" 
              : "Tab" 
            : "Login" 
        }
      >
       
        <Stack.Screen
          name="Tab"
          children={(props) => <TabScreenComponent {...props} setIsLoggedIn={setIsLoggedIn} />}
          options={{ headerShown: false }}
        />
       
        <Stack.Screen
          name="RiderTab"
          children={(props) => <TabScreenRidersComponent {...props} setIsLoggedIn={setIsLoggedIn} />}
          options={{ headerShown: false }}
        />
      
        <Stack.Screen
          name="Login"
          component={LoginScreenComponent}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="Picker"
          component={PickerScreen}
          options={{ headerShown: false }}
        />
       
        <Stack.Screen
          name="Signup"
          component={SignUpScreenComponent}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
