// src/screens/RideHistoryScreen.js
import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { AntDesign, Entypo } from "@expo/vector-icons";

const RideHistoryScreen = ({ navigation }) => {
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
          <Text style={[styles.bold, styles.big]}>Ride History</Text>
          <Text style={styles.smallText}>
            This is where you will see your Recent Rides.
          </Text>
        </View>
      </View>
      <View style={{ marginTop: 30 }}>
        <View style={styles.inlineSpaceBetween}>
          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
              }}
            >
              <Image style={styles.profile} />
              <View>
                <Text style={styles.bold}>Naga - Pili</Text>
                <Text style={styles.smallText}>Rider Name</Text>
              </View>
            </View>
          </View>
          <View style={{ flexDirection: "row", gap: 40 }}>
            <Text>₱250.00</Text>
            <TouchableOpacity>
              <Entypo name="cross" size={24} color="#4A90E2" />
            </TouchableOpacity>
          </View>
        </View>
        {/* Repeat for other rides */}
      </View>
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
  profile: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#D0D0D0",
  },
  inlineContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  inlineSpaceBetween: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    justifyContent: "space-between",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
    paddingBottom: 5,
  },
  smallText: {
    fontSize: 12,
    color: "rgba(0,0,0,0.5)",
  },
});

export default RideHistoryScreen;
