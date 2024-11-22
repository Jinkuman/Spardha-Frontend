import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AnimatedButton from './animatedButton';

const screenWidth = Dimensions.get('window').width;

const LocationCard = ({ data, navigation }) => {
  const textColor = 'white';

  const handleButtonPress = async () => {
    try {
      const response = await fetch(`https://9tdvht8x68.execute-api.us-east-2.amazonaws.com/prod/spotted?id=${data.id}`);
      const fetchedData = await response.json();
      navigation.navigate('Detail', { data: fetchedData });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={[styles.mainText, { color: textColor }]}>{data.author}</Text>
        <Image source={{ uri: data.imageUrl }} style={styles.image} />

        <AnimatedButton title={"Guess Location"} onPress={handleButtonPress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    marginVertical: 20,
    backgroundColor: '#3c3d3d', 
    padding: 16,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 6.27,
    width: screenWidth * 0.9,
    alignSelf: 'center',
  },
  cardContent: {
    marginTop: 0,
    alignItems: 'center',
  },
  mainText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
    color: '#E0BBE4', // Light purple text color
  },
  guessButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8d42f5',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginTop: 10,
  },
  guessButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
  buttonContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 220,
    resizeMode: 'cover',
    borderRadius: 15,
    borderWidth: 2,
  },
});

export default LocationCard;