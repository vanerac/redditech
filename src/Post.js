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
// import {Card} from "./Card"

export function PostCard(props) {

    const {api, data} = props

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

    // function renderURL(toDisplay) {
    //     if (toDisplay == data.url)
    //         return (
    //             <Text>Display URL</Text>
    //         )
    //     else
    //         return (
    //             <Text>Do not display URL</Text>
    //         )
    // }

    // let Image_Http_URL ={ uri: 'https://i.redd.it/award_images/t5_22cerq/5izbv4fn0md41_Wholesome.png'};

    return (
        // <Card titleStyle={{textAlign: 'left'}}>
        //     <Card.Title>{title}</Card.Title>
        //     <Card.Divider/>
        //     <Card.Image source={{uri: mediaValue}}>
        //         {/* <Text style={{marginBottom: 10}}>
        //             The idea with React Native Elements is more about component structure than actual design.
        //         </Text> */}
        //     {/* <Button
        //       icon={<Icon name='code' color='#ffffff' />}
        //       buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
        //       title='VIEW NOW' /> */}
        //     </Card.Image>
        // </Card>
        <View style={styles.card}>
            <Text style={[styles.text, {fontSize: 15}]}>
                {`Made by `}
                {authorName}
                {` on subreddit `}
                {subreddit}
                {"\n"}{"\n"}
                {title}
            </Text>
            <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginRight: 10, marginLeft: 10}}/>
            <Image source={{uri: mediaValue}} style={{height: 350, borderRadius: 15}}/>
        </View>
    )
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
    }
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