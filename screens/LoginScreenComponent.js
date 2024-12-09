import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { styles } from "../styles/globalStyles";
import AntDesign from "@expo/vector-icons/AntDesign";
import * as SQLite from "expo-sqlite";

const initDB = async () => {
  const db = await SQLite.openDatabaseAsync("goRides");

  try {
    await db.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS users(
        userID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        email TEXT NOT NULL,
        username TEXT NOT NULL,
        password TEXT NOT NULL)
        `);
  } catch (e) {
    console.log("Error", e);
  }
};
initDB();

const createUsers = async () => {
  const db = await SQLite.openDatabaseAsync("goRides");
  try {
    const result = await db.runAsync(
      "INSERT INTO users(email,username, password) VALUES(?,?,?)",
      "calipjo@gmail.com",
      "Mark",
      "mypassword"
    );
    console.log(result.lastInsertRowId, result.changes);
  } catch (e) {
    console.log("Error: ", e);
  }
};

// createUsers();

const showUsers = async () => {
  const db = await SQLite.openDatabaseAsync("goRides");
  try {
    const allRows = await db.getAllAsync("SELECT * FROM users");
    for (const row of allRows) {
      console.log(row.userID, row.username, row.email, row.password);
    }
  } catch (e) {
    console.log("Error: ", e);
  }
};
const deleteUsers = async () => {
  const db = await SQLite.openDatabaseAsync("goRides");
  try {
    await db.runAsync("DELETE FROM users WHERE userID = $userID", {
      $userID: 15,
    });
    console.log("deleted");
  } catch (e) {
    console.log("Error: ", e);
  }
};

const validateEmail = (email) => {
  // Regular expression for validating email format
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  return emailRegex.test(email);
};

deleteUsers();
// createUsers();
showUsers();
// deleteUsers();
export default function LoginScreenComponent({ navigation }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const handleSignUp = () => {
    let valid = true;

    if (!username) {
      setUsernameError("Usermame cannot be empty!");
      valid = false;
    } else if (username.length < 6) {
      setUsernameError("Username Should be atLeast 6 characters");
      valid = false;
    } else {
      setUsernameError("");
      valid = true;
    }

    if (!email || !validateEmail(email)) {
      setEmailError("Please enter a valid email");
      valid = false;
    } else {
      setEmailError("");
      valid = true;
    }

    if (!password) {
      setPasswordError("Please enter a valid password");
      valid = false;
    } else if (password.length < 6) {
      setPasswordError("Password should be at least 6 characters");
      valid = false;
    } else {
      setPasswordError("");
      valid = true;
    }

    if (confirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match");
      valid = false;
    } else {
      setConfirmPasswordError("");
      valid = true;
    }

    if (valid) {
      navigation.navigate("Login");
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.boxContainer}>
        <Text style={[styles.bold, styles.big]}>Signup on GoRides</Text>
        <Text style={styles.smallText}>
          Experience Fast and Quality Service
        </Text>
        <View style={{ marginTop: 25 }}>
          <Text style={styles.bold}>Enter your email</Text>
          <TextInput
            placeholder="juan@gmail.com"
            style={styles.input}
            onChangeText={setEmail}
          />
          <Text style={styles.smallText}>
            We'll never share your email with anyone else.
          </Text>
          {emailError ? (
            <Text style={styles.errorMessage}>{emailError}</Text>
          ) : null}
        </View>
        <View style={{ marginTop: 12 }}>
          <Text style={styles.bold}>Enter your username</Text>
          <TextInput
            placeholder="Juan Rides"
            onChangeText={setUsername}
            style={styles.input}
          />
          {usernameError ? (
            <Text style={styles.errorMessage}>{usernameError}</Text>
          ) : null}
        </View>
        <View style={{ marginTop: 12 }}>
          <Text style={styles.bold}>Enter your password</Text>
          <TextInput
            style={styles.input}
            onChangeText={setPassword}
            secureTextEntry
          />
          {passwordError ? (
            <Text style={styles.errorMessage}>{passwordError}</Text>
          ) : null}
        </View>
        <View style={{ marginTop: 12 }}>
          <Text style={styles.bold}>Confirm your password</Text>
          <TextInput
            style={styles.input}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
          {confirmPasswordError ? (
            <Text style={styles.errorMessage}>{confirmPasswordError}</Text>
          ) : null}
        </View>
        <View style={{ marginTop: 20 }}>
          <TouchableOpacity
            style={[styles.loginButtons, { backgroundColor: "#4A90E2" }]}
            onPress={handleSignUp}
          >
            <Text
              style={[styles.loginButtonText, styles.bold, { color: "#fff" }]}
            >
              Login
            </Text>
          </TouchableOpacity>
        </View>
        <View ><Text style={[styles.smallText, styles.textCenter]}>Already Have an account?</Text>
          <TouchableOpacity onPress={()=> navigation.navigate('Signup')}>
            <Text style={[styles.smallText, styles.textCenter]}>SignUp</Text>
          </TouchableOpacity>
          </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
