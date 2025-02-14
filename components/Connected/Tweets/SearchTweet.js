import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import { useRouter } from 'next/router';

function SearchTweet() {
    const router = useRouter();
    const [content, setContent] = useState('');
    const { token } = useSelector(state => state.user.value);
    const [query, setQuery] = useState('');
    
    // const { hashtag } = router.query;

    const searchTweets = async () => {
        const queryTrim = query.trim();

        try {
            if (queryTrim) {
                router.push(`/home?hashtag=${queryTrim.split(' ').join(',')}`);
            }
        } catch (e) {
            console.error('Error with saveTweet() =>', e);
        }
    }

    return (
        <div className="px-8">
            <input type="text" name="hashtag" onChange={(e) => setQuery(e.target.value)} value={query} placeholder="Looking for some tweets?" className="w-full p-2 bg-transparent text-white border-b focus:outline-none" />
            <div className="flex justify-end mt-4 gap-4 text-white text-sm items-center">
                <button onClick={searchTweets} className="rounded-full  bg-blue-500 font-bold hover:opacity-80 h-10 w-32">Search</button>
            </div>
        </div>
    )
}

export default SearchTweet
