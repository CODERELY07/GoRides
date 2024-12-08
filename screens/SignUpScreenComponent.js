import React from "react";
import { View, Text, TextInput, TouchableOpacity, StatusBar } from "react-native";
import { styles } from "../styles/globalStyles";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function LoginScreenComponent({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.boxContainer}>
        <Text style={[styles.bold, styles.big]}>Sign up or Login with Google</Text>
        <View style={{ marginTop: 50 }}>
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
          <TextInput placeholder="Juan Rides" style={styles.input} />
        </View>
        <View style={{ marginTop: 12 }}>
          <Text style={styles.bold}>Confirm your password</Text>
          <TextInput placeholder="Juan Rides" style={styles.input} />
        </View>
        <View style={{ marginTop: 20 }}>
          <TouchableOpacity
            style={[styles.loginButtons, { backgroundColor: "#4A90E2" }]}
            onPress={() => navigation.navigate("Tab")}
          >
            <Text style={[styles.loginButtonText, styles.bold, { color: "#fff" }]}>
              Login with email
            </Text>
          </TouchableOpacity>
          <View>
            <Text style={styles.orText}>----------- OR -----------</Text>
            <TouchableOpacity
              style={[styles.loginButtons, { borderWidth: 1, borderColor: "#4A90E2", backgroundColor: "#fff" }]}
              onPress={() => navigation.navigate("Tab")}
            >
              <Text style={[styles.loginButtonText, { color: "#4A90E2" }]}>Sign up with email</Text>
            </TouchableOpacity>
            <Text style={styles.smallText}>Don't have an account? Sign up now.</Text>
            <TouchableOpacity
              style={[styles.loginButtons, { borderWidth: 1, borderColor: "#F5F7F8", backgroundColor: "#fff" }]}
              onPress={() => navigation.navigate("Tab")}
            >
              <AntDesign name="google" size={24} color="#000" />
              <Text style={[styles.loginButtonText, styles.bold]}>Continue with Google</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
