import * as React from "react";
import {useEffect, useState} from "react";
import {Image, StyleSheet, Switch, Text, View} from "react-native";
import {useIsFocused} from "@react-navigation/native";

export function SubredditCard(props) {
    const api = props.api
    const data = props.data

    const displayName = data.display_name
    const prefixedName = data.display_name_prefixed

    const post_id = data.name
    const bannerURL = data.banner_img
    const iconURL = data.icon_img
    const headerURL = data.header_img
    const public_desc = data.public_description
    const desc = data.description
    const subscriberCount = data.subscribers
    const createdAt = data.created_utc
    // const is_subed =

    let [is_subed, setSub] = useState(false)
    const isFocused = useIsFocused();

    useEffect(() => {
        setSub(data.user_is_subscriber);
    }, [isFocused])


    async function subscribeTo() {
        let formData = new FormData();
        formData.append('sr', post_id)
        formData.append('action', 'sub')
        const url = 'https://oauth.reddit.com/api/subscribe'
        let res = await fetch(url, {
            method: 'POST',
            headers: {"Authorization": "bearer " + api.access_token},
            "User-agent": "redditech",
            body: formData,
            Accept: 'application/json'
        })
        console.log(await res.text())
        // res = await res.json()
        setSub(!is_subed)

        return res; // surement inutile

    }

    async function unsubscribeTo() {
        let formData = new FormData();
        formData.append('sr', post_id)
        formData.append('action', 'unsub')
        const url = 'https://oauth.reddit.com/api/subscribe'
        let res = await fetch(url, {
            method: 'POST',
            headers: {"Authorization": "bearer " + api.access_token},
            "User-agent": "redditech",
            body: formData
        })

        // res = await res.json()
        setSub(!is_subed)

        return res; // surement inutile
    }

    async function toggleSubscription() {

        if (is_subed) {
            await unsubscribeTo();
        } else {
            await subscribeTo()
        }
    }

    return (
        <View style={styles.card}>
            <Text>
                <Image
                    source={{
                        uri: iconURL || 'https://b.thumbs.redditmedia.com/voAwqXNBDO4JwIODmO4HXXkUJbnVo_mL_bENHeagDNo.png'
                    }}
                    style={{width: 30, height: 30, borderRadius: 30 / 2}}
                />

                <Text style={[styles.text, {fontSize: 15}]}>
                    {prefixedName}
                    {' - '}
                    {subscriberCount}
                    {' Subscribers'}
                    {'test'}
                </Text>
                <Switch
                    trackColor={{false: "#767577", true: "#007bff"}}
                    thumbColor={is_subed ? "#f4f3f4" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSubscription}
                    value={is_subed}
                    style={{width: 30, height: 30}}
                />
            </Text>

            <Text>{public_desc}</Text>
            <View style={{borderBottomColor: 'black', borderBottomWidth: 1, marginRight: 10, marginLeft: 10}}/>
        </View>
    )
}

export function Subreddit({route, navigation}) {

    const {api, data} = route.params
    const displayName = data.display_name
    const prefixedName = data.display_name_prefixed

    const post_id = data.name
    const bannerURL = data.banner_img
    const iconURL = data.icon_img
    const headerURL = data.header_img
    const desc = data.description
    const subscriberCount = data.subscribers
    const createdAt = data.created_utc
    const is_subed = data.user_is_subscriber

    let [isSubbed, setSub] = useState(0);
    setSub(is_subed);

    // const state = {
    //     is_subed: is_subed
    // }
    //
    // setState(state);


    async function subscribeTo() {
        let formData = new FormData();
        formData.append('sr_name', post_id)
        formData.append('action', 'sub')
        const url = 'https://oauth.reddit.com/api/subscribe'
        let res = await fetch(url, {
            method: 'POST',
            headers: {"Authorization": "bearer " + api.access_token},
            "User-agent": "redditech",
            body: formData
        })
        res = await res.json()
        setSub(!is_subed)

        return res; // surement inutile

    }

    async function unsubscribeTo() {
        let formData = new FormData();
        formData.append('sr_name', post_id)
        formData.append('action', 'unsub')
        const url = 'https://oauth.reddit.com/api/subscribe'
        let res = await fetch(url, {
            method: 'POST',
            headers: {"Authorization": "bearer " + api.access_token},
            "User-agent": "redditech",
            body: formData
        })
        res = await res.json()
        setSub(!is_subed)

        return res; // surement inutile
    }

    function changeSort(option) {
        // todo
        //  fetch all subreddit data with sort options
    }

    // componentDidMount() {
    //     // todo fetch display posts
    //     //  https://www.reddit.com/r/python.json
    // }
    //
    // render() {}

    return undefined;

}

const styles = StyleSheet.create({
    card: {
        borderRadius: 15,
        elevation: 3,
        backgroundColor: '#fff',
        shadowOffset: {width: 1, height: 1},
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: 4,
        margin: 10,
    },
    text: {
        margin: 15,
        fontFamily: "HelveticaNeue",
        color: "#52575D",
        // fontSize: 20,
    }
})