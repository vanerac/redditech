import {Image, StyleSheet, Text, View} from 'react-native';
import * as React from 'react'
import {useState, useEffect} from 'react'
import {Video} from 'expo-av';
import {Ionicons, MaterialIcons} from "@expo/vector-icons";
import { IconButton, Colors, Button } from 'react-native-paper';
import {NavigationContainer, useIsFocused} from '@react-navigation/native';

export function PostCard(props) {

    const {api, data} = props
    let [isVoteUp, setIsVoteUp] = useState(false);
    let [isVoteDown, setIsVoteDown] = useState(false);
    const isFocused = useIsFocused();

    if (!data) {
        return (
            <View>
                <Text>
                    {'buffer'}
                </Text>
            </View>
        )
    }

    const vote = data.likes == true ? 1 : data.likes == false ? 2 : 0; 

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

    useEffect(() => {
        if (isFocused){
            if (vote == 1)
                setIsVoteUp(1)
            else if (vote == -1)
                setIsVoteDown(1)
        }
    }, [isFocused]);

    const toggleSwitchVoteUP = async () => {
        setIsVoteUp(previousState => !previousState)
        if (isVoteDown)
            setIsVoteDown(previousState => !previousState)
        upVote(post_id, api)
        console.log("isVoteUp")
    };

    const toggleSwitchVoteDown = async () => {
        setIsVoteDown(previousState => !previousState)
        if (isVoteUp)
            setIsVoteUp(previousState => !previousState)
        downVote(post_id, api)
        console.log("isVoteDown")
    };

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
            <RenderURL type={mediaType} value={mediaValue}></RenderURL>
            <View style={styles.statsContainer}>
                <IconButton
                    icon={isVoteUp ? "thumb-up" : "thumb-up-outline"}
                    color={Colors.red500}
                    size={30}
                    onPress={() => toggleSwitchVoteUP()}
                />
                {/* {ups} */}
                <IconButton
                    icon={isVoteDown ? "thumb-down" : "thumb-down-outline"}
                    color={Colors.red500}
                    size={30}
                    onPress={() => toggleSwitchVoteDown()}
                />
            </View>
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

async function upVote(post_id, api) {
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
    return res // surement inutile
}

async function downVote(post_id, api) {
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
    return res // surement inutile
}

async function unVote(props) {
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
    return res // surement inutile
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
    statsContainer: {
        flexDirection: "row",
        alignSelf: "center",
        marginTop: 32
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

    function test() {
        console.log("ok");
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