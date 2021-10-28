import * as React from 'react';
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

export function AccountScreen({route}) {
    const [data, setData] = useState({
        "icon_img": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Solid_white.svg/2048px-Solid_white.svg.png"
        // "public_description": "tmp"
    });

    const [description, setDescription] = useState();
    const {api} = route.params;

    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused)
            api.makeRequest('https://oauth.reddit.com/api/v1/me').then(data => {
            setData(data)
            setDescription(data.subreddit.public_description)
            // console.log(data.subreddit.public_description)
            // console.log(test.public_description);
        })
    },[isFocused]);
    // setData
    // console.log(`here =>`, data.icon_img);
    // console.log(`here2 =>`, data.public_description);
    // console.log(data)
    // console.log(data.subscribers)
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{alignSelf: "center"}}>
                    <View style={styles.profileImage}>
                        <Image source={{uri: data.icon_img.replace(/&amp;/g, "&")}} style={styles.image}
                               resizeMode="cover"></Image>
                    </View>
                    <View style={styles.active}></View>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={[styles.text, {fontWeight: "200", fontSize: 36}]}>{data.name}</Text>
                    <Text style={[styles.text, {color: "#AEB5BC", fontSize: 14}]}>Reddit</Text>
                </View>
                <View style={styles.statsContainer}>
                    <View style={styles.statsBox}>
                        <Text style={[styles.text, {fontSize: 24}]}>{data.coins}</Text>
                        <Text style={[styles.text, styles.subText]}>Coins</Text>
                    </View>
                    <View style={[styles.statsBox, {borderColor: "#DFD8C8", borderLeftWidth: 1, borderRightWidth: 1}]}>
                        <Text style={[styles.text, {fontSize: 24}]}>{data.total_karma}</Text>
                        <Text style={[styles.text, styles.subText]}>Karma</Text>
                    </View>
                    <View style={styles.statsBox}>
                        <Text style={[styles.text, {fontSize: 24}]}>{data.num_friends}</Text>
                        <Text style={[styles.text, styles.subText]}>Friends</Text>
                    </View>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={[styles.text, { color: "#AEB5BC", fontSize: 20, margin: 20 }]}>Profile Description :</Text>
                    <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>{description}</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
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