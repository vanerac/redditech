import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import * as React from 'react'
import {useEffect, useState} from 'react'
import {Video} from 'expo-av';
import {CommentCard} from "./Comment";
import {useIsFocused} from "@react-navigation/native";
import {Ionicons, MaterialIcons} from "@expo/vector-icons";
import { IconButton, Colors, Button } from 'react-native-paper';
import {NavigationContainer, useIsFocused} from '@react-navigation/native';

export function PostCard(props) {

    const {api, data} = props

    if (!data) {
        return (
            <View>
                <Text>
                    {'buffer'}
                </Text>
            </View>
        )
    }

    const subreddit = data.subreddit_name_prefixed
    const title = data.title
    const ups = data.ups
    const downs = data.downs
    const score = data.score
    let mediaValue = undefined;
    const post_id = data.name
    const desc = data.selftext
    const authorName = data.author
    const authorId = data.author_fullname

    let mediaType = undefined
    switch (data.post_hint) {
        case 'hosted:video':
            mediaType = 'video';
            mediaValue = data.media.reddit_video.scrubber_media_url
            break;
        case 'image':
            mediaType = 'image';
            mediaValue = data.url// todo
            break;
        case 'self':
            mediaType = 'self'
            mediaValue = data.selftext
            break;
    }


    async function fetchComments() {
    }

    return (

        <View style={styles.card}>

            <Text style={[styles.text, {fontSize: 15}]}>
                {`Made by `}
                {authorName}
                {` on subreddit `}
                {subreddit}
                {"\n"}{"\n"}
                {title}
            </Text>
            <RenderURL type={mediaType} value={mediaValue}/>
        </View>
    )
}

function displayBar(props) {
    if (props.type == 'video') {
        const video = React.useRef(null);
        const [status, setStatus] = React.useState({});
        return (
            <View style={{
                borderBottomColor: 'black',
                borderBottomWidth: 1,
                marginRight: 10,
                marginLeft: 10,
                marginBottom: 10
            }}/>
        )
    } else if (props.type == 'image') {
        return (
            <View style={{
                borderBottomColor: 'black',
                borderBottomWidth: 1,
                marginRight: 10,
                marginLeft: 10,
                marginBottom: 10
            }}/>
        )
    } else {
        return (
            <Text></Text>
        );
    }
}

function RenderURL(props) {
    if (props.type == 'video') {
        const video = React.useRef(null);
        const [status, setStatus] = React.useState({});
        return (
            // <View style={styles.container}>
            <Video
                ref={video}
                style={styles.video}
                source={{
                    uri: props.value,
                }}
                useNativeControls
                resizeMode="contain"
                isLooping
                onPlaybackStatusUpdate={status => setStatus(() => status)}
            />
        )
    } else if (props.type == 'image') {
        return (
            <Image source={{uri: props.value}} style={{height: 350, borderRadius: 15, margin: 10}}/>
        )
    } else {
        return (
            <Text></Text>
        );
    }
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
    },
    video: {
        alignSelf: 'center',
        width: 320,
        height: 200,
        borderRadius: 15,
        margin: 10,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
    },
})

export function Post({route, navigation}) {
    // kind t3

    const {data, api} = route.params

    if (!data) {
        return (
            <View>
                <Text>
                    {'buffer'}
                </Text>
            </View>
        )
    }
    let [sort, setSort] = useState('best')
    let [comments, setComments] = useState([])

    const subreddit = data.subreddit_name_prefixed
    const url = data.url
    const title = data.title
    const ups = data.ups
    const downs = data.downs
    const score = data.score
    let mediaValue = undefined;
    const post_id = data.name
    const id = data.id
    const desc = data.selftext
    const authorName = data.author
    const authorId = data.author_fullname

    let mediaType = undefined
    switch (data.post_hint) {
        case 'hosted:video':
            mediaType = 'video';
            mediaValue = data.media.reddit_video.scrubber_media_url
            break;
        case 'image':
            mediaType = 'image';
            mediaValue = data.url// todo
            break;
        case 'self':
            mediaType = 'self'
            mediaValue = data.selftext
            break;
    }


    async function sendComment(string) {
        // todo juste une popup, te fait pas chier
        let formData = new FormData();
        formData.append('thing_id', post_id)
        formData.append('text', string)
        const url = 'https://oauth.reddit.com/api/comment'
        let res = await fetch(url, {
            method: 'POST',
            headers: {"Authorization": "bearer " + api.access_token},
            "User-agent": "redditech",
            body: formData
        })
        res = await res.json()
        if (!res.error) {
            state.comments.push(res);
            setState(state)
        }
        return res; // surement inutile
    }

    async function upVote() {
        let formData = new FormData();
        formData.append('id', post_id)
        formData.append('dir', 1)
        const url = 'https://oauth.reddit.com/api/vote'
        let res = await fetch(url, {
            method: 'POST',
            headers: {"Authorization": "bearer " + api.access_token},
            "User-agent": "redditech",
            body: formData
        })
        res = await res.json()
        if (!res.error) {
            state.upVote = 1
            setState(state)
        }

        return res; // surement inutile
    }

    async function downVote() {
        let formData = new FormData();
        formData.append('id', post_id)
        formData.append('dir', -1)
        const url = 'https://oauth.reddit.com/api/vote'
        let res = await fetch(url, {
            method: 'POST',
            headers: {"Authorization": "bearer " + api.access_token},
            "User-agent": "redditech",
            body: formData
        })
        res = await res.json()
        if (!res.error) {
            state.upVote = -1
            setState(state)
        }
        return res; // surement inutile

    }

    async function unVote() {
        let formData = new FormData();
        formData.append('id', post_id)
        formData.append('dir', 0)
        const url = 'https://oauth.reddit.com/api/vote'
        let res = await fetch(url, {
            method: 'POST',
            headers: {"Authorization": "bearer " + api.access_token},
            "User-agent": "redditech",
            body: formData
        })
        res = await res.json()
        if (!res.error) {
            state.upVote = 0
            setState(state)
        }
        return res; // surement inutile
    }

    async function changeSort(new_sort) {
        setSort(new_sort)
    }

    async function fetchComments() {
        const data = await api.makeRequest(`https://www.reddit.com/${subreddit}/${id}.json?sort=${sort}`);
        setComments(data.data.children.map(v => v.data))

    }

    // todo fetch comments

    /*Todo:
        - Display title => title
        - Display desc => desc
        - Display Media => mediaType & mediaValue
        - Display Plusieurs images ?? (pas encore dans le this)
        - Display Comment list
        ----------
        - Display Comments (new component ??)
        - Handle Upvote, Downvote & unvote
        - handle new comment
    */

    return (<View>
        <Text>{title}</Text>
    </View>);


}