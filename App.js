import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LocationCard from './UXResources/LocationCard';
import DetailScreen from './Screens/DetailScreen';
import CreateSpottedScreen from './Screens/CreateSpottedScreen';
import spottedMockData from './data/mockData';
import SignInScreen from './Screens/SignInScreen';
import SignUpScreen from './Screens/SignUpScreen';
import { Amplify, Auth} from 'aws-amplify'
import { REACT_APP_COGNITO_REGION, REACT_APP_USERPOOL_ID, REACT_APP_WEBCLIENT_ID, 
  REACT_APP_IDENTITY_POOL_ID, REACT_APP_BUCKET, REACT_APP_BUCKET_REGION , 
  REACT_APP_COGNITO_DOMAIN , REACT_APP_REDIRECT_SIGN_IN , REACT_APP_REDIRECT_SIGN_OUT} from '@env';
  


  console.log("COGNITO REGION:", REACT_APP_COGNITO_REGION);
console.log("USER POOL ID:", REACT_APP_USERPOOL_ID);
console.log("WEB CLIENT ID:", REACT_APP_WEBCLIENT_ID);
console.log("IDENTITY POOL ID:", REACT_APP_IDENTITY_POOL_ID);
console.log("S3 BUCKET:", REACT_APP_BUCKET);
console.log("S3 REGION:", REACT_APP_BUCKET_REGION);
console.log("OAuth Domain:", REACT_APP_COGNITO_DOMAIN);
console.log("OAuth Redirect SignIn:", REACT_APP_REDIRECT_SIGN_IN);
console.log("OAuth Redirect SignOut:", REACT_APP_REDIRECT_SIGN_OUT);


Amplify.configure({
  Auth: {
    region: REACT_APP_COGNITO_REGION,
    userPoolId: REACT_APP_USERPOOL_ID,
    userPoolWebClientId: REACT_APP_WEBCLIENT_ID,
    identityPoolId: REACT_APP_IDENTITY_POOL_ID,
    // Remove oauth if not in use
  },
});



const Stack = createStackNavigator();

const HomeScreen = ({ navigation }) => {
  const [expandedCardId, setExpandedCardId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedCardId(expandedCardId === id ? null : id);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {spottedMockData.map((dataItem, index) => (
          <LocationCard
            key={index}
            data={dataItem}
            isExpanded={expandedCardId === index}
            onPress={() => toggleExpand(index)}
            navigation={navigation}
          />
        ))}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button 
          title="Create Spotted" 
          onPress={() => navigation.navigate('Create a New Spotted')}
        />
      </View>
    </View>
  );
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      await Auth.currentAuthenticatedUser();
      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isAuthenticated ? (
          <>
            <Stack.Screen name="Spotted" component={HomeScreen} />
            <Stack.Screen name="Detail" component={DetailScreen} />
            <Stack.Screen name="Create a New Spotted" component={CreateSpottedScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Sign In" component={SignInScreen} />
            <Stack.Screen name="Sign Up" component={SignUpScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
});

export default App;
