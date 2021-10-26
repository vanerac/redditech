import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import {makeRedirectUri, useAuthRequest} from 'expo-auth-session';
import {Button, StyleSheet, View, FlatList, Text, Image, TouchableOpacity, SafeAreaView, ScrollView} from 'react-native';
import {useEffect, useState} from 'react';
import {NavigationContainer, useIsFocused} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Auth from './API.js'
import './global.js'
import {SearchBar} from 'react-native-elements';
import {Searchbar} from 'react-native-paper';
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

WebBrowser.maybeCompleteAuthSession();

const API = new Auth();

const url = {
    authorizationEndpoint: 'https://www.reddit.com/api/v1/authorize.compact',
    tokenEndpoint: 'https://www.reddit.com/api/v1/access_token',
};

function Login({route, navigation}) {
    const {api} = route.params;
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
        <SafeAreaView>
            <View style={styles.logo}>
                <Image
                    source={require('./assets/reddit_logo.png')}
                    />
            </View>
            <View style={styles.containerButton}>
                <TouchableOpacity style={styles.button} onPress={() =>
                    promptAsync()
                }>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

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

function AccountScreen({route}) {
    const [data, setData] = useState({
        "icon_img": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Solid_white.svg/2048px-Solid_white.svg.png"
    });
    const {api} = route.params;

    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused)
            api.makeRequest('me').then(data => {
            setData(data)
        })
    },[isFocused]);
    // setData
    console.log(data);
    console.log(data.subscribers)
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ alignSelf: "center" }}>
                    <View style={styles.profileImage}>
                        <Image source={{uri: data.icon_img.replace(/&amp;/g, "&")}} style={styles.image} resizeMode="cover"></Image>
                    </View>
                    <View style={styles.active}></View>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>{data.name}</Text>
                    <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>Reddit</Text>
                </View>
                <View style={styles.statsContainer}>
                    <View style={styles.statsBox}>
                        <Text style={[styles.text, { fontSize: 24 }]}>{data.coins}</Text>
                        <Text style={[styles.text, styles.subText]}>Coins</Text>
                    </View>
                    <View style={[styles.statsBox, { borderColor: "#DFD8C8", borderLeftWidth: 1, borderRightWidth: 1 }]}>
                        <Text style={[styles.text, { fontSize: 24 }]}>{data.total_karma}</Text>
                        <Text style={[styles.text, styles.subText]}>Karma</Text>
                    </View>
                    <View style={styles.statsBox}>
                        <Text style={[styles.text, { fontSize: 24 }]}>{data.num_friends}</Text>
                        <Text style={[styles.text, styles.subText]}>Friends</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {

    return (
        <NavigationContainer>
            <Tab.Navigator
                  screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        if (route.name === 'Home') {
                            return (
                                <Ionicons
                                    name={ focused ? 'ios-information-circle' : 'ios-information-circle-outline'}
                                    size={size}
                                    color={color}
                                />);
                        } else if (route.name === 'Account') {
                            return (
                                <Ionicons
                                name={'ios-list'}
                                size={size}
                                color={color}
                                />);
                        } else if (route.name === 'Login') {
                            return (
                                <Ionicons
                                name={'log-in-outline'}
                                size={size}
                                color={color}
                                />);
                        }
                    },
                    tabBarInactiveTintColor: 'gray',
                    tabBarActiveTintColor: 'tomato',
                  })}
                >
                <Tab.Screen name="Login" component={Login} initialParams={{api: API}}/>
                <Tab.Screen name="Home" component={HomeScreen} initialParams={{api: API}}/>
                <Tab.Screen name="Account" component={AccountScreen} initialParams={{api: API}}/>
            </Tab.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    logo: {
        marginTop: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: "#FFF"
    },
    text: {
        fontFamily: "HelveticaNeue",
        color: "#52575D"
    },
    image: {
        flex: 1,
        height: undefined,
        width: undefined
    },
    profileImage: {
        width: 200,
        height: 200,
        borderRadius: 100,
        overflow: "hidden"
    },
    active: {
        backgroundColor: "#34FFB9",
        position: "absolute",
        bottom: 28,
        left: 10,
        padding: 4,
        height: 20,
        width: 20,
        borderRadius: 10
    },
    infoContainer: {
        alignSelf: "center",
        alignItems: "center",
        marginTop: 16
    },
    statsContainer: {
        flexDirection: "row",
        alignSelf: "center",
        marginTop: 32
    },
    statsBox: {
        alignItems: "center",
        flex: 1
    },
    button: {
        width: 300,
        height: 300,
    },
    containerButton:{
        marginTop: 200,
        margin: 10
    },
    button:{
        borderRadius: 10,
        padding: 10,
        backgroundColor: '#FF4500',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText:{
        fontSize: 23,
        top:  '-10%',
        color: 'white',
        fontWeight: 'bold',
    },
});