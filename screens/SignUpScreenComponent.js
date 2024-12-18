import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Alert,
} from "react-native";
import { styles } from "../styles/globalStyles";
import AntDesign from "@expo/vector-icons/AntDesign";
import * as SQLite from 'expo-sqlite';
import AsyncStorage from "@react-native-async-storage/async-storage"; 

const initDB = async () => {
  const db = await SQLite.openDatabaseAsync('goRides');
  try {
    await db.execAsync(`
      PRAGMA journal_mode = WAL;
      -- Create the 'users' table again with the necessary columns
      CREATE TABLE IF NOT EXISTS users(
        userID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        email TEXT NOT NULL,
        username TEXT NOT NULL,
        password TEXT NOT NULL,
        role TEXT NULL
      );
    `);
    
  } catch (e) {
    console.log("Error", e);
  }
};
initDB();

const validateEmail = (email) => {
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  return emailRegex.test(email);
};

export default function LoginScreenComponent({ navigation }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [isCreated, setIsCreated] = useState(false); 

  const createUsers = async () => {
    const db = await SQLite.openDatabaseAsync('goRides');
    try {
      const result = await db.getAllAsync("SELECT email FROM users WHERE email = ?", [email]);
      if (result.length > 0) {
        setEmailError('Error: Email already in use. Please use a different email.');
        setIsCreated(false);
      } else {
        // Perform the INSERT query
        const insertResult = await db.runAsync('INSERT INTO users(email, username, password) VALUES(?, ?, ?)', [email, username, password]);
        
        const user =  await db.getAllAsync("SELECT userID FROM users WHERE email = ?", [email]);
        // The inserted user ID is available in insertResult.lastID

        
        await AsyncStorage.setItem("userID", user[0].userID.toString());
         
        setIsCreated(true);
        setEmailError("");
      }
    } catch (e) {
      console.log("Error: ", e);
      setIsCreated(false);
    }
  };
  

  const handleSignUp = async () => {
    let valid = true;

    if (!username) {
      setUsernameError("Username cannot be empty!");
      valid = false;
    } else if (username.length < 6) {
      setUsernameError("Username should be at least 6 characters");
      valid = false;
    } else {
      setUsernameError('');
    }

    if (!email || !validateEmail(email)) {
      setEmailError('Please enter a valid email');
      valid = false;
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError('Please enter a valid password');
      valid = false;
    } else if (password.length < 6) {
      setPasswordError("Password should be at least 6 characters");
      valid = false;
    } else {
      setPasswordError('');
    }

    if (confirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match");
      valid = false;
    } else {
      setConfirmPasswordError('');
    }

    if (valid) {
      await createUsers();

      if (isCreated) {
        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setUsernameError('');
        setEmailError('');
        setPasswordError('');
        setConfirmPasswordError('');

        Alert.alert(
          "Success",
          "Your account has been created successfully!",
          [
            {
              text: "OK",
              onPress: () => {
                navigation.navigate('Picker');
              },
            }
          ]
        );
      }
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.boxContainer}>
        <Text style={[styles.bold, styles.big]}>Signup on GoRides</Text>
        <Text style={styles.smallText}>Experience Fast and Quality Service</Text>

        <View style={{ marginTop: 25 }}>
          <Text style={styles.bold}>Enter your email</Text>
          <TextInput
            placeholder="juan@gmail.com"
            style={styles.input}
            onChangeText={setEmail}
            value={email}
          />
          <Text style={styles.smallText}>We'll never share your email with anyone else.</Text>
          {emailError ? <Text style={styles.errorMessage}>{emailError}</Text> : null}
        </View>

        <View style={{ marginTop: 12 }}>
          <Text style={styles.bold}>Enter your username</Text>
          <TextInput
            placeholder="Juan Rides"
            value={username}
            onChangeText={setUsername}
            style={styles.input}
          />
          {usernameError ? <Text style={styles.errorMessage}>{usernameError}</Text> : null}
        </View>

        <View style={{ marginTop: 12 }}>
          <Text style={styles.bold}>Enter your password</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          {passwordError ? <Text style={styles.errorMessage}>{passwordError}</Text> : null}
        </View>

        <View style={{ marginTop: 12 }}>
          <Text style={styles.bold}>Confirm your password</Text>
          <TextInput
            style={styles.input}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
          {confirmPasswordError ? <Text style={styles.errorMessage}>{confirmPasswordError}</Text> : null}
        </View>

        <View style={{ marginTop: 20 }}>
          <TouchableOpacity
            style={[styles.loginButtons, { backgroundColor: "#4A90E2" }]}
            onPress={handleSignUp}
          >
            <Text style={[styles.loginButtonText, styles.bold, { color: "#fff" }]}>
              Signup
            </Text>
          </TouchableOpacity>

          <View>
            <Text style={[styles.smallText, styles.textCenter]}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={[styles.smallText, styles.textCenter]}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
