import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { AntDesign, Entypo } from "@expo/vector-icons";
import * as SQLite from 'expo-sqlite';  // SQLite import for fetching data
import AsyncStorage from '@react-native-async-storage/async-storage';

const RideHistoryScreenRider = ({ navigation }) => {
  const [rides, setRides] = useState([]); // Initialize the rides state to store the completed rides
  const [username, setUsername] = useState(''); // Username for fetching user-specific rides
  let db;

  // Fetch the username (if needed for filtering by user)
  const getUsername = async () => {
    try {
      const value = await AsyncStorage.getItem("username");
      if (value !== null) {
        setUsername(value);  // Set the username for filtering rides
        console.log("Username fetched: ", value);  // Debug log
      } else {
        console.log("Username not found in AsyncStorage");
      }
    } catch (err) {
      console.log("Error fetching username:", err);
    }
  };

  // Fetch completed rides for this rider
  const fetchRideHistory = async () => {
    if (!username) {
      console.log("Username is not set, skipping fetch");
      return;
    }

    try {
      db = await SQLite.openDatabaseAsync('goRides');
      console.log("Fetching rides for username:", username);  // Debug log
      const result = await db.getAllAsync(
        'SELECT * FROM rides WHERE ride_status = "completed" AND username = ?',
        [username]
      );
      console.log("Fetched rides result:", result);  // Debug log
      if (result && result.length > 0) {
        setRides(result); // Set the rides to state once fetched from the database
      } else {
        console.log("No completed rides found for the user.");
      }
    } catch (error) {
      console.log("Error fetching ride history:", error);
    }
  };

  // Fetch the rides when the component mounts or the username changes
  useEffect(() => {
    getUsername(); // Get username on mount
  }, []);

  // Fetch ride history only after username is set
  useEffect(() => {
    if (username) {
      fetchRideHistory(); // Fetch ride history if username is available
    }
  }, [username]);

  return (
    <ScrollView style={styles.homeScreenContainer}>
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
            Here you can view your completed rides.
          </Text>
        </View>
      </View>

      <View style={{ marginTop: 30 }}>
        {rides.length > 0 ? rides.map((ride) => (
          <View key={ride.id} style={styles.inlineSpaceBetween}>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <Text style={styles.bold}>{ride.current_location} - {ride.destination}</Text>
              <Text style={styles.smallText}>Completed Ride</Text>
            </View>
            <View style={{ flexDirection: "row", gap: 40 }}>
              <Text>₱{ride.fare || 'TBD'}</Text>
              <TouchableOpacity>
                <Entypo name="cross" size={24} color="#4A90E2" />
              </TouchableOpacity>
            </View>
          </View>
        )) : <Text>No completed rides yet</Text>}
      </View>
    </ScrollView>
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
});

export default RideHistoryScreenRider;
