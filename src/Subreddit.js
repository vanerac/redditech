export class Subreddit extends React.Component {
    constructor(props) {
        super(props);
        this.api = props.api
        this.displayName = props.data.display_name
        this.prefixedName = props.data.display_name_prefixed

        this.id = props.data.name
        this.bannerURL = props.data.banner_img
        this.iconURL = props.data.icon_img
        this.headerURL = props.data.header_img
        this.desc = props.data.description
        this.subscriberCount = props.data.subscribers
        this.createdAt = props.data.created_utc
        this.is_subed = props.data.user_is_subscriber

        this.state = {
            is_subed : this.is_subed
        }
        this.setState(this.state);
    }

    async subscribeTo() {
        let formData = new FormData();
        formData.append('sr_name', this.post_id)
        formData.append('action', 'sub')
        const url = 'https://oauth.reddit.com/api/subscribe'
        let res = await fetch(url , {
            method: 'POST',
            headers:  {"Authorization": "bearer " + this.api.access_token} ,
            "User-agent": "redditech",
        })
        res = await res.json()
        if (!res.error) {
            this.state.is_subed = true
            this.setState(this.state)
        }
        return res; // surement inutile

    }
    async unsubscribeTo() {
        let formData = new FormData();
        formData.append('sr_name', this.post_id)
        formData.append('action', 'unsub')
        const url = 'https://oauth.reddit.com/api/subscribe'
        let res = await fetch(url , {
            method: 'POST',
            headers:  {"Authorization": "bearer " + this.api.access_token} ,
            "User-agent": "redditech",
        })
        res = await res.json()
        if (!res.error) {
            this.state.is_subed = true
            this.setState(this.state)
        }
        return res; // surement inutile
    }

    changeSort(option) {
        // todo
        //  fetch all subreddit data with sort options
    }

    componentDidMount() {
        // todo fetch display posts
        //  https://www.reddit.com/r/python.json
    }

    render() {}

}

export class SubredditPreview extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = props.data.display_name
        this.prefixedName = props.data.display_name_prefixed

        this.id = props.data.name
        this.bannerURL = props.data.banner_img
        this.iconURL = props.data.icon_img
        this.headerURL = props.data.header_img
        this.desc = props.data.description
        this.subscriberCount = props.data.subscribers
        this.createdAt = props.data.created_utc
        this.is_subed = props.data.user_is_subscriber

    }

    componentDidMount() {
    }

    render() {
        return undefined
    }

}