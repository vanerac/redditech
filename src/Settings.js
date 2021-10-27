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

// boolean problem + style in another file

export function Settings({route, navigation}) {
    const {api} = route.params;
    const [data, setData] = useState({})
    const isFocused = useIsFocused();
    console.log("repasse dedans")

    useEffect(() => {
        if (isFocused)
            api.makeRequest('https://oauth.reddit.com/api/v1/me/prefs').then(data => {
                setData(data)
                // setDescription(data.subreddit.public_description)
                // console.log(data.subreddit.public_description)
                // console.log(test.public_description);
                // console.log(data)
        })
    }, [isFocused]);
    // email_private_message
    // email_chat_request
    // email_user_new_follower
    // email_comment_reply
    // email_username_mention
    // email_post_reply
    console.log(`here => `, typeof data.email_comment_reply)

    const [isEnabledPM, setIsEnabledPM] = useState(data.email_private_message);
    const [isEnabledCR, setIsEnabledCR] = useState(data.email_chat_request);
    const [isEnabledUSF, setIsEnabledUSF] = useState(data.email_user_new_follower);
    const [isEnabledCRY, setIsEnabledCRY] = useState(data.email_comment_reply);
    const [isEnabledUM, setIsEnabledUM] = useState(data.email_username_mention);
    const [isEnabledPR, setIsEnabledPR] = useState(data.email_post_reply);

    // if (data.email_private_message == true)
    //     setIsEnabledPM(true)
    // else
    //     setIsEnabledPM(false)

    console.log(`la ->`, isEnabledCRY)

    const toggleSwitchPM = () => {
        setIsEnabledPM(previousState => !previousState)
        console.log("setIsEnabledPM")
    };

    const toggleSwitchCR = () => {
        setIsEnabledCR(previousState => !previousState)
        console.log("setIsEnabledCR")
    };

    const toggleSwitchUSF = () => {
        setIsEnabledUSF(previousState => !previousState)
        console.log("setIsEnabledUSF")
    };

    const toggleSwitchCRY = () => {
        setIsEnabledCRY(previousState => !previousState)
        console.log("setIsEnabledCRY")
    };

    const toggleSwitchdUM = () => {
        setIsEnabledUM(previousState => !previousState)
        console.log("setIsEnabledUM")
    };

    const toggleSwitchPR = () => {
        setIsEnabledPR(previousState => !previousState)
        console.log("setIsEnabledPR")
    };

  return (
    <SafeAreaView>
        <View style={styles.settingsSwitch}>
            <Text style={[styles.text, {fontWeight: "200", fontSize: 24, marginLeft: 10}]}>Email alert private message</Text>
                <View style={styles.statsBox}>
                    <Switch
                        trackColor={{ false: "#767577", true: "#ff4500" }}
                        thumbColor={isEnabledPM ? "#f4f3f4" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitchPM}
                        value={isEnabledPM}
                    />
                </View>
        </View>
        <View
            style={{
                borderBottomColor: 'black',
                borderBottomWidth: 1,
                margin: 15
            }}
        />
        <View style={styles.settingsSwitch}>
            <Text style={[styles.text, {fontWeight: "200", fontSize: 24, marginLeft: 10}]}>Email alert chat request</Text>
                <View style={styles.statsBox}>
                    <Switch
                        trackColor={{ false: "#767577", true: "#ff4500" }}
                        thumbColor={isEnabledCR ? "#f4f3f4" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitchCR}
                        value={isEnabledCR}
                    />
                </View>
        </View>
        <View
            style={{
                borderBottomColor: 'black',
                borderBottomWidth: 1,
                margin: 15
            }}
        />
        <View style={styles.settingsSwitch}>
            <Text style={[styles.text, {fontWeight: "200", fontSize: 24, marginLeft: 10}]}>Email alert new follower</Text>
                <View style={styles.statsBox}>
                    <Switch
                        trackColor={{ false: "#767577", true: "#ff4500" }}
                        thumbColor={isEnabledUSF ? "#f4f3f4" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitchUSF}
                        value={isEnabledUSF}
                    />
                </View>
        </View>
        <View
            style={{
                borderBottomColor: 'black',
                borderBottomWidth: 1,
                margin: 15
            }}
        />
        <View style={styles.settingsSwitch}>
            <Text style={[styles.text, {fontWeight: "200", fontSize: 24, marginLeft: 10}]}>Email alert comment reply</Text>
            <View style={styles.statsBox}>
                <Switch
                        trackColor={{ false: "#767577", true: "#ff4500" }}
                        thumbColor={isEnabledCRY ? "#f4f3f4" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitchCRY}
                        value={isEnabledCRY}
                    />
                </View>
        </View>
        <View
            style={{
                borderBottomColor: 'black',
                borderBottomWidth: 1,
                margin: 15
            }}
        />
        <View style={styles.settingsSwitch}>
            <Text style={[styles.text, {fontWeight: "200", fontSize: 24, marginLeft: 10}]}>Email alert user mention</Text>
            <View style={styles.statsBox}>
                <Switch
                        trackColor={{ false: "#767577", true: "#ff4500" }}
                        thumbColor={isEnabledUM ? "#f4f3f4" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitchdUM}
                        value={isEnabledUM}
                    />
                </View>
        </View>
        <View
            style={{
                borderBottomColor: 'black',
                borderBottomWidth: 1,
                margin: 15
            }}
        />
        <View style={styles.settingsSwitch}>
            <Text style={[styles.text, {fontWeight: "200", fontSize: 24, marginLeft: 10}]}>Email alert post reply</Text>
            <View style={styles.statsBox}>
                <Switch
                        trackColor={{ false: "#767577", true: "#ff4500" }}
                        thumbColor={isEnabledPR ? "#f4f3f4" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitchPR}
                        value={isEnabledPR}
                    />
                </View>
        </View>
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