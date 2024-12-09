import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import * as SQLite from 'expo-sqlite';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';  

const selectUsers = async () => {
  try {
    const db = await SQLite.openDatabaseAsync('goRides');
    const result = await db.getAllAsync('SELECT userID FROM users'); 
    console.log('All users:', result); 
  } catch (e) {
    console.error('Error selecting users:', e);
  }
};

selectUsers();

export default function PickerScreen() {
  const [userID, setUserID] = useState('');
  const [role, setRole] = useState('');
  const navigation = useNavigation();  

  useEffect(() => {
    const userIDFunc = async () => {
      try {
        const value = await AsyncStorage.getItem("userID");
        if (value !== null) {
          setUserID(value);
          console.log("Fetched UserID:", value); 
        }
      } catch (error) {
        console.error('Error retrieving userID:', error);
      }
    };
    userIDFunc();
  }, []); 

  const checkUserExists = async (userID) => {
    try {
      const db = await SQLite.openDatabaseAsync('goRides');
      const result = await db.getFirstAsync(
        'SELECT * FROM users WHERE userID = ?;',
        [userID]
      );
      console.log('User exists:', result);
      return result !== undefined;
    } catch (error) {
      console.error('Error checking user existence:', error);
      return false;
    }
  };

  const updateRoleInDatabase = async (selectedRole) => {
    if (!userID) {
      Alert.alert('Error', 'User ID is not available');
      return;
    }

    const userExists = await checkUserExists(userID);
    if (!userExists) {
      Alert.alert('Error', 'User ID does not exist in the database');
      return;
    }

    try {
      const db = await SQLite.openDatabaseAsync('goRides');

      const currentRoleResult = await db.getFirstAsync(
        'SELECT role FROM users WHERE userID = ?;',
        [userID]
      );

      const currentRole = currentRoleResult ? currentRoleResult.role : null;

      if (currentRole === selectedRole) {
        Alert.alert('No Changes', 'The selected role is already assigned to the user.');
        return;
      }

      const result = await db.runAsync(
        'UPDATE users SET role = ? WHERE userID = ?;',
        [selectedRole, userID]
      );
    } catch (error) {
      console.error('Error updating role in database:', error);
      Alert.alert('Error', 'Failed to update role');
    }
  };

  const handleRoleSelect = (role) => {
    setRole(role);
    updateRoleInDatabase(role);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a Role:</Text>

      <View style={styles.buttonContainer}>
        <Button
          title="User"
          onPress={() => handleRoleSelect('user')}
        />
        <View style={styles.spacer}></View>
        <Button
          title="Rider"
          onPress={() => handleRoleSelect('rider')}
        />
      </View>
    
      <Text style={styles.selectedRole}>Selected Role: {role || 'None'}</Text>
      <Button
        title="Continue"
        onPress={() => {
            navigation.navigate('Login');
        }}
        />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  buttonContainer: {
    marginBottom: 20,
    width: '100%',
  },
  selectedRole: {
    fontSize: 18,
    marginTop: 20,
    marginBottom:10,
  },
  spacer: {
    marginVertical: 10, // Space between the buttons
  }
});
