import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import {
    Button,
    StyleSheet,
    View,
    FlatList,
    Text,
    Image,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    Switch
} from 'react-native';
import {useEffect, useState} from 'react';
import {NavigationContainer, useIsFocused} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Auth from './API.js'
import './global.js'

import {Ionicons, MaterialIcons} from "@expo/vector-icons";
import {Search} from "./src/Search";
import {Settings} from "./src/Settings"
import {AccountScreen} from "./src/Account.js"
import {Login} from "./src/Login.js"
// import {styles} from './style/style.js'
import {Home} from "./src/Home.js"

WebBrowser.maybeCompleteAuthSession();

const API = new Auth();

// const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({route}) => ({
                    tabBarIcon: ({focused, color, size}) => {
                        if (route.name === 'Home') {
                            return (
                                <Ionicons
                                    name={focused ? 'ios-information-circle' : 'ios-information-circle-outline'}
                                    size={size}
                                    color={color}
                                />);
                        } else if (route.name === 'Account') {
                            return (
                                <Ionicons
                                name={'person-outline'}
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
                        } else if (route.name === 'Settings') {
                            return (
                                <Ionicons
                                name={'settings-outline'}
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
                <Tab.Screen name="Home" component={Home} initialParams={{api: API}}/>
                <Tab.Screen name="Account" component={AccountScreen} initialParams={{api: API}}/>
                <Tab.Screen name="Settings" component={Settings} initialParams={{api: API}}/>
                <Tab.Screen name="Search" component={Search} initialParams={{api: API}}/>
            </Tab.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    settingsSwitch: {
        flexDirection: "row",
        // alignSelf: "center",
        marginTop: 32,
        // flexDirection: "row",
        // justifyContent: "flex-end"
    },
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
    containerButton: {
        marginTop: 200,
        margin: 10
    },
    button: {
        borderRadius: 10,
        padding: 10,
        backgroundColor: '#FF4500',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 23,
        top: '-10%',
        color: 'white',
        fontWeight: 'bold',
    },
});