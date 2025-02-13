import React, { useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

import Link from 'next/link'
import { Modal } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTrash } from '@fortawesome/free-solid-svg-icons';

// import { useSelector } from 'react-redux';

const formatHashtag = (string) => {
    return string.split(/(#{1}[a-z0-9_]{2,})/gi).map((part, index) =>
        part.startsWith("#") ? (
            <Link href={`http://localhost:3001/trends/${part.slice(1)}`} key={index}><span className="text-blue-500 cursor-pointer">{part}</span></Link>
        ) : (
            part
        )
    );
}

function Tweet({ tweet, user }) {
    const [isLike, setIsLike] = useState(false);

    const handleLike = async () => {
        try {
            isLike ? tweet.like -= 1 : tweet.like += 1;
            setIsLike(!isLike);

            // const response = await axios.post('http://localhost:3000/tweets/addLike', {
            //     id : tweet._id,
            //     token: user.token
            // });
        } catch (e) {
            console.error('Error with axios POST /tweets/addLike', e);
        }
    }

    const handleDelete = async () => {
        try {

            // const response = await axios.delete(`http://localhost:3000/tweets/delete/${tweet._id}?token=${token: user.token}`)
        } catch (e) {
            console.error('Error with axios Delete /tweets/addLike', e);
        }
    }

    return (
        <div className="text-white p-8 border-b border-slate-500 last:border-none">
            <div className="flex gap-2 items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-blue-300"></div>
                <span>{tweet.user?.firstname} @{tweet.user?.username} - {dayjs(tweet.createdAt).fromNow()}</span>
            </div>
            <div className="mb-4">
                <p>{formatHashtag(tweet.content)}</p>
            </div>
            <div className="flex gap-3">
                <span><FontAwesomeIcon onClick={handleLike} className={`cursor-pointer hover:opacity-80 ${isLike && 'text-red-500'}`} icon={faHeart} />&nbsp;<span>{tweet.like}</span></span>
                {user.token === tweet.user.token && <span><FontAwesomeIcon onClick={handleDelete} className={`cursor-pointer hover:opacity-80 ${isLike && 'text-red-500'}`} icon={faTrash} /></span>}
            </div>
        </div>
    )
}

export default Tweet