import { useState, useEffect, useRef } from 'react';

// import styles from '../styles/Home.module.css';
import Logo from '../Misc/Logo';
import Image from 'next/image';
import Link from 'next/link';
import TweetsList from './Tweets/TweetsList';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faBars, faClose } from '@fortawesome/free-solid-svg-icons';


import axios from 'axios';

import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../reducers/user';
import { useRouter } from 'next/router';

function Home() {
	const dispatch = useDispatch();
	const router = useRouter()
	const [tweets, setTweets] = useState([]);
	const [hashtags, setHashtags] = useState([]);
	const [page, setPage] = useState(0);
	const [loading, setLoading] = useState(false);
	const observer = useRef(null);
	const user = useSelector((state) => state.user.value);

	const [rightMenu, setRightMenu] = useState(false);
	const [leftMenu, setLeftMenu] = useState(false);

	const { hashtag } = router.query;

	const fetchTweets = async () => {
		if (loading) return;

		setLoading(true);

		try {
			let response;
			
			if (hashtag === undefined) {
				response = await axios.get(`http://localhost:3000/tweets?token=${user.token}`);
			} else {
				response = await axios.get(`http://localhost:3000/hashtags/tweetByHashtag?token=${user.token}${hashtag !== undefined ? `&hashtag=${hashtag}` : ''}`);
			}

			if (response.data.error) {
				setTweets([]);
				return;
			}

			// const response = await axios.get(`http://localhost:3000/tweets?limit=10&skip=${page * 10}`);
			// setTweets((prev) => [...prev, ...response.data.tweets]);
			setTweets(response.data.tweets);
			// setPage((prev) => prev + 1);
		} catch (e) {
			console.error(`Error with Route GET tweets?limit=10&skip=${page * 10} =>`, e);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchTweets();
	}, [hashtag]);

	// useEffect(() => {
	// 	const handleObserver = (entries) => {
	// 		if (entries[0].isIntersecting) {
	// 			fetchTweets();
	// 		}
	// 	};

	// 	const options = {
	// 		root: null,
	// 		rootMargin: "100px",
	// 		threshold: 0.1,
	// 	};

	// 	observer.current = new IntersectionObserver(handleObserver, options);
	// 	observer.current.observe(document.querySelector("#loadMore"));

	// 	return () => observer.current && observer.current.disconnect();
	// }, [tweets]);


	useEffect(() => {
		(async () => {
			try {
				const response = await axios.get('http://localhost:3000/hashtags');

				setHashtags(response.data.hashtags);
			} catch (e) {
				console.error('Error with Axios Get /tweets =>', e);
			}
		})();
	}, [tweets]);

	const handleSideMenu = (side) => {
		if (side === 'all') {
			setLeftMenu(false);
			setRightMenu(false);
		}

		if (side === 'left') {
			setLeftMenu(!leftMenu);
			rightMenu && setRightMenu(false);
		}
		
		if (side === 'right') {
			setRightMenu(!rightMenu);
			leftMenu && setLeftMenu(false);
		}
	}


	// useEffect(() => {
	// 	(async () => {
	// 		try {
	// 			const response = await axios.get(`http://localhost:3000/tweets${hashtag !== undefined ? `?hashtag=${hashtag}` : ''}`);

	// 			setTweets(response.data.tweets);
	// 		} catch (e) {
	// 			console.error('Error with Axios Get /tweets =>', e);
	// 		}
	// 	})();
	// }, [hashtag]);

	const deleteTweet = (tweet) => {
		setTweets(tweets.filter(elem => elem._id !== tweet._id));
	}

	return (
		<>
			<FontAwesomeIcon onClick={() => handleSideMenu('left')} className={`${leftMenu ? 'translate-x-full' : 'translate-x-0'} transition-transform cursor-pointer hover:opacity-80 absolute z-20 text-xl left-4 top-4 text-white md:hidden`} icon={!leftMenu ? faBars : faClose} />
			<aside id="left" className={`${!leftMenu ? '-translate-x-full' : 'translate-x-0'} absolute h-full z-10 md:static  left-0 transition-transform md:translate-x-0 w-6/12 md:w-3/12 bg-slate-800 p-8 justify-between flex flex-col text-white shadow-md shadow-slate-900 md:shadow-none md:border-r md:border-slate-500`}>
				<div>
					<Logo />
				</div>

				<div className="flex flex-col items-start">
					<div className="flex mb-4">
						{/* <div className="rounded-full h-10 w-10 bg-white"> */}
						<Image src="/profile.png" className="w-full" width={50} height={30} />
						{/* </div> */}
						<div>
							<p className="font-bold">{user.firstname}</p>
							<p className="text-slate-500 text-sm">@{user.username}</p>
						</div>
					</div>

					<button onClick={() => dispatch(logout())} className="rounded-full bg-white text-slate-800 w-24 text-sm font-bold">Logout</button>
				</div>
			</aside>

			<TweetsList tweets={tweets} setTweets={setTweets} loading={loading} deleteTweet={deleteTweet} handleSideMenu={handleSideMenu} />

			<FontAwesomeIcon onClick={() => handleSideMenu('right')} className={`${rightMenu ? '-translate-x-full' : 'translate-x-0'} transition-transform cursor-pointer hover:opacity-80 absolute z-20 text-xl right-4 top-4 text-white md:hidden`} icon={!rightMenu ? faStar : faClose} />
			<aside className={`${!rightMenu ? 'translate-x-full' : 'translate-x-0'} h-full z-10 absolute md:static top-0 right-0 transition-transform md:translate-x-0  w-6/12 md:w-3/12 bg-slate-800 shadow-md shadow-slate-900 md:shadow-none md:border-l md:border-slate-500 overflow-auto`}>
				<div className="p-8">
					<h2 className="font-bold text-xl text-white mb-8">Trends</h2>

					<div className="rounded-md overflow-hidden">
						{hashtags.map((hashtag, index) => (
							<Link key={index} href={`http://localhost:3001/home?hashtag=${hashtag.name.slice(1)}`}>
								<div className="p-4 hover:opacity-80 bg-slate-900 cursor-pointer">
									<p className="text-white font-bold">{hashtag.name}</p>
									<p className="text-slate-500 text-sm">{hashtag.tweetCount} {hashtag.tweetCount > 1 ? 'tweets' : 'tweet'}</p>
								</div>
							</Link>
						))}
					</div>
				</div>
			</aside>
		</>
	);
}

export default Home;