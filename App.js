import React, { useState } from 'react';
import { View, ScrollView, Text, StyleSheet, useColorScheme, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LocationCard from './UXResources/LocationCard';
import DetailScreen from './Screens/DetailScreen'; // Import DetailScreen
import CreateSpottedScreen from './Screens/CreateSpottedScreen';
import spottedMockData from './data/mockData'; // Import mock data

const Stack = createStackNavigator();

const HomeScreen = ({ navigation }) => {
  const [expandedCardId, setExpandedCardId] = useState(null);
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const toggleExpand = (id) => {
    setExpandedCardId(expandedCardId === id ? null : id);
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#262626' : '#f5f5f5' }]}> 
      <ScrollView>
        {spottedMockData.map((dataItem, index) => (
          <LocationCard
            key={index}
            data={dataItem}
            isExpanded={expandedCardId === index}
            onPress={() => toggleExpand(index)}
            isDarkMode={isDarkMode}
            navigation={navigation} // Pass navigation to LocationCard
          />
        ))}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button 
          title="Create Spotted" 
          onPress={() => navigation.navigate('Create a New Spotted')
          } 
        />
      </View>
    </View>
  );
};


const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Spotted" component={HomeScreen} />
        <Stack.Screen name="Detail" component={DetailScreen} />
        <Stack.Screen name="Create a New Spotted" component={CreateSpottedScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  createContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default App;
