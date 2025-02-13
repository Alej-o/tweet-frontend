import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';


const checkTweet = (string) => {
    console.log(/#{1}[a-z0-9]{2,}/i.test(string), string.length);
    return (string.length > 0 && /#{1}[a-z0-9]{2,}/i.test(string));
}

function WriteTweet({setTweets}) {
    const [content, setContent] = useState('');
    const { token } = useSelector(state => state.user.value);

    const handleChange = (e) => {
        if (e.target.value.length <= 280) setContent(e.target.value);
    }

    const saveTweet = async () => {
        if (checkTweet(content)) {
            try {
                console.log('hrer');
                const response = await axios.post('http://localhost:3000/tweets/addTweet', {
                    content: content,
                    token: token,
                });

                console.log('none');

                setTweets(prev => [...prev, response.data.content]);
                setContent('');
            } catch (e) {
                console.error('Error with saveTweet() =>', e);
            }
        }
    }

    return (
        <div className="px-8">
            <textarea rows="2" name="content" onChange={handleChange} value={content} placeholder="Whats's Up?" className="w-full p-2 bg-transparent text-white border-b focus:outline-none"></textarea>
            <div className="flex justify-end mt-4 gap-4 text-white text-sm items-center">
                <p><span>{content.length}</span>/280</p>
                <button onClick={saveTweet} className="rounded-full  bg-blue-500 font-bold hover:opacity-80 h-10 w-32">Tweet</button>
            </div>
        </div>
    )
}

export default WriteTweet
