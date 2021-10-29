import * as React from "react";
import {useEffect, useState} from "react";
import {StyleSheet, Text, View} from "react-native";
import {Colors, IconButton} from "react-native-paper";
import {useIsFocused} from "@react-navigation/native";

export function CommentCard(props) {
    // kind t1

    const isFocused = useIsFocused();

    const api = props.api
    const data = props.data

    let vote = data.likes === true ? 1 : data.likes === false ? 2 : 0;
    const comment_id = props.data.name
    const body = props.data.body
    const authorName = props.data.author
    const authorId = props.data.author_fullname
    const ups = props.data.ups
    const downs = props.data.downs
    const score = props.data.score
    // todo parse data

    let [voteComment, setVoteComment] = useState(0);
    let [comments, setComments] = useState([])

    const toggleSwitchVoteUP = async () => {
        // setIsVoteUp(previousState => !previousState)

        if (postVote === 1) {
            setVoteComment(0)
            unVote(post_id, api)
        } else {
            setVoteComment(1)
            upVote(post_id, api);
        }

        // if (isVoteDown)
        //     setIsVoteDown(previousState => !previousState)
        // upVote(post_id, api)

    };

    const toggleSwitchVoteDown = async () => {
        // setIsVoteDown(previousState => !previousState)
        // if (isVoteUp)
        //     setIsVoteUp(previousState => !previousState)
        // downVote(post_id, api)

        if (postVote === -1) {
            setVoteComment(0)
            unVote(post_id, api)
        } else {
            setVoteComment(-1)
            downVote(post_id, api);
        }

    };

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
        console.log('up voted')
        return res // surement inutile

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
        console.log('up voted')
        return res // surement inutile
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
        console.log('up voted')
        return res // surement inutile
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

    useEffect(() => {
        if (isFocused) {
            setVoteComment(vote)
            // if (vote == 1)
            //     setIsVoteUp(1)
            // else if (vote == -1)
            //     setIsVoteDown(1)
        }
    }, [isFocused]);

    return (


        <View style={styles.card}>
            <Text style={[styles.text, {fontSize: 15}]}>
                {`Commented by `}
                {authorName}
            </Text>
            <Text>
                {body}
            </Text>
            <View style={styles.statsContainer}>
                <Text>{ups}</Text>
                <IconButton
                    icon={voteComment === 1 ? "thumb-up" : "thumb-up-outline"}
                    color={Colors.red500}
                    size={30}
                    onPress={() => toggleSwitchVoteUP()}
                />
                {/* {ups} */}
                <IconButton
                    icon={voteComment === -1 ? "thumb-down" : "thumb-down-outline"}
                    color={Colors.red500}
                    size={30}
                    onPress={() => toggleSwitchVoteDown()}
                />
                <Text>{downs}</Text>
            </View>
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
    statsContainer: {
        flexDirection: "row",
        alignSelf: "center",
        marginTop: 32
    },
})