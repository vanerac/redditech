import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import { Button, StyleSheet, View, FlatList, Text } from 'react-native';
import { useEffect, useState } from 'react';
// import { useHistory } from "react-router-dom";
import { encode } from "base-64"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

WebBrowser.maybeCompleteAuthSession();

const discovery = {
  authorizationEndpoint: 'https://www.reddit.com/api/v1/authorize.compact',
  tokenEndpoint: 'https://www.reddit.com/api/v1/access_token',
};

const getAccessToken = (responseCode) => {
  var formData = new FormData();
  formData.append("grant_type", "authorization_code");
  formData.append("code", responseCode);
  formData.append("redirect_uri", "exp://127.0.0.1:19000");
  
  fetch('https://www.reddit.com/api/v1/access_token', {
    method: 'POST',
    headers: {"Authorization": `Basic ${encode("e3t0ixFSw5lrApAqVPrGMA" + ':')}`},
    body: formData})
    .then(response => response.json().then(data => {
      // setData(data)
      // console.log(data.access_token)
      console.log(data)
    }))
    .catch((error) => {
      console.error(error);
    });
};


function Login({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  // const [responseCode, setCode] = useState(String);

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: 'e3t0ixFSw5lrApAqVPrGMA',
      scopes: ['identity'],
      redirectUri: makeRedirectUri({
        native: 'myapp://redirect',
      }),
    },
    discovery
  );
  if (request != null) {
    console.log(request.url);
    console.log(request.redirectUri)
  }
  React.useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params;
      // setCode(response.params);
      console.log(`your code -> ${code}`)
      // console.log(`your responseCode -> ${responseCode}`)
      getAccessToken(code);
      console.log(data);
      navigation.navigate('Home', {
        resCode: code,
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

// export default App;