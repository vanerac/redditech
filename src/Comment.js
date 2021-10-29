import {useState} from "react";
import {View} from "react-native";

export function CommentCard(props) {
    // kind t1
    const api = props.api
    const data = props.data

    const comment_id = props.data.name
    const body = props.data.body
    const authorName = props.data.link_author
    const authorId = props.data.author_fullname
    const ups = props.data.ups
    const downs = props.data.downs
    const score = props.data.score
    // todo parse data

    let [vote, setVote] = useState(0);
    let [comments, setComments] = useState([])


    async function downVote() {
        let formData = new FormData();
        formData.append('id', comment_id)
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
        formData.append('id', comment_id)
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

    async function upVote() {
        let formData = new FormData();
        formData.append('id', comment_id)
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
        })
        res = await res.json()
        if (!res.error) {
            state.comments.push(res);
            setState(state)
        }
        return res; // surement inutile
    }

    // todo fetch comment hierarchy ? non c'est le preview

    // todo affichier la hierarchie des commentaires ?? non c'est le preview
    //  - Display title => title
    //  - Display desc => desc
    //  Upvote/downvote

    return (
        <View>
            <Text>
                {}
            </Text>
        </View>
    );

}