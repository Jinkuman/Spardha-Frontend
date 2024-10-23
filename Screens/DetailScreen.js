import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DetailScreen = ({ route }) => {
  const { data } = route.params; // Get the data passed from LocationCard

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Details</Text>
      <Text style={styles.detailText}>Author: {data.author}</Text>
      <Text style={styles.detailText}>Guesses: {data.guesses}</Text>
      <Text style={styles.detailText}>Correct Ratio: {data.correctRatio}</Text>
      <Text style={styles.detailText}>Average Distance Off By: {data.averageDistanceOffBy}</Text>
      <Text style={styles.detailText}>Published on: {data.timePublished}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  detailText: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default DetailScreen;
