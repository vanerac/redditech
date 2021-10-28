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
import * as React from 'react'

export function PostCard(props) {

    const {api, data} = props
    console.log(props)

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
        <View>
            <Text>
                {title}
            </Text>
        </View>
    )

}

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