import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const DetailScreen = ({ route }) => {
  const { data } = route.params;

  // Fallbacks for missing data properties
  const author = data?.author || 'Unknown Author';
  const guesses = data?.guesses || 'N/A';
  const correctRatio = data?.correctRatio || 'N/A';
  const averageDistanceOffBy = data?.averageDistanceOffBy || 'N/A';
  const timePublished = data?.timePublished || 'Time not available';
  const imageUrl = data?.imageUrl || 'https://example.com/default-image.jpg'; // Replace with a placeholder image if needed

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Details for {author}</Text>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <Text style={styles.info}>Guesses: {guesses}</Text>
      <Text style={styles.info}>Correct Ratio: {correctRatio}</Text>
      <Text style={styles.info}>Average Distance Off By: {averageDistanceOffBy}</Text>
      <Text style={styles.info}>Published Time: {timePublished}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    marginBottom: 5,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginTop: 15,
    borderRadius: 10,
  },
});

export default DetailScreen;
