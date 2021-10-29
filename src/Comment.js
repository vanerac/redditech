import * as React from "react";
import {useState} from "react";
import {StyleSheet, Text, View} from "react-native";

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
        return res; // surement inutile
    }

    // todo fetch comment hierarchy ? non c'est le preview

    // todo affichier la hierarchie des commentaires ?? non c'est le preview
    //  - Display title => title
    //  - Display desc => desc
    //  Upvote/downvote

    return (
        <View style={styles.card}>
            <Text style={[styles.text, {fontSize: 20, margin: 10}]}>
                {authorName}
            </Text>
            <Text style={[styles.text, {fontSize: 15, margin: 10}]}>
                {body}
            </Text>
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