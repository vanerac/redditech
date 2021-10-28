// export class CommentCard extends React.Component {
//     constructor(props) {
//         // kind t1
//         super(props);
//         api = props.api
//         data = props.data
//
//         comment_id = props.data.name
//         body = props.data.body
//         authorName = props.data.link_author
//         authorId = props.data.author_fullname
//         ups = props.data.ups
//         downs = props.data.downs
//         score = props.data.score
//         // todo parse data
//
//
//         state = {
//             upVote: 0, // -1, 0 ou 1
//             comments: [] // list des id
//         }
//         setState(state)
//
//
//     }
//
//     async downVote() {
//         let formData = new FormData();
//         formData.append('id', comment_id)
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
//         formData.append('id', comment_id)
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
//     async upVote() {
//         let formData = new FormData();
//         formData.append('id', comment_id)
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
//         return res; // surement inutile
//     }
//
//     async sendComment() {
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
//     componentDidMount() {
//         // todo fetch comment hierarchy ? non c'est le preview
//     }
//
//     render() {
//         // todo affichier la hierarchie des commentaires ?? non c'est le preview
//         //  - Display title => title
//         //  - Display desc => desc
//         //  Upvote/downvote
//
//         return undefined;
//     }
// }