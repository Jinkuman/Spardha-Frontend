import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import LocationCard from '././'
import spottedMockData from './data/mockData'; // Ensure the path to your data is correct

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={spottedMockData}
        renderItem={({ item, index }) => (
          <LocationCard
            key={index}
            data={item}
            onPress={() => navigation.navigate('Detail', { data: item })}
            isExpanded={false} // Or manage this state to toggle expansion
            navigation={navigation}
          />
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Dark background for the whole screen
  },
});

export default HomeScreen;
