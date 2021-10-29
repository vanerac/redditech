import {useEffect, useState} from "react";
import {useIsFocused} from "@react-navigation/native";
import {Searchbar} from "react-native-paper";
import * as React from "react";
import {Text, View} from "react-native";

export function Search({route, navigation}) {
    const {api, searchQuery} = route.params;
    const [data, setData] = useState();
    const isFocused = useIsFocused();
    const [newSeachQuery, setSearchQuery] = React.useState('');
    const [autoCompleteVals, setAutoComplete] = React.useState([]);


    console.log('searchQuery', searchQuery)
    // todo be able to change tome and sort
    const sort = ['relevance', 'hot', 'top', 'new', 'comments'];
    const t = ['hour', 'day', 'week', 'month', 'year', 'all']

    async function autoComplete(query) {
        setSearchQuery(query)
        api.makeRequest('https://oauth.reddit.com/api/subreddit_autocomplete_v2?limit=5&query=' + encodeURI(query)).then(res => {
            setAutoComplete(res.data.children.map(v => v.data))
        })
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


    return (
        <View>
            <Searchbar
                placeholder="Search"
                onChangeText={autoComplete}
                defaultValue={searchQuery}
                value={newSeachQuery}
            />

            {autoCompleteVals.map(v => {
                return (<Text>{v.display_name}</Text>) // todo mettre en forme
            })}
        </View>
    )

}