import React, { useState, useEffect } from "react";
import { View, Text, Image, TextInput, TouchableOpacity, Alert } from "react-native";
import { styles } from "../styles/globalStyles";
import AntDesign from "@expo/vector-icons/AntDesign";
import * as SQLite from 'expo-sqlite';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function UserProfileScreen({ navigation, setIsLoggedIn }) {
  const [username, setUsername] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [userID, setUserID] = useState(null);
  const [isEditable, setIsEditable] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false); // New state to track logout process

  // Fetch user ID and username from SQLite
  const fetchUserDetails = async () => {
    try {
      const storedUserID = await AsyncStorage.getItem("userID");
      if (storedUserID) {
        setUserID(storedUserID);
        const db = await SQLite.openDatabaseAsync('goRides');
        const result = await db.getAllAsync("SELECT username FROM users WHERE userID = ?", [storedUserID]);
        if (result.length > 0) {
          setUsername(result[0].username); // Set current username
        }
      }
    } catch (error) {
      console.log("Error fetching user details:", error);
    }
  };

  // Function to update the username in the database
  const updateUsername = async () => {
    if (newUsername.trim() === "") {
      Alert.alert("Invalid Input", "Please enter a valid username.");
      return;
    }

    try {
      const db = await SQLite.openDatabaseAsync('goRides');
      await db.runAsync("UPDATE users SET username = ? WHERE userID = ?", [newUsername, userID]);
      setUsername(newUsername);
      setNewUsername(''); // Clear the input field
      setIsEditable(false); // Turn off edit mode
      Alert.alert("Success", "Your username has been updated. Please Logout to fully update your username.");
    } catch (error) {
      console.log("Error updating username:", error);
      Alert.alert("Error", "There was an issue updating your username.");
    }
  };

  // Fetch the user details when the component mounts
  useEffect(() => {
    fetchUserDetails();
  }, []);

  // Handle logout with delay to avoid the "update during render" issue
  useEffect(() => {
    if (isLoggingOut) {
      const performLogout = async () => {
        try {
          // Remove user data from AsyncStorage
          await AsyncStorage.removeItem('userID');
          await AsyncStorage.removeItem('role');
          await AsyncStorage.removeItem('username');
          await AsyncStorage.removeItem('email');
          
          // Update login state to false and navigate to Login screen
          setIsLoggedIn(false); // Trigger logged out state
          navigation.navigate("Login"); // Navigate to login screen
        } catch (error) {
          console.log("Error logging out:", error);
          Alert.alert("Error", "There was an issue logging out.");
        } finally {
          setIsLoggingOut(false); // Reset logout state
        }
      };

      performLogout();
    }
  }, [isLoggingOut]); // Depend on `isLoggingOut` state

  // Logout function
  const handleLogout = () => {
    setIsLoggingOut(true); // Set the state to start the logout process
  };

  return (
    <View style={[styles.homeScreenContainer, { backgroundColor: "#fff" }]}>
      <View style={[styles.inlineContainer, { gap: 10 }]}>
        <View style={styles.backIcon}>
          <AntDesign name="back" size={24} color="#4A90E2" onPress={() => navigation.goBack()} />
        </View>
        <Text style={[styles.big, styles.bold]}>User Profile</Text>
      </View>

      <View style={[styles.inlineContainer, { marginTop: 50 }]}>
        <Image style={[styles.profile, { width: 100, height: 100, borderRadius: 50 }]} />
        <View style={styles.profileTextHolder}>
          {/* Make the username editable only when isEditable is true */}
          <TextInput
            style={[styles.input, { fontSize: 24, fontWeight: "bold" }]}
            value={isEditable ? newUsername : username}
            onChangeText={setNewUsername}
            editable={isEditable} // Editable only when isEditable is true
          />
          <Text style={[styles.smallText, { color: "rgba(0,0,0,0.5)" }]}>Let's Ride</Text>
        </View>
      </View>

      <View style={{ marginTop: 40 }}>
        {/* Show the "Edit Username" or "Save" button based on isEditable */}
        {!isEditable ? (
          <TouchableOpacity
            style={[styles.loginButtons, { backgroundColor: "#4A90E2", marginTop: 20 }]}
            onPress={() => setIsEditable(true)} // Enable editing mode
          >
            <Text style={[styles.loginButtonText, styles.bold, { color: "#fff" }]}>Edit Username</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.loginButtons, { backgroundColor: "#4A90E2", marginTop: 20 }]}
            onPress={updateUsername} // Save the new username
          >
            <Text style={[styles.loginButtonText, styles.bold, { color: "#fff" }]}>Save</Text>
          </TouchableOpacity>
        )}

        {/* Logout Button */}
        <TouchableOpacity
          style={[styles.loginButtons, { backgroundColor: '#B8001F', marginTop: 20 }]}
          onPress={handleLogout} // Logout the user
        >
          <Text style={[styles.loginButtonText, styles.bold, { color: "#fff" }]}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
