export class PostCard extends React.Component {
    constructor(props) {
        super(props);
        this.api = props.data
        this.data = props.data
        this.subreddit = props.data.subreddit_name_prefixed
        this.title = props.data.title
        this.ups = props.data.ups
        this.downs = props.data.downs
        this.score = props.data.score
        this.mediaValue = undefined;
        this.post_id = props.data.name
        this.desc = props.data.selftext
        this.authorName = props.data.author
        this.authorId = props.data.author_fullname

        this.mediaType = undefined
        switch (props.data.post_hint) {
            case 'hosted:video':
                this.mediaType = 'video';
                this.mediaValue = props.data.media.reddit_video.scrubber_media_url
                break;
            case 'image':
                this.mediaType = 'image';
                this.mediaValue; props.data.url// todo
                break;
            case 'self':
                this.mediaType = 'self'
                this.mediaValue = props.data.selftext
                break;
        }
    }

    componentDidMount() {

    }

    render() {
        // todo
        return (
            null
        )
    }
}

export class Post extends React.Component {
    // kind t3

    constructor(props) {
        super(props);
        this.api = props.api
        this.data = props.data
        this.subreddit = props.data.subreddit_name_prefixed
        this.title = props.data.title
        this.ups = props.data.ups
        this.downs = props.data.downs
        this.score = props.data.score
        this.mediaValue = undefined;
        this.post_id = props.data.name

        // todo author name

        this.state = {
            upVote: 0, // -1, 0 ou 1
            comments: [] // list des id
        }

        this.setState(this.state)

        this.mediaType = undefined
        switch (props.data.post_hint) {
            case 'hosted:video':
                this.mediaType = 'video';
                this.mediaValue = props.data.media.reddit_video.scrubber_media_url
                break;
            case 'image':
                this.mediaType = 'image';
                this.mediaValue; props.data.url// todo
                break;
            case 'self':
                this.mediaType = 'self'
                this.mediaValue = props.data.selftext
                break;
        }

    }

    async sendComment(string) {
        // todo juste une popup, te fait pas chier
        let formData = new FormData();
        formData.append('thing_id', this.post_id)
        formData.append('text', string)
        const url = 'https://oauth.reddit.com/api/comment'
        let res = await fetch(url , {
            method: 'POST',
            headers:  {"Authorization": "bearer " + this.api.access_token} ,
            "User-agent": "redditech",
        })
        res = await res.json()
        if (!res.error) {
            this.state.comments.push(res);
            this.setState(this.state)
        }
        return res; // surement inutile
    }

    async upVote() {
        let formData = new FormData();
        formData.append('id', this.post_id)
        formData.append('dir', 1)
        const url = 'https://oauth.reddit.com/api/vote'
        let res = await fetch(url , {
            method: 'POST',
            headers:  {"Authorization": "bearer " + this.api.access_token} ,
            "User-agent": "redditech",
        })
        res = await res.json()
        if (!res.error) {
            this.state.upVote = 1
            this.setState(this.state)
        }

        return res; // surement inutile
    }

    async downVote() {
        let formData = new FormData();
        formData.append('id', this.post_id)
        formData.append('dir', -1)
        const url = 'https://oauth.reddit.com/api/vote'
        let res = await fetch(url , {
            method: 'POST',
            headers:  {"Authorization": "bearer " + this.api.access_token} ,
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
        formData.append('id', this.post_id)
        formData.append('dir', 0)
        const url = 'https://oauth.reddit.com/api/vote'
        let res = await fetch(url , {
            method: 'POST',
            headers:  {"Authorization": "bearer " + this.api.access_token} ,
            "User-agent": "redditech",
        })
        res = await res.json()
        if (!res.error) {
            this.state.upVote = 0
            this.setState(this.state)
        }
        return res; // surement inutile
    }

    componentDidMount() {
        // todo fetch comments
    }

    render() {
        /*Todo:
            - Display title => this.title
            - Display desc => this.desc
            - Display Media => this.mediaType & this.mediaValue
            - Display Plusieurs images ?? (pas encore dans le this)
            - Display Comment list
            ----------
            - Display Comments (new component ??)
            - Handle Upvote, Downvote & unvote
            - handle new comment
        */

        return (null)

    }
}