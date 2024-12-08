// src/screens/TrackLocationScreen.js
import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const TrackLocationScreen = ({ navigation }) => {
  return (
    <View style={styles.homeScreenContainer}>
      <View style={[styles.inlineContainer, { gap: 10 }]}>
        <AntDesign
          name="back"
          size={24}
          color="#4A90E2"
          onPress={() => {
            navigation.goBack();
          }}
        />
        <View>
          <Text style={[styles.bold, styles.big]}>Track Location</Text>
          <Text style={styles.smallText}>Track Rider</Text>
        </View>
      </View>
      <View style={{ marginTop: 30 }}>
        <Image
          style={{ width: "100%", height: "80%" }}
          source={require("../assets/map.png")} // Path may vary based on your project structure
        />
      </View>
      <Text style={{ marginTop: -40, textAlign: "center" }}>
        Map with Route to Pickup Location
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  homeScreenContainer: {
    flex: 1,
    paddingTop: 60,
    backgroundColor: "#FAFAFA",
    paddingHorizontal: 20,
  },
  bold: {
    fontWeight: "bold",
  },
  big: {
    fontSize: 20,
  },
  smallText: {
    fontSize: 12,
    color: "rgba(0,0,0,0.5)",
  },
  inlineContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default TrackLocationScreen;
