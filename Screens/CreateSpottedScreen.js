import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const CreateSpottedScreen = ({ navigation }) => {
  const [author, setAuthor] = useState('');
  const [guesses, setGuesses] = useState('');
  const [correctRatio, setCorrectRatio] = useState('');
  const [averageDistanceOffBy, setAverageDistanceOffBy] = useState('');
  const [timePublished, setTimePublished] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleCreateSpotted = () => {
    // Placeholder for form submission logic to connect with the backend
    console.log('Creating Spotted with:', {
      author,
      guesses,
      correctRatio,
      averageDistanceOffBy,
      timePublished,
      imageUrl,
    });
    navigation.goBack(); // Navigate back to the previous screen after creation
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create a New Spotted</Text>
      <TextInput
        placeholder="Author"
        value={author}
        onChangeText={setAuthor}
        style={styles.input}
      />
      <TextInput
        placeholder="Guesses"
        value={guesses}
        onChangeText={setGuesses}
        style={styles.input}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Correct Ratio"
        value={correctRatio}
        onChangeText={setCorrectRatio}
        style={styles.input}
      />
      <TextInput
        placeholder="Average Distance Off By"
        value={averageDistanceOffBy}
        onChangeText={setAverageDistanceOffBy}
        style={styles.input}
      />
      <TextInput
        placeholder="Time Published"
        value={timePublished}
        onChangeText={setTimePublished}
        style={styles.input}
      />
      <TextInput
        placeholder="Image URL"
        value={imageUrl}
        onChangeText={setImageUrl}
        style={styles.input}
      />
      <Button title="Create Spotted" onPress={handleCreateSpotted} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
});

export default CreateSpottedScreen;
