import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, ScrollView, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AnimatedButton from './UXResources/animatedButton';
import ChallengeDetailsScreen from './Screens/ChallengeDetailsScreen';

const mockActiveChallenges = [
    {
      id: 1,
      title: 'Challenge 1',
      description: 'This is the first challenge.',
      expirationDate: '2024-07-01',
      author: 'John Doe',
      place: '1st',
      stocks: {
        AAPL: 10,
        TSLA: 5,
      },
    },
    {
      id: 2,
      title: 'Challenge 2',
      description: 'This is the second challenge.',
      expirationDate: '2024-07-10',
      author: 'Jane Smith',
      place: '2nd',
      stocks: {
        AMZN: 3,
        MSFT: 8,
      },
    },
    {
      id: 3,
      title: 'Challenge 3',
      description: 'This is the third challenge.',
      expirationDate: '2024-07-15',
      author: 'Alice Johnson',
      place: '3rd',
      stocks: {
        GOOGL: 15,
        FB: 12,
      },
    },
  ];

const mockPreviousChallenges = [
  { id: 4, title: 'Challenge 4', description: 'This is the fourth challenge.', expirationDate: '2022-05-01', author: 'John Doe', place: '1st' },
  { id: 5, title: 'Challenge 5', description: 'This is the fifth challenge.', expirationDate: '2021-07-10', author: 'Jane Smith', place: '2nd' },
  { id: 6, title: 'Challenge 6', description: 'This is the sixth challenge.', expirationDate: '2010-07-15', author: 'Alice Johnson', place: '3rd' },
];


const Stack = createNativeStackNavigator();

const HomeScreen = ({ navigation }) => {
  const [expandedCard, setExpandedCard] = useState(null);

  const toggleExpand = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  const handleButtonClick = (challenge) => {
    navigation.navigate('ChallengeDetails', { challenge });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Active Challenges</Text>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {mockActiveChallenges.map((challenge) => (
          <TouchableOpacity key={challenge.id} onPress={() => toggleExpand(challenge.id)} style={styles.card}>
            <View style={styles.cardContent}>
              <View style={styles.textContainer}>
                <Text style={styles.cardTitle}>{challenge.title}</Text>
                <Text style={styles.cardDescription}>{challenge.description}</Text>
                {expandedCard === challenge.id && (
                  <View style={styles.expandedInfo}>
                    <Text style={styles.expandedText}><Text style={styles.bold}>Expiration Date:</Text> {challenge.expirationDate}</Text>
                    <Text style={styles.expandedText}><Text style={styles.bold}>Author:</Text> {challenge.author}</Text>
                    <Text style={styles.expandedText}><Text style={styles.bold}>Place:</Text> {challenge.place}</Text>
                  </View>
                )}
              </View>
              <View style={styles.buttonContainer}>
                <AnimatedButton onPress={() => handleButtonClick(challenge)} />
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text style={styles.header}>Previous Challenges</Text>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {mockPreviousChallenges.map((challenge) => (
          <TouchableOpacity key={challenge.id} onPress={() => toggleExpand(challenge.id)} style={styles.card}>
            <View style={styles.cardContent}>
              <View style={styles.textContainer}>
                <Text style={styles.cardTitle}>{challenge.title}</Text>
                <Text style={styles.cardDescription}>{challenge.description}</Text>
                {expandedCard === challenge.id && (
                  <View style={styles.expandedInfo}>
                    <Text style={styles.expandedText}><Text style={styles.bold}>Expiration Date:</Text> {challenge.expirationDate}</Text>
                    <Text style={styles.expandedText}><Text style={styles.bold}>Author:</Text> {challenge.author}</Text>
                    <Text style={styles.expandedText}><Text style={styles.bold}>Place:</Text> {challenge.place}</Text>
                  </View>
                )}
              </View>
              <View style={styles.buttonContainer}>
                <AnimatedButton onPress={() => handleButtonClick(challenge)} />
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      
      <View style={styles.createButtonContainer}>
        <Button title="Create Challenge" onPress={() => alert('Create Challenge pressed')} />
      </View>
      <StatusBar style="auto" />
    </View>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ChallengeDetails" component={ChallengeDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  scrollView: {
    flexGrow: 1,
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    paddingRight: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  expandedInfo: {
    marginTop: 10,
  },
  expandedText: {
    fontSize: 14,
    color: '#333',
  },
  bold: {
    fontWeight: 'bold',
  },
  buttonContainer: {
    justifyContent: 'center',
  },
  createButtonContainer: {
    marginBottom: 30,
    justifyContent: 'flex-end',
  },
});