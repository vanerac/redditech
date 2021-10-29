import {useEffect, useState} from "react";
import {useIsFocused} from "@react-navigation/native";
import {Searchbar} from "react-native-paper";
import * as React from "react";
import {ScrollView, Text, View} from "react-native";
import {PostCard} from "./Post";
import { SubredditCard} from "./Subreddit";

export function Search({route, navigation}) {
    const {api, searchQuery} = route.params;
    const [data, setData] = useState();
    const isFocused = useIsFocused();
    const [newSeachQuery, setSearchQuery] = React.useState('');
    const [autoCompleteVals, setAutoComplete] = React.useState([]);

    // todo be able to change tome and sort
    const sort = ['relevance', 'hot', 'top', 'new', 'comments'];
    const t = ['hour', 'day', 'week', 'month', 'year', 'all']

    async function autoComplete(query) {
        api.makeRequest(
            'https://oauth.reddit.com/api/subreddit_autocomplete_v2?include_profiles=false&limit=10&query='
            + encodeURI(query)).then(res => {
            setAutoComplete(res.data.children/*.map(v => v.data)*/)
        })
        setSearchQuery(query)
    }

    // todo sort by
    const makeSearch = query => {
        // restrict_sr=false&limit=10&
        api.makeRequest('r/all/hot' /*+ encodeURIComponent(query)*/).then(data => {
            setData(data)

        })
        setSearchQuery(query)
    };

    // useEffect(() => {
    //     if (isFocused)
    //         api.makeRequest('search?limit=10&q='+encodeURIComponent(searchQuery)).then(data => {
    //             setData(data)
    //             console.log(data)
    //         })
    // });

    // let i = 0;

    return (
        <View>
            <Searchbar
                placeholder="Search"
                onChangeText={autoComplete}
                defaultValue={searchQuery}
                value={newSeachQuery}
            />
            <ScrollView>
                {autoCompleteVals.map(v => {
                    if (v.kind === 't3')
                        return (<PostCard api={api} data={v.data} key={Math.random()}/>)
                    else if (v.kind === 't5')
                        return (<SubredditCard api={api} data={v.data} key={Math.random()}/>)
                })}
            </ScrollView>
        </View>
    )

}