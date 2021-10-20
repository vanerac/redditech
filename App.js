import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import { Button, StyleSheet, View } from 'react-native';

WebBrowser.maybeCompleteAuthSession();

// Endpoint
const discovery = {
  authorizationEndpoint: 'https://www.reddit.com/api/v1/authorize.compact',
  tokenEndpoint: 'https://www.reddit.com/api/v1/access_token',
};

export default function App() {
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
      console.log(`your code -> ${code}`)
    }
  }, [response]);

  return (
    <View style={styles.container}>
      <Button
        disabled={!request}
        title="Login"
        onPress={() => {
          promptAsync();
        }}
      />
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
