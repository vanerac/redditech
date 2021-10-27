export class CommentCard extends React.Component {
    constructor(props) {
        // kind t1
        super(props);
        this.api = props.api
        this.data = props.data

        this.comment_id = props.data.name
        this.body = props.data.body
        this.authorName = props.data.link_author
        this.authorId = props.data.author_fullname
        this.ups = props.data.ups
        this.downs = props.data.downs
        this.score = props.data.score
        // todo parse data


        this.state = {
            upVote: 0, // -1, 0 ou 1
            comments: [] // list des id
        }
        this.setState(this.state)


    }

    async downVote() {
        let formData = new FormData();
        formData.append('id', this.comment_id)
        formData.append('dir', -1)
        const url = 'https://oauth.reddit.com/api/vote'
        let res = await fetch(url, {
            method: 'POST',
            headers: {"Authorization": "bearer " + this.api.access_token},
            "User-agent": "redditech",
        })
        res = await res.json()
        if (!res.error) {
            this.state.upVote = -1
            this.setState(this.state)
        }
        return res; // surement inutile

    }

    async unVote() {
        let formData = new FormData();
        formData.append('id', this.comment_id)
        formData.append('dir', 0)
        const url = 'https://oauth.reddit.com/api/vote'
        let res = await fetch(url, {
            method: 'POST',
            headers: {"Authorization": "bearer " + this.api.access_token},
            "User-agent": "redditech",
        })
        res = await res.json()
        if (!res.error) {
            this.state.upVote = 0
            this.setState(this.state)
        }
        return res; // surement inutile
    }

    async upVote() {
        let formData = new FormData();
        formData.append('id', this.comment_id)
        formData.append('dir', 1)
        const url = 'https://oauth.reddit.com/api/vote'
        let res = await fetch(url, {
            method: 'POST',
            headers: {"Authorization": "bearer " + this.api.access_token},
            "User-agent": "redditech",
        })
        res = await res.json()
        if (!res.error) {
            this.state.upVote = 1
            this.setState(this.state)
        }
        return res; // surement inutile
    }

    async sendComment() {
        // todo juste une popup, te fait pas chier
        let formData = new FormData();
        formData.append('thing_id', this.post_id)
        formData.append('text', string)
        const url = 'https://oauth.reddit.com/api/comment'
        let res = await fetch(url, {
            method: 'POST',
            headers: {"Authorization": "bearer " + this.api.access_token},
            "User-agent": "redditech",
        })
        res = await res.json()
        if (!res.error) {
            this.state.comments.push(res);
            this.setState(this.state)
        }
        return res; // surement inutile
    }

    componentDidMount() {
        // todo fetch comment hierarchy ? non c'est le preview
    }

    render() {
        // todo affichier la hierarchie des commentaires ?? non c'est le preview
        //  - Display title => this.title
        //  - Display desc => this.desc
        //  Upvote/downvote

        return undefined;
    }
}