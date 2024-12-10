import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StatusBar } from "react-native";
import { styles } from "../styles/globalStyles";
import * as SQLite from "expo-sqlite";  // Import SQLite
import AsyncStorage from "@react-native-async-storage/async-storage";  // Import AsyncStorage

// Open the SQLite database
const login = async (email, password, navigation,setPasswordError) => {
  try {
    // Open the SQLite database
    const db = await SQLite.openDatabaseAsync('goRides'); // Ensure your database name matches

    // Query to find user by email and password
    const result = await db.getFirstAsync(
      "SELECT * FROM users WHERE email = ? AND password = ?",
      [email, password]
    );

    if (result) {
      console.log("Login successful!");
      
      // Store user details in AsyncStorage
      await AsyncStorage.setItem("email", result.email);
      await AsyncStorage.setItem("username", result.username);
      await AsyncStorage.setItem("userID", result.userID.toString());
      // navigation.reset({
      //   index: 0, // Reset the navigation stack to the Home screen
      //   routes: [{ name: 'Home' }],
      // });
      // Navigate to another screen on successful login
      if(result.role == "user"){
        navigation.navigate("Tab");
      }else{
        navigation.navigate("RiderTab");
      }
     
    } else {
      console.log("Invalid email or password");
      setPasswordError("Invalid email or password");
    }
  } catch (e) {
    console.log("Error during login: ", e);
  }
};
const validateEmail = (email) => {
  // Regular expression for validating email format
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  return emailRegex.test(email);
};

export default function LoginScreenComponent({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Handle Login function
  const handleLogin = async () => {
    let valid = true;

    // Email Validation
    if (!email || !validateEmail(email)) {
      setEmailError("Please enter a valid email");
      valid = false;
    } else {
      setEmailError("");
    }

    // Password Validation
    if (!password) {
      setPasswordError("Please enter a password");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (valid) {
      login(email, password,navigation,setPasswordError);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.boxContainer}>
        <Text style={[styles.bold, styles.big]}>Login to GoRides</Text>
        <Text style={styles.smallText}>
          Experience Fast and Quality Service
        </Text>
        <View style={{ marginTop: 25 }}>
          <Text style={styles.bold}>Enter your email</Text>
          <TextInput
            placeholder="juan@gmail.com"
            style={styles.input}
            onChangeText={setEmail}
            value={email}
          />
          {emailError ? (
            <Text style={styles.errorMessage}>{emailError}</Text>
          ) : null}
        </View>
        <View style={{ marginTop: 12 }}>
          <Text style={styles.bold}>Enter your password</Text>
          <TextInput
            style={styles.input}
            onChangeText={setPassword}
            secureTextEntry
            value={password}
          />
          {passwordError ? (
            <Text style={styles.errorMessage}>{passwordError}</Text>
          ) : null}
        </View>
        <View style={{ marginTop: 20 }}>
          <TouchableOpacity
            style={[styles.loginButtons, { backgroundColor: "#4A90E2" }]}
            onPress={handleLogin}
          >
            <Text
              style={[styles.loginButtonText, styles.bold, { color: "#fff" }]}
            >
              Login
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={[styles.smallText, styles.textCenter]}>
            Don't have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text style={[styles.smallText, styles.textCenter]}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
