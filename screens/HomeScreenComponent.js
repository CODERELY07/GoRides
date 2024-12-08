import React from "react";
import { View, Text, TextInput, Image, TouchableOpacity, ScrollView, StatusBar } from "react-native";
import { styles } from "../styles/globalStyles";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function HomeScreenComponent({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" backgroundColor="#f1f1f1" />
      <ScrollView>
        <View style={styles.homeScreenContainer}>
          <View style={styles.header}>
            <View style={styles.inlineContainer}>
              <Image style={styles.profile} />
              <View style={styles.profileTextHolder}>
                <Text style={[styles.bold, { color: "#fff" }]}>Username</Text>
                <Text style={[styles.smallText, { color: "#fff" }]}>Lets Ride</Text>
              </View>
            </View>
            <Feather name="map-pin" size={24} color="#fff" onPress={() => navigation.navigate("Map")} />
          </View>

          <View style={[styles.locatonSearchContainer, styles.boxShadows]}>
            <View style={styles.inputContainer}>
              <Text>Current Location</Text>
              <TextInput style={styles.input} />
            </View>
            <View style={styles.inputContainer}>
              <Text>Destination</Text>
              <View style={[styles.inlineContainer, styles.input]}>
                <TextInput style={{ width: "90%" }} />
                <AntDesign name="search1" size={24} color="black" />
              </View>
            </View>
          </View>

          <View style={[styles.applyRidersContainer, styles.boxShadows]}>
            <Text style={[styles.bold, { marginTop: 10 }]}>Riders in the destination</Text>
            {/* Add more riders list as required */}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
