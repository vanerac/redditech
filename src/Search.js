import {useEffect, useState} from "react";
import {useIsFocused} from "@react-navigation/native";
import {Searchbar} from "react-native-paper";
import * as React from "react";

export function Search({route, navigation}) {
    const {api, searchQuery} = route.params;
    const [data, setData] = useState();
    const isFocused = useIsFocused();
    const [newSeachQuery, setSearchQuery] = React.useState('');


    console.log('searchQuery', searchQuery)
    // todo be able to change tome and sort
    const sort = ['relevance', 'hot', 'top', 'new', 'comments'];
    const t = ['hour', 'day', 'week', 'month', 'year', 'all']



    // todo: auto complete https://www.reddit.com/dev/api/#GET_api_subreddit_autocomplete_v2

    const onChangeSearch = query => {
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
        <Searchbar
            placeholder="Search"
            onChangeText={onChangeSearch}
            defaultValue={searchQuery}
            value={newSeachQuery}
        />
    )

}