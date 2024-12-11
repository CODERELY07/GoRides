import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Screens
import SignUpScreenComponent from "./screens/SignUpScreenComponent";
import HomeScreenComponent from "./screens/HomeScreenComponent";
import LoginScreenComponent from "./screens/LoginScreenComponent";
import RideHistoryScreen from "./screens/RideHistoryScreen";
import UserProfileScreen from "./screens/UserProfileScreen";
import RideHistoryScreenRider from "./screens/RideHistoryScreenRider";
import RiderHomeScreen from "./screens/RiderHomeScreen";

// Icons
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";

// Create Navigators
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
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const [role, setRole] = useState(null); // Track user role (user or rider)
  const [isLoading, setIsLoading] = useState(true); // Track loading state while checking login status

  useEffect(() => {
    // Function to check if user is logged in and set role
    const checkLoginStatus = async () => {
      const userID = await AsyncStorage.getItem("userID"); // Check if userID exists
      if (userID) {
        setIsLoggedIn(true); // If userID exists, user is logged in
        const userRole = await AsyncStorage.getItem("role"); // Get user role
        setRole(userRole); // Set role based on AsyncStorage value
      } else {
        setIsLoggedIn(false); // User is not logged in
      }
      setIsLoading(false); // Set loading to false after the check is complete
    };

    checkLoginStatus();
  }, []);

  // While loading, display a blank screen or splash screen
  if (isLoading) {
    return null; // You can replace this with a loading spinner or splash screen
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={
          isLoggedIn
            ? role === "rider"
              ? "RiderTab" // If role is rider, show RiderTab
              : "Tab" // If role is user, show Tab
            : "Login" // If not logged in, show Login
        }
      >
        {/* Tab for regular users */}
        <Stack.Screen
          name="Tab"
          children={(props) => <TabScreenComponent {...props} setIsLoggedIn={setIsLoggedIn} />}
          options={{ headerShown: false }}
        />
        {/* Tab for riders */}
        <Stack.Screen
          name="RiderTab"
          children={(props) => <TabScreenRidersComponent {...props} setIsLoggedIn={setIsLoggedIn} />}
          options={{ headerShown: false }}
        />
        {/* Login screen */}
        <Stack.Screen
          name="Login"
          component={LoginScreenComponent}
          options={{ headerShown: false }}
        />
        {/* SignUp screen */}
        <Stack.Screen
          name="Signup"
          component={SignUpScreenComponent}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
