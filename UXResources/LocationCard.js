import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Animated, Easing, StyleSheet } from 'react-native';
import AnimatedButton from './animatedButton'; // Importing the AnimatedButton

const LocationCard = ({ data, isExpanded, onPress, isDarkMode, navigation }) => { // Add navigation prop
  const [cardHeight] = useState(new Animated.Value(isExpanded ? 300 : 110)); // Adjust initial height based on expanded state
  const [cardColor] = useState(new Animated.Value(isExpanded ? 1 : 0)); // Adjust initial color based on expanded state

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(cardHeight, {
        toValue: isExpanded ? 300 : 110, // Expand to 300px or collapse to 110px
        duration: 600,
        easing: Easing.out(Easing.quad),
        useNativeDriver: false,
      }),
      Animated.timing(cardColor, {
        toValue: isExpanded ? 1 : 0, // Toggle color based on expansion
        duration: 1000,
        useNativeDriver: false,
      }),
    ]).start();
  }, [isExpanded]);

  const cardBackgroundColor = cardColor.interpolate({
    inputRange: [0, 1],
    outputRange: ['#d9d9d9', '#3399ff'], 
  });

  const textColor = isDarkMode ? 'white' : 'black';

  const handleButtonPress = () => {
    // Navigate to the DetailScreen and pass the data as params
    navigation.navigate('Detail', { data });
  };

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <Animated.View style={[styles.card, { height: cardHeight, backgroundColor: cardBackgroundColor }]}>
        {/* Main Card */}
        <View style={styles.mainCardContent}>
          <View style={styles.textContainer}>
            <Text style={[styles.mainText, { color: textColor }]}>
              Author: {data.author}
            </Text>
            <Text style={[styles.expandedText, { color: textColor }]}>
              Published on: {data.timePublished}
            </Text>
            <Text style={[styles.mainText, { color: textColor }]}>
              Guesses: {data.guesses}
            </Text>
          </View>
        </View>

        {/* Expanded Section */}
        {isExpanded && (
          <View style={styles.expandedSection}>
            <Text style={[styles.expandedText, { color: textColor }]}>
              Correct Ratio: {data.correctRatio}
            </Text>
            <Text style={[styles.expandedText, { color: textColor }]}>
              Average Distance Off: {data.averageDistanceOffBy}
            </Text>

            {/* Animated Button */}
            <View style={styles.buttonContainer}>
              <AnimatedButton onPress={handleButtonPress} />
            </View>
          </View>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 25,
    marginVertical: 10,
    overflow: 'hidden',
    elevation: 3,
  },
  mainCardContent: {
    flexDirection: 'column',
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    alignItems: 'center',
  },
  mainText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  expandedSection: {
    padding: 16,
    borderRadius: 20,
  },
  expandedText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
});

export default LocationCard;
