import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import {makeRedirectUri, useAuthRequest} from 'expo-auth-session';
import {Button, StyleSheet, View, FlatList, Text} from 'react-native';
import {useEffect, useState} from 'react';
// import { useHistory } from "react-router-dom";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Auth from './API.js'
import './global.js'
import {SearchBar} from 'react-native-elements';
import {Searchbar} from 'react-native-paper';

WebBrowser.maybeCompleteAuthSession();

const API = new Auth();

const url = {
    authorizationEndpoint: 'https://www.reddit.com/api/v1/authorize.compact',
    tokenEndpoint: 'https://www.reddit.com/api/v1/access_token',
};

function Login({route, navigation}) {
    const {api} = route.params;
    // console.log(api, Auth)
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

    useEffect(() => {
        if (response?.type === 'success') {
            const {code} = response.params;
            api.getAccessToken(code).then((token) => {
                api.makeRequest('me').then((data) => {
                    console.log(data);
                    navigation.navigate('Home')
                })

            })

        }
    }, [response]);

    return (
        <View style={styles.container}>
            <Button
                title="Login"
                onPress={() => {
                    promptAsync()
                }}
            />
        </View>
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

function HomeScreen({route, navigation}) {
    // const { resCode } = route.params;
    // console.log(`global.authCode -> ${global.authCode}`)
    // console.log(`global.accessToken -> ${global.accessToken}`)

    // var oui = getAccessToken(global.authCode);
    // const promise1 = Promise.resolve(oui);
    // all >>>>>>> promise
    // promise1.then((value) => {
    //   console.log(value);
    // });

    const [searchQuery, setSearchQuery] = React.useState('');

    const onChangeSearch = query => setSearchQuery(query);
    console.log(searchQuery)

    return (
        <View>
            <Searchbar
                placeholder="Search"
                onChangeText={onChangeSearch}
                value={searchQuery}
            />
            <Text>
                Welcome to the Home Screen !
            </Text>
            <Button
                title="Go to Settings"
                onPress={() => navigation.navigate('Settings')}
            />
        </View>
    );
}

function SettingsScreen() {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Settings!</Text>
        </View>
    );
}

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {

    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Login" component={Login} initialParams={{api: API}}/>
                <Tab.Screen name="Home" component={HomeScreen} initialParams={{api: API}}/>
                <Tab.Screen name="Settings" component={SettingsScreen}/>
            </Tab.Navigator>
        </NavigationContainer>
    );
}