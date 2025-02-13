import { useState, useEffect } from 'react';

// import styles from '../styles/Home.module.css';
import Logo from '../Misc/Logo';
import Image from 'next/image';
import Link from 'next/link';
import WriteTweet from './Tweets/WriteTweet';
import Tweet from './Tweets/Tweet';

import axios from 'axios';

import { useSelector } from 'react-redux';

function Home() {
	const [tweets, setTweets] = useState([]);
	const user = useSelector(state => state.user.value);

	useEffect(() => {
		(async () => {
			try {
				const response = await axios.get('http://localhost:3000/tweets');
				console.log(response, response.data.tweets);
				setTweets(response.data.tweets);
			} catch (e) {
				console.error('Error with Axios Get /tweets =>', e);
			}
		})();
	}, []);


	return (
		<>
			<aside className="w-3/12 bg-slate-800 p-8 justify-between flex flex-col text-white border-r border-slate-500">
				<div>
					<Logo className="" />
				</div>

				<div className="flex">
					{/* <div className="rounded-full h-10 w-10 bg-white"> */}
					<Image src="/profile.png" className="w-full" width={50} height={30} />
					{/* </div> */}
					<div>
						<p className="font-bold">{user.firstname}</p>
						<p className="text-slate-500 text-sm">@{user.username}</p>
					</div>
				</div>
			</aside>

			<section className="w-6/12 bg-slate-800 overflow-auto">
				<div className="border-b border-slate-500">
					<div className="p-8">
						<h1 className="font-bold text-xl text-white mb-8">Home</h1>
						<WriteTweet setTweets={setTweets} />
					</div>
				</div>

				<div className="border-b border-slate-500">
					{tweets.map((tweet, index) => (
						<Tweet key={index} tweet={tweet} user={user} />
					))}
				</div>
			</section>

			<aside className="w-3/12 bg-slate-800 border-l border-slate-500">
				<div className="p-8">
					<h2 className="font-bold text-xl text-white mb-8">Trends</h2>

					<div className="rounded-md overflow-hidden">
						<Link href="http://localhost:3001/search/toto">
							<div className="p-4  hover:opacity-80 bg-slate-900 cursor-pointer">
								<p className="text-white font-bold">#toto</p>
								<p className="text-slate-500 text-sm">254 tweets</p>
							</div>
						</Link>
						<Link href="http://localhost:3001/search/toto">
							<div className="p-4  hover:opacity-80 bg-slate-900 cursor-pointer">
								<p className="text-white font-bold">#tati</p>
								<p className="text-slate-500 text-sm">211 tweets</p>
							</div>
						</Link>
						<Link href="http://localhost:3001/search/toto">
							<div className="p-4  hover:opacity-80 bg-slate-900 cursor-pointer">
								<p className="text-white font-bold">#tuto</p>
								<p className="text-slate-500 text-sm">189 tweets</p>
							</div>
						</Link>
						<Link href="http://localhost:3001/search/toto">
							<div className="p-4  hover:opacity-80 bg-slate-900 cursor-pointer">
								<p className="text-white font-bold">#toutou</p>
								<p className="text-slate-500 text-sm">100 tweets</p>
							</div>
						</Link>
					</div>
				</div>
			</aside>
		</>
	);
}

export default Home;