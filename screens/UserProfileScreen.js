import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { styles } from "../styles/globalStyles";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";

export default function UserProfileScreen({ navigation }) {
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
          <Text style={[styles.bold, { color: "#000", fontSize: 24 }]}>Christian Quitola</Text>
          <Text style={[styles.smallText, { color: "rgba(0,0,0,0.5)" }]}>Lets Ride</Text>
        </View>
      </View>

      <View style={[styles.inlineContainer, styles.inlineSpaceBetween, { marginTop: 20 }]}>
        <TouchableOpacity style={[styles.loginButtons, { borderWidth: 1, borderColor: "#F5F7F8", backgroundColor: "#fff" }]}>
          <Text>Edit Information</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.loginButtons, { borderWidth: 1, borderColor: "#F5F7F8", backgroundColor: "#fff" }]}>
          <Text>Update Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.loginButtons, { backgroundColor: "#4A90E2" }]}>
          <Entypo name="plus" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
