import {
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
import * as React from 'react'
import { ListItem, Button, Icon } from 'react-native-elements'
import { Video, AVPlaybackStatus } from 'expo-av';

export function PostCard(props) {

    const {api, data} = props
    // console.log(props)

    if (!data) {
        return  (
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
            mediaValue=data.url// todo
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
            <RenderURL type={mediaType} value={mediaValue}></RenderURL>
        </View>
        // <View style={styles.container}>
        // <View style={styles.card}>
        //     <Text>okok</Text>
        
        // </View>
    )
}

function displayBar(props) {
    if (props.type == 'video'){
        const video = React.useRef(null);
        const [status, setStatus] = React.useState({});
        return (
            <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginRight: 10, marginLeft: 10, marginBottom: 10}}/>
                  )
    } else if (props.type == 'image') {
        return (
            <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginRight: 10, marginLeft: 10, marginBottom: 10}}/>
        )
    } else {
        return (
            <Text></Text>
        );
    }
}

function RenderURL(props) {
    if (props.type == 'video'){
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
        shadowOffset: { width: 1, height: 1},
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

// export class Post extends React.Component {
//     // kind t3
//
//     constructor(props) {
//         super(props);
//         api = props.api
//         data = props.data
//         subreddit = props.data.subreddit_name_prefixed
//         title = props.data.title
//         ups = props.data.ups
//         downs = props.data.downs
//         score = props.data.score
//         mediaValue = undefined;
//         post_id = props.data.name
//
//         // todo author name
//
//         state = {
//             upVote: 0, // -1, 0 ou 1
//             comments: [] // list des id
//         }
//
//         setState(state)
//
//         mediaType = undefined
//         switch (props.data.post_hint) {
//             case 'hosted:video':
//                 mediaType = 'video';
//                 mediaValue = props.data.media.reddit_video.scrubber_media_url
//                 break;
//             case 'image':
//                 mediaType = 'image';
//                 mediaValue;
//                 props.data.url// todo
//                 break;
//             case 'self':
//                 mediaType = 'self'
//                 mediaValue = props.data.selftext
//                 break;
//         }
//
//     }
//
//     async sendComment(string) {
//         // todo juste une popup, te fait pas chier
//         let formData = new FormData();
//         formData.append('thing_id', post_id)
//         formData.append('text', string)
//         const url = 'https://oauth.reddit.com/api/comment'
//         let res = await fetch(url, {
//             method: 'POST',
//             headers: {"Authorization": "bearer " + api.access_token},
//             "User-agent": "redditech",
//         })
//         res = await res.json()
//         if (!res.error) {
//             state.comments.push(res);
//             setState(state)
//         }
//         return res; // surement inutile
//     }
//
//     async upVote() {
//         let formData = new FormData();
//         formData.append('id', post_id)
//         formData.append('dir', 1)
//         const url = 'https://oauth.reddit.com/api/vote'
//         let res = await fetch(url, {
//             method: 'POST',
//             headers: {"Authorization": "bearer " + api.access_token},
//             "User-agent": "redditech",
//         })
//         res = await res.json()
//         if (!res.error) {
//             state.upVote = 1
//             setState(state)
//         }
//
//         return res; // surement inutile
//     }
//
//     async downVote() {
//         let formData = new FormData();
//         formData.append('id', post_id)
//         formData.append('dir', -1)
//         const url = 'https://oauth.reddit.com/api/vote'
//         let res = await fetch(url, {
//             method: 'POST',
//             headers: {"Authorization": "bearer " + api.access_token},
//             "User-agent": "redditech",
//         })
//         res = await res.json()
//         if (!res.error) {
//             state.upVote = -1
//             setState(state)
//         }
//         return res; // surement inutile
//
//     }
//
//     async unVote() {
//         let formData = new FormData();
//         formData.append('id', post_id)
//         formData.append('dir', 0)
//         const url = 'https://oauth.reddit.com/api/vote'
//         let res = await fetch(url, {
//             method: 'POST',
//             headers: {"Authorization": "bearer " + api.access_token},
//             "User-agent": "redditech",
//         })
//         res = await res.json()
//         if (!res.error) {
//             state.upVote = 0
//             setState(state)
//         }
//         return res; // surement inutile
//     }
//
//     componentDidMount() {
//         // todo fetch comments
//     }
//
//     render() {
//         /*Todo:
//             - Display title => title
//             - Display desc => desc
//             - Display Media => mediaType & mediaValue
//             - Display Plusieurs images ?? (pas encore dans le this)
//             - Display Comment list
//             ----------
//             - Display Comments (new component ??)
//             - Handle Upvote, Downvote & unvote
//             - handle new comment
//         */
//
//         return (null)
//
//     }
// }