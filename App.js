import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import { Button, StyleSheet, View, FlatList, Text } from 'react-native';
import { useEffect, useState } from 'react';
// import { useHistory } from "react-router-dom";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getAccessToken } from './API.js'
import { APIrequest } from './API.js'
import './global.js'

WebBrowser.maybeCompleteAuthSession();

const url = {
  authorizationEndpoint: 'https://www.reddit.com/api/v1/authorize.compact',
  tokenEndpoint: 'https://www.reddit.com/api/v1/access_token',
};

function Login({ navigation }) {
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: 'e3t0ixFSw5lrApAqVPrGMA',
      scopes: ['identity'],
      redirectUri: makeRedirectUri({
        native: 'myapp://redirect',
      }),
    },
    url
  );
  if (request != null) {
    console.log(request.url);
    console.log(request.redirectUri)
  }
  React.useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params;
      global.authCode = code
      console.log(`your code -> ${global.authCode}`)
      getAccessToken(global.authCode);
      navigation.navigate('Home', {
        resCode: global.authCode,
      })
    }
  }, [response]);

  return (
    <View style={styles.container}>
      <Button
        title="Login"
        onPress={() => {promptAsync()}}
      />
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

function HomeScreen({ route, navigation }) {
  const { resCode } = route.params;

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>
        Welcome to the Home Screen ! {"\n"}
        Here is yout Auth code : {JSON.stringify(resCode)}
      </Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

function DetailsScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}