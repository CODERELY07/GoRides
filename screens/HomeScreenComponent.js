import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert,
} from "react-native";
import { styles } from "../styles/globalStyles";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import * as SQLite from "expo-sqlite";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native"; // Import useFocusEffect

export default function HomeScreenComponent({ navigation }) {
  const [username, setUsername] = useState("");
  const [currentLocation, setCurrentLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [savedRide, setSavedRide] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  let db;

  // Open database and initialize it
  const initDb = async () => {
    db = await SQLite.openDatabaseAsync("goRides");
    try {
      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS rides (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username TEXT NOT NULL,  -- User who requested the ride
          current_location TEXT NOT NULL,
          destination TEXT NOT NULL,
          ride_status TEXT DEFAULT 'pending',
          rider_name TEXT,  
          timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        );
      `);
    } catch (e) {
      console.log("Error initializing DB:", e);
    }
  };

  // Function to check if the user is logged in
  const checkIsLoggedIn = async () => {
    try {
      const storedUserID = await AsyncStorage.getItem("userID");
      if (storedUserID) {
        setIsLoggedIn(true); // User is logged in, so set logged-in state
      } else {
        setIsLoggedIn(false); // User is not logged in, so set logged-out state
      }
    } catch (error) {
      console.log("Error checking login state:", error);
      setIsLoggedIn(false); // Default to logged out state in case of error
    }
  };

  useEffect(() => {
    checkIsLoggedIn(); // Check if user is logged in when HomeScreenComponent mounts
  }, []);

  // Fetch the username from AsyncStorage
  const getUsername = async () => {
    try {
      const value = await AsyncStorage.getItem("username");
      if (value !== null) {
        setUsername(value); // Set the username after login
      }
    } catch (err) {
      console.log("Error fetching username:", err);
    }
  };

  // Fetch the current ride details (current_location and destination), but only for rides that are pending or accepted
  const fetchSavedRide = async () => {
    try {
      db = await SQLite.openDatabaseAsync("goRides");
      const result = await db.getAllAsync(
        'SELECT id, current_location, destination, ride_status, rider_name FROM rides WHERE username = ? AND ride_status IN ("pending", "accepted") ORDER BY timestamp DESC LIMIT 1',
        [username]
      );

      if (result.length > 0) {
        setSavedRide(result[0]); // Update the saved ride details
      } else {
        setSavedRide(null); // No ride found or it was completed/declined
      }
    } catch (error) {
      console.log("Error fetching saved ride:", error);
    }
  };

  // Insert or update the ride request
  const insertOrUpdateRideRequest = async () => {
    if (currentLocation && destination) {
      try {
        db = await SQLite.openDatabaseAsync("goRides");

        // Check if an existing pending or accepted ride request exists
        const existingRide = await checkExistingRideRequest();

        if (existingRide && existingRide.length > 0) {
          // Update the existing ride request with the new location and destination
          await db.runAsync(
            "UPDATE rides SET current_location = ?, destination = ? WHERE id = ?",
            [currentLocation, destination, existingRide[0].id]
          );
          Alert.alert(
            "Ride Updated",
            "Your existing ride request has been updated!"
          );
        } else {
          // Create a new ride request if no existing request found
          await db.runAsync(
            'INSERT INTO rides (username, current_location, destination, ride_status) VALUES (?, ?, ?, "pending")',
            [username, currentLocation, destination]
          );
          Alert.alert(
            "Ride Request Sent",
            "Your new ride request has been created!"
          );
        }

        // Fetch the updated ride after inserting or updating the request
        fetchSavedRide();
      } catch (error) {
        console.log("Error inserting or updating the ride request:", error);
      }
    } else {
      Alert.alert(
        "Invalid input",
        "Please provide both current location and destination."
      );
    }
  };

  // Check if there's an existing ride request for the user that is pending or accepted
  const checkExistingRideRequest = async () => {
    try {
      db = await SQLite.openDatabaseAsync("goRides");
      const result = await db.getAllAsync(
        'SELECT * FROM rides WHERE username = ? AND ride_status IN ("pending", "accepted")',
        [username]
      );
      return result; // Returns the array of rides, which should be empty or contain one ride.
    } catch (error) {
      console.log("Error checking for existing ride request:", error);
      return null;
    }
  };

  // Accept the ride and store the rider name
  const acceptRide = async (rideId) => {
    try {
      db = await SQLite.openDatabaseAsync("goRides");
      await db.runAsync(
        'UPDATE rides SET ride_status = "accepted", rider_name = ? WHERE id = ?',
        [username, rideId]
      );
      Alert.alert("Ride Accepted", "You have accepted the ride!");
      fetchSavedRide(); // Refresh the ride details
    } catch (error) {
      console.log("Error accepting the ride:", error);
    }
  };

  const markRideAsComplete = async () => {
    try {
      db = await SQLite.openDatabaseAsync("goRides");
      // Update the ride status in the database
      await db.runAsync(
        'UPDATE rides SET ride_status = "completed" WHERE id = ?',
        [savedRide.id]
      );
      Alert.alert("Ride Completed", "The ride has been marked as completed.");
  
      // Refresh the ride details immediately
      fetchSavedRide(); // Fetch updated ride request status
  
      // Trigger the RideHistoryScreen to refresh the history after completion
      navigation.navigate("RideHistory");
    } catch (error) {
      console.log("Error marking the ride as completed:", error);
    }
  };
  

  const cancelRide = async () => {
    try {
      db = await SQLite.openDatabaseAsync("goRides");
      // Update the ride status to 'cancelled'
      await db.runAsync(
        'UPDATE rides SET ride_status = "cancelled" WHERE id = ?',
        [savedRide.id]
      );
      Alert.alert("Ride Cancelled", "Your ride request has been cancelled.");

      // Refresh the ride details immediately after cancellation
      fetchSavedRide(); // Fetch updated ride request status
    } catch (error) {
      console.log("Error cancelling the ride:", error);
    }
  };

  useEffect(() => {
    initDb();
    getUsername(); // Get the username when the component is mounted
  }, []); // Only run once when the component is mounted

  // Refetch saved ride whenever the screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      if (username) {
        fetchSavedRide(); // Fetch the saved ride again whenever the screen is focused
      }
    }, [username]) // Only refetch if the username is set
  );

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" backgroundColor="#f1f1f1" />
      <ScrollView>
        <View style={styles.homeScreenContainer}>
          <View style={styles.header}>
            <View style={styles.inlineContainer}>
              <Image style={styles.profile} />
              <View style={styles.profileTextHolder}>
                <Text style={[styles.bold, { color: "#fff" }]}>{username}</Text>
                <Text style={[styles.smallText, { color: "#fff" }]}>
                  Let's Ride
                </Text>
              </View>
            </View>
            <Feather
              name="map-pin"
              size={24}
              color="#fff"
              onPress={() => navigation.navigate("Map")}
            />
          </View>

          <View style={[styles.locatonSearchContainer, styles.boxShadows]}>
            <View style={styles.inputContainer}>
              <Text>Current Location</Text>
              <View style={[styles.inlineContainer, styles.input]}>
                <TextInput
                  style={{ width: "90%" }}
                  value={currentLocation}
                  onChangeText={setCurrentLocation}
                />
              </View>
            </View>
            <View style={styles.inputContainer}>
              <Text>Destination</Text>
              <View style={[styles.input, styles.inlineContainer]}>
                <TextInput
                  style={{ width: "90%" }}
                  value={destination}
                  onChangeText={setDestination}
                />
                <TouchableOpacity onPress={insertOrUpdateRideRequest}>
                  <AntDesign name="search1" size={24} color="black" />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {savedRide && savedRide.ride_status !== "completed" && (
            <View style={[styles.locatonSearchContainer, styles.boxShadows]}>
              <Text style={[styles.bold, { marginTop: 10 }]}>
                Your Ride Details
              </Text>
              <Text>Current Location: {savedRide.current_location}</Text>
              <Text>Destination: {savedRide.destination}</Text>
              <Text>
                Ride Status:{" "}
                {savedRide.ride_status.charAt(0).toUpperCase() +
                  savedRide.ride_status.slice(1)}
              </Text>
              <Text style={{ lineHeight: 50, textAlign: "center" }}>
                {savedRide.rider_name
                  ? `Rider: ${savedRide.rider_name}`
                  : "Waiting for rider to accept..."}
              </Text>

              {savedRide.ride_status === "accepted" && (
                <TouchableOpacity onPress={markRideAsComplete}>
                  <Text style={{ color: "green", fontWeight: "bold" }}>
                    Complete Ride
                  </Text>
                </TouchableOpacity>
              )}

              {savedRide.ride_status === "pending" && (
                <TouchableOpacity onPress={cancelRide}>
                  <Text style={{ color: "red", fontWeight: "bold" }}>
                    Cancel Ride
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}