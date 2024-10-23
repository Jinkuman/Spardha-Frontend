import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View, Animated } from 'react-native';

const AnimatedButton = ({ onPress }) => {
  const animatedValue = new Animated.Value(0);

  const animate = () => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start(() => {
      animatedValue.setValue(0);
      onPress();
    });
  };

  const buttonStyle = {
    transform: [
      {
        translateY: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -100],
        }),
      },
    ],
  };

  const textColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#000', '#fff'],
  });

  return (
    <TouchableOpacity style={styles.button} onPress={animate}>
      <View style={styles.buttonInner}>
        <Animated.Text style={[styles.buttonText, { color: textColor }]}>
          View Picture
        </Animated.Text>
      </View>
      <Animated.View style={[styles.animatedEffect, buttonStyle]} />
      <Animated.View style={[styles.animatedEffect2, buttonStyle]} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 99,
    borderWidth: 2,
    overflow: 'hidden',
    paddingVertical: 12,
    paddingHorizontal: 10,
    position: 'relative',
    backgroundColor: '#000',
    width: '70%',
  },
  buttonInner: {
    zIndex: 1,
    alignItems: 'center'
  },
  buttonText: {
    fontWeight: '900',
    textTransform: 'uppercase',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center'
  },
  animatedEffect: {
    backgroundColor: '#fff',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
    transform: [{ translateY: 100 }],
    transition: 'transform 0.2s ease',
  },
  animatedEffect2: {
    backgroundColor: '#fff',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -2,
    transform: [{ translateY: -100 }],
    transition: 'transform 0.2s ease',
  },
});

export default AnimatedButton;
