import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, Alert, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import AnimatedButton from '../UXResources/animatedButton';

const CreateSpottedScreen = ({ navigation }) => {
    const [hint, setHint] = useState('');
    const [imageUrl, setImageUrl] = useState(null);
    const [location, setLocation] = useState(null);
    const [region, setRegion] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setImageUrl(result.assets[0].uri);
        }
    };

    const takePhoto = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, we need camera permissions to make this work!');
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setImageUrl(result.assets[0].uri);
        }
    };

    const deleteImage = () => {
        Alert.alert(
            "Delete Image",
            "Are you sure you want to delete this image?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Delete", onPress: () => setImageUrl(null), style: "destructive" },
            ]
        );
    };

    const handleCreateSpotted = async () => {
        if (imageUrl == null) {
          Alert.alert("Select an Image!", "You need to select an image for your spotted!", [{ text: "Okay", style: "cancel" }]);
          return;
        }
        
        if (location == null) {
          Alert.alert("Select a Location!", "You need to select a location for your spotted!", [{ text: "Okay", style: "cancel" }]);
          return;
        }
        
        const spottedData = {
          id: new Date().getTime().toString(),
          author: "Ajinkya Dhamdhere",
          hint: hint,
          location: location,
          timePublished: new Date().toISOString(),
          averageDistanceOffBy: "N/A",
          imageUrl: imageUrl,
        };
        
        console.log('Attempting to create spotted with data:', spottedData); // Log data to be sent
        try {
          const response = await fetch('https://9tdvht8x68.execute-api.us-east-2.amazonaws.com/prod/spotted', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(spottedData),
          });
          
          console.log('Fetch response:', response); // Log the raw response
      
          if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
          }
      
          const result = await response.json();
          console.log('Spotted created successfully:', result);
      
          Alert.alert("Success", "Spotted created successfully!", [{ text: "OK", onPress: () => navigation.goBack() }]);
        } catch (error) {
          console.error('Error creating spotted:', error); // Log the error to diagnose issues
          Alert.alert("Error", "Failed to create spotted. Please try again.");
        }
      };
      

    const handleSelectLocation = (coordinate) => {
        setLocation(coordinate);
    };

    const getCurrentLocation = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            alert('Permission to access location was denied');
            return;
        }

        const userLocation = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = userLocation.coords;

        setLocation({ latitude, longitude });
        setRegion({
            latitude,
            longitude,
            latitudeDelta: 0.01, // Set zoom level
            longitudeDelta: 0.01,
        });
    };

    return (
        <View style={styles.container}>
            <ScrollView>
                <TextInput
                    placeholder="Hint (max 100 characters)"
                    value={hint}
                    onChangeText={setHint}
                    style={styles.input}
                    maxLength={100}
                />
                <Text style={styles.charCount}>{100 - hint.length} characters remaining</Text>

                {/* Image Picker and Camera Buttons */}
                <View style={styles.buttonRow}>
                    <View style={styles.buttonWrapper}>
                        <Button title="Pick an Image" onPress={pickImage} />
                    </View>

                    {imageUrl && (
                        <View style={styles.buttonWrapper}>
                            <Button title="Delete Image" onPress={deleteImage} color="red" />
                        </View>
                    )}

                    <View style={styles.buttonWrapper}>
                        <Button title="Take a Photo" onPress={takePhoto} />
                    </View>
                </View>

                {/* Image Preview */}
                {imageUrl && (
                    <View>
                        <Image source={{ uri: imageUrl }} style={styles.image} />
                    </View>
                )}

                {/* Map View */}
                <Text style={styles.subtitle}>Select Location</Text>
                <MapView
                    style={styles.map}
                    region={region}
                    onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
                    onPress={(e) => handleSelectLocation(e.nativeEvent.coordinate)}
                >
                    {location && <Marker coordinate={location} />}
                </MapView>

                <View style={styles.buttonCenter}>
                    <Button title="Use Current Location" onPress={getCurrentLocation} />
                </View>

                {location && (
                    <Text style={styles.locationText}>
                        Selected Location: {location.latitude.toFixed(5)}, {location.longitude.toFixed(5)}
                    </Text>
                )}
            </ScrollView>

            {/* Create Spotted Button at the Bottom */}
            <View style={styles.bottomButton}>
                <AnimatedButton title="Create Spotted" onPress={handleCreateSpotted} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        justifyContent: 'center',
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 5,
        borderRadius: 5,
    },
    charCount: {
        fontSize: 12,
        color: '#666',
        marginBottom: 5,
        textAlign: 'right',
    },
    buttonCenter: {
        justifyContent: 'center'
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 0,
    },
    buttonWrapper: {
        flex: 1, // Each button takes up 1/3 of the row
        marginHorizontal: 5, // Small space between buttons
    },
    image: {
        width: '100%',
        height: 200,
        marginTop: 5,
        marginBottom: 0,
        borderRadius: 10,
    },
    locationText: {
        fontSize: 14,
        color: '#666',
        marginTop: 5,
        textAlign: 'center',
    },
    map: {
        width: '100%',
        height: 225,
        borderRadius: 10,
        marginVertical: 10,
    },
    bottomButton: {
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
        alignItems: 'center',
    },
});

export default CreateSpottedScreen;