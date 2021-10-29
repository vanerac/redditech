import {useState} from "react";
import {Image, ScrollView, StyleSheet, Text, View} from "react-native";
import * as React from "react";

export function SubredditCard(props) {
    const api = props.api
    const data = props.data

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


    return (
        <View style={styles.card}>

                <Text style={[styles.text, {fontSize: 15}]}>
                    {prefixedName}
                    {' - '}
                    {subscriberCount}
                    {' Subscribers'}
                    {'test'}
                </Text>
                <Text>{desc}</Text>
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
        })
        res = await res.json()
        setSub(is_subed)

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
        })
        res = await res.json()
        setSub(is_subed)

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

// export class SubredditPreview extends React.Component {
//     constructor(props) {
//         super(props);
//         displayName = props.data.display_name
//         prefixedName = props.data.display_name_prefixed
//
//         id = props.data.name
//         bannerURL = props.data.banner_img
//         iconURL = props.data.icon_img
//         headerURL = props.data.header_img
//         desc = props.data.description
//         subscriberCount = props.data.subscribers
//         createdAt = props.data.created_utc
//         is_subed = props.data.user_is_subscriber
//
//     }
//
//     componentDidMount() {
//     }
//
//     render() {
//         return undefined
//     }
//
// }

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