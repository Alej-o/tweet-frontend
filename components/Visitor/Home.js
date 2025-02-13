// import 'dotenv/config';
import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useRouter } from 'next/router';

import Image from 'next/image';
import Button from '../Misc/Button';
import Signin from './Signin';
import Signup from './Signup';
import Logo from '../Misc/Logo';
import { Modal } from "antd";

import {addUser} from '../../reducers/user';

import axios from 'axios';

function Home() {
	const router = useRouter();
	const dispatch = useDispatch();
	const [open, setOpen] = useState([false, false]);
	const [userInfo, setUserInfo] = useState({});
	const user = useSelector(state => state.user.value);
	const focusSignin = useRef();
	const focusSignup = useRef();

	const handleInputUserChange = (e) => {
		const { name, value } = e.target;
		setUserInfo(prev => ({...prev, [name]: value}));
	}

	const toggleOpenModal = (id, open) => {
		setUserInfo({});

		setOpen((p) => {
			p[id] = open;
			return [...p];
		});
	}

	const handleConnexion= async (e, type) => {
		e.preventDefault();

		const response = await axios.post(`http://localhost:3000/users/${type}`, {...userInfo});

		if (response.data.result) {
			dispatch(addUser({
				token : response.data.token, 
				username : userInfo.username, 
				firstname: response.data.firstname || userInfo.firstname
			}));

			router.push('/home');
		}
	}

	return (
		<>
			<section className="bg-slate-800 bg-home bg-cover bg-center bg-no-repeat h-full hidden md:block md:w-5/12"></section>
			<section className="bg-slate-800 h-full w-full md:block md:w-7/12">
				<div className="flex flex-col h-full w-full items-center text-center md:items-start md:text-left justify-center md:relative p-8 text-white">
					<div className="md:absolute md:top-5 md:left-5">
						<Logo />
					</div>

					<div className="font-bold">
						<h1 className="text-3xl md:text-7xl leading-snug mb-8">See what's<br />Happening</h1>
						<h2 className="text-xl md:text-3xl mb-8">Join Hackatweet today</h2>

						<Button handleOpenModal={() => toggleOpenModal(0, true)} className="bg-blue-500 hover:opacity-80 mb-4" type="primary">Sign up</Button>
						<Modal className="custom-modal" open={open[0]} onCancel={() => toggleOpenModal(0, false)} footer={null}>
							<Signup userInfo={userInfo} handleInputUserChange={handleInputUserChange} signup={handleConnexion} focusSignup={focusSignup} />
						</Modal>

						<p className="mb-4">Already have an account</p>
						<Button handleOpenModal={() => toggleOpenModal(1, true)} className="bg-transparent hover:opacity-80 border">Sign in</Button>
						<Modal className="custom-modal" open={open[1]} onCancel={() => toggleOpenModal(1, false)} footer={null}>
							<Signin userInfo={userInfo} handleInputUserChange={handleInputUserChange} signin={handleConnexion} focusSignin={focusSignin} />
						</Modal>
					</div>
				</div>
			</section >
		</>
	);
}

export default Home;
