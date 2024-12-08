import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { styles } from "../styles/globalStyles";
import AntDesign from "@expo/vector-icons/AntDesign";

const initDB = async () => {};
export default function LoginScreenComponent({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.boxContainer}>
        <Text style={[styles.bold, styles.big]}>Login in GoRides</Text>
        <Text style={styles.smallText}>
          Experience Fast and Quality Service
        </Text>
        <View style={{ marginTop: 25 }}>
          <Text style={styles.bold}>Enter your email</Text>
          <TextInput placeholder="juan@gmail.com" style={styles.input} />
          <Text style={styles.smallText}>
            We'll never share your email with anyone else.
          </Text>
        </View>
        <View style={{ marginTop: 12 }}>
          <Text style={styles.bold}>Enter your username</Text>
          <TextInput placeholder="Juan Rides" style={styles.input} />
        </View>
        <View style={{ marginTop: 12 }}>
          <Text style={styles.bold}>Enter your password</Text>
          <TextInput style={styles.input} />
        </View>
        <View style={{ marginTop: 12 }}>
          <Text style={styles.bold}>Confirm your password</Text>
          <TextInput style={styles.input} />
        </View>
        <View style={{ marginTop: 20 }}>
          <TouchableOpacity
            style={[styles.loginButtons, { backgroundColor: "#4A90E2" }]}
            onPress={() => navigation.navigate("Tab")}
          >
            <Text
              style={[styles.loginButtonText, styles.bold, { color: "#fff" }]}
            >
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
