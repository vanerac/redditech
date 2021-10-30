import * as React from "react";
import {useEffect, useState} from "react";
import {Image, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View} from "react-native";
import {useIsFocused} from "@react-navigation/native";
import {PostCard} from "./Post";

export function SubredditCard(props) {
    const api = props.api
    const data = props.data

    const displayName = data.display_name
    const prefixedName = data.display_name_prefixed

    const post_id = data.name
    const bannerURL = data.banner_img
    const iconURL = data.icon_img
    const headerURL = data.header_img
    const short_desc = data.public_description
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
        data.user_is_subscriber = !is_subed;
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
        data.user_is_subscriber = !is_subed;
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

    const round_subscribers = abbrNum(subscriberCount, 1)

    return (
        <View style={styles.card}>
            <Text>
                {/* <View style={{margin: 15}}> */}
                    <Image
                        source={{
                            uri: iconURL || 'https://b.thumbs.redditmedia.com/voAwqXNBDO4JwIODmO4HXXkUJbnVo_mL_bENHeagDNo.png'
                        }}
                        style={{width: 30, height: 30, borderRadius: 15}}
                    />
                {/* </View> */}
                <Text style={[styles.text, {fontSize: 15}]}>
                    {prefixedName}
                    {' - '}
                    {round_subscribers}
                    {' Subscribers'}
                    {"\n"}
                </Text>
                <Switch
                    trackColor={{false: "#767577", true: "#007bff"}}
                    thumbColor={is_subed ? "#f4f3f4" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSubscription}
                    value={is_subed}
                />
            </Text>

            <View>
                <Text style={[styles.text, {fontSize: 15}]}>
                    {short_desc}
                </Text>
            </View>
        </View>
    )
}

function abbrNum(number, decPlaces) {
    decPlaces = Math.pow(10,decPlaces);
    var abbrev = [ "k", "m", "b", "t" ];

    for (var i=abbrev.length-1; i>=0; i--) {
        var size = Math.pow(10,(i+1)*3);
        if(size <= number) {
             number = Math.round(number*decPlaces/size)/decPlaces;
             if((number == 1000) && (i < abbrev.length - 1)) {
                 number = 1;
                 i++;
             }
             number += abbrev[i];
             break;
        }
    }

    return number;
}

export function Subreddit({route, navigation}) {

    const {data, api} = route.params

    const displayName = data.display_name
    const prefixedName = data.display_name_prefixed

    const url = data.url
    const post_id = data.name
    const bannerURL = data.banner_img
    const iconURL = data.icon_img
    const headerURL = data.header_img
    const short_desc = data.public_description
    const desc = data.description
    const subscriberCount = data.subscribers
    const createdAt = data.created_utc
    // const is_subed =

    let [is_subed, setSub] = useState(false)
    let [sort, setSort] = useState('best')
    let [posts, setPosts] = useState([])
    const isFocused = useIsFocused();

    useEffect(() => {
        if (!isFocused)
            return
        setSub(data.user_is_subscriber);
        fetchPosts().then(() => {
        });
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

    async function fetchPosts() {
        const res = await api.makeRequest('https://oauth.reddit.com' + url + sort + '.json')

        setPosts(res.data.children.map(v => v.data));
    }


    let i = 0;

    /* todo
    *   display subreddit infos
    *   add subreddit interactions
    *
    *  */


    return (
        <View>

            {/* <Image source={Image_Http_URL} style={{height: 350}}/> */}
            <ScrollView>
                {/*<Searchbar*/}
                {/*    placeholder="Search"*/}
                {/*    onChangeText={onChangeSearch}*/}
                {/*    onIconPress={() => navigation.navigate('Search', {searchQuery: searchQuery})}*/}
                {/*    value={searchQuery}*/}
                {/*/>*/}
                {posts.map(element => {
                    return (
                        <TouchableOpacity onPress={() => navigation.push('Post', {data: element, api: api})} key={i++}>
                            <PostCard
                                style={{cursor: 'pointer'}}
                                api={api}
                                data={element}
                            />
                        </TouchableOpacity>

                    )
                })}
            </ScrollView>
        </View>
    );

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
        fontSize: 20,
    },
})