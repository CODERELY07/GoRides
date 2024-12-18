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
  const [isLoggingOut, setIsLoggingOut] = useState(false); 

 
  const fetchUserDetails = async () => {
    try {
      const storedUserID = await AsyncStorage.getItem("userID");
      if (storedUserID) {
        setUserID(storedUserID);
        const db = await SQLite.openDatabaseAsync('goRides');
        const result = await db.getAllAsync("SELECT username FROM users WHERE userID = ?", [storedUserID]);
        if (result.length > 0) {
          setUsername(result[0].username); 
        }
      }
    } catch (error) {
      console.log("Error fetching user details:", error);
    }
  };

 
  const updateUsername = async () => {
    if (newUsername.trim() === "") {
      Alert.alert("Invalid Input", "Please enter a valid username.");
      return;
    }

    try {
      const db = await SQLite.openDatabaseAsync('goRides');
      await db.runAsync("UPDATE users SET username = ? WHERE userID = ?", [newUsername, userID]);
      setUsername(newUsername);
      setNewUsername(''); 
      setIsEditable(false); 
      Alert.alert("Success", "Your username has been updated. Please Logout to fully update your username.");
    } catch (error) {
      console.log("Error updating username:", error);
      Alert.alert("Error", "There was an issue updating your username.");
    }
  };


  useEffect(() => {
    fetchUserDetails();
  }, []);

  
  useEffect(() => {
    if (isLoggingOut) {
      const performLogout = async () => {
        try {
         
          await AsyncStorage.removeItem('userID');
          await AsyncStorage.removeItem('role');
          await AsyncStorage.removeItem('username');
          await AsyncStorage.removeItem('email');
          
         
          setIsLoggedIn(false); 
          navigation.navigate("Login"); 
        } catch (error) {
          console.log("Error logging out:", error);
          Alert.alert("Error", "There was an issue logging out.");
        } finally {
          setIsLoggingOut(false); 
        }
      };

      performLogout();
    }
  }, [isLoggingOut]); 


  const handleLogout = () => {
    setIsLoggingOut(true); 
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
         
          <TextInput
            style={[styles.input, { fontSize: 24, fontWeight: "bold" }]}
            value={isEditable ? newUsername : username}
            onChangeText={setNewUsername}
            editable={isEditable} 
          />
          <Text style={[styles.smallText, { color: "rgba(0,0,0,0.5)" }]}>Let's Ride</Text>
        </View>
      </View>

      <View style={{ marginTop: 40 }}>
       
        {!isEditable ? (
          <TouchableOpacity
            style={[styles.loginButtons, { backgroundColor: "#4A90E2", marginTop: 20 }]}
            onPress={() => setIsEditable(true)} 
          >
            <Text style={[styles.loginButtonText, styles.bold, { color: "#fff" }]}>Edit Username</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.loginButtons, { backgroundColor: "#4A90E2", marginTop: 20 }]}
            onPress={updateUsername} 
          >
            <Text style={[styles.loginButtonText, styles.bold, { color: "#fff" }]}>Save</Text>
          </TouchableOpacity>
        )}

    
        <TouchableOpacity
          style={[styles.loginButtons, { backgroundColor: '#B8001F', marginTop: 20 }]}
          onPress={handleLogout} 
        >
          <Text style={[styles.loginButtonText, styles.bold, { color: "#fff" }]}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
