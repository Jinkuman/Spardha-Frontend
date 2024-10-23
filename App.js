import React, { useState } from 'react';
import { View, ScrollView, Text, StyleSheet, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LocationCard from './UXResources/LocationCard';
import DetailScreen from './Screens/DetailScreen'; // Import DetailScreen
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
    </View>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Spotted" component={HomeScreen} />
        <Stack.Screen name="Detail" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default App;
