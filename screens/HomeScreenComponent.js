import React, {useState} from "react";
import { View, Text, TextInput, Image, TouchableOpacity, ScrollView, StatusBar } from "react-native";
import { styles } from "../styles/globalStyles";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import * as SQLite from 'expo-sqlite';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function HomeScreenComponent({ navigation }) {
  const [username, setUsername] = useState('');

  const getUsername = async () =>{
    try{
      const value = await AsyncStorage.getItem("username");
      if (value !== null) {
        setUsername(value);
      }
    }catch(err){
      console.log(err);
      }
  }
  getUsername();
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
                <Text style={[styles.smallText, { color: "#fff" }]}>Lets Ride</Text>
              </View>
            </View>
            <Feather name="map-pin" size={24} color="#fff" onPress={() => navigation.navigate("Map")} />
          </View>

          <View style={[styles.locatonSearchContainer, styles.boxShadows]}>
            <View style={styles.inputContainer}>
              <Text>Current Location</Text>
              <View style={[styles.inlineContainer, styles.input]}>
              <TextInput style={{ width: "90%" }} />
                <TouchableOpacity>

                  <AntDesign name="search1" size={24} color="black" />
                </TouchableOpacity>
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
