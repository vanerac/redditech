import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import {makeRedirectUri, useAuthRequest} from 'expo-auth-session';
import {Button, StyleSheet, View, FlatList, Text} from 'react-native';
import {useEffect, useState} from 'react';
// import { useHistory } from "react-router-dom";
import {NavigationContainer, useIsFocused} from '@react-navigation/native';
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
            api.getAccessToken(code).then((token) => {navigation.navigate('Home')})
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
            </Text>
        </View>
    );
}

// class AccountScreen extends React.Component {

//     constructor(props) {
//         super(props);
//         this.state = {data: []};
//     }

//     componentDidMount() {
//         api.makeRequest('me').then(data => {
//             console.log(data)
//         })
//     }

//     render() {
//         return <Text>Bonjour, {this.props.data.name}</Text>;
//       }
// }

function AccountScreen({route}) {
    const [data, setData] = useState([]);
    const {api} = route.params;

    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused)
            api.makeRequest('me').then(data => {
            setData(data)
        })
    },[isFocused]);
    // setData
    // console.log('updqte');
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Settings! ${data.name}</Text>
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
                <Tab.Screen name="Account" component={AccountScreen} initialParams={{api: API}}/>
            </Tab.Navigator>
        </NavigationContainer>
    );
}