import React from 'react'
import Tweet from './Tweet';
import WriteTweet from './WriteTweet';
import SearchTweet from './SearchTweet';

import { useState } from 'react';

import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward } from '@fortawesome/free-solid-svg-icons';

function TweetsList({ tweets, setTweets, loading, handleSideMenu, deleteTweet }) {
    const router = useRouter();
    const user = useSelector(state => state.user.value);

	const { hashtag } = router.query;

    return (
        <section onClick={() => handleSideMenu('all')} className="absolute top-0 h-full md:h-auto left-0 md:static w-full md:w-6/12 bg-slate-800 overflow-auto">
            <div className="border-b border-slate-500">
                <div className="px-8 py-12 md:p-8">
                    {!hashtag && (
                        <>
                            <h1 className="font-bold text-xl text-white mb-8">Home</h1>
                            <WriteTweet setTweets={setTweets} />
                        </>
                    )}

                    {hashtag && (
                        <>
                            <button onClick={() => router.push('/home')} className="mb-4 rounded-full bg-white text-slate-800 w-24 text-sm font-bold"><FontAwesomeIcon icon={faBackward} />&nbsp;back</button>
                            <h1 className="font-bold text-xl text-white mb-8">Hashtag</h1>
                            <SearchTweet setTweets={setTweets} />
                        </>
                    )}
                    
                </div>
            </div>

            <div>
                {tweets.map((tweet, index) => (
                    <Tweet setTweets={setTweets} tweets={tweets} deleteTweet={deleteTweet} key={index} tweet={tweet} user={user} />
                ))}
            </div>

            <div id="loadMore" className="text-center py-4">
                {loading ? <p className="text-gray-400">Chargement...</p> : <p className="text-gray-600">Faites défiler pour charger plus</p>}
            </div>
        </section>
    )
}

export default TweetsList
