import React, { useState } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import LocationCard from './UXResources/LocationCard';
import spottedMockData from './data/mockData';
import CreateSpottedScreen from './Screens/CreateSpottedScreen';

const FeedScreen = ({ navigation }) => (
  <View style={styles.screenContainer}>
    <ScrollView>
      <Text style={styles.sectionTitle}>Today's Spotted</Text>
      {spottedMockData.map((dataItem, index) => (
        <LocationCard key={index} data={dataItem} navigation={navigation} />
      ))}
    </ScrollView>
    <TouchableOpacity
      style={styles.createSpottedButton}
      onPress={() => navigation.navigate('CreateSpotted')}
    >
      <Ionicons name="add-circle" size={50} color="#18b551" />
    </TouchableOpacity>
  </View>
);

const SettingsScreen = () => (
  <View style={styles.screenContainer}>
    <Text style={styles.screenText}>Settings</Text>
  </View>
);

const ProfileScreen = () => (
  <View style={styles.screenContainer}>
    <Text style={styles.screenText}>Profile</Text>
  </View>
);

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Feed') {
              iconName = 'images';
            } else if (route.name === 'Settings') {
              iconName = 'settings';
            } else if (route.name === 'Profile') {
              iconName = 'person';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#18b551', // Sleek blue accent color for active tab
          tabBarInactiveTintColor: '#B8B8C8', // Softer lavender gray for inactive tabs
          tabBarStyle: {
            backgroundColor: '#1e3b28', // Dark, elegant background
            borderTopWidth: 0,
          },
          headerTitle: 'Spotted',
          headerStyle: {
            backgroundColor: '#1e3b28',
          },
          headerTintColor: '#ffffff',
          headerTitleAlign: 'center',
        })}
      >
        <Tab.Screen name="Profile" component={ProfileScreen} />
        <Tab.Screen name="Feed" component={FeedScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#1f1e21',
    paddingTop: 20,
    fontFamily: 'Avenir'
  },
  screenText: {
    color: 'white',
    fontSize: 24,
    textAlign: 'center',
    marginTop: 20,
    fontFamily: 'Avenir',
  },
  sectionTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Avenir',
  },
  createSpottedButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: 'transparent',
  },
});

export default App;
