import { useState } from 'react';

import Image from 'next/image';
import Button from '../Misc/Button';
import Signin from './Signin';
import Signup from './Signup';
import Logo from '../Misc/Logo';
import { Modal } from "antd";

function Home() {
	const [open, setOpen] = useState([false, false]);
	const [loading, setLoading] = useState(false);

	const toggleOpenModal = (id, open) => {
		setOpen((p) => {
			p[id] = open;
			return [...p];
		});
	}

	const handleOk = () => {
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
			setOpen(false);
		}, 3000);
	};

	const handleCancel = () => {
		setOpen(false);
	};

	return (
		<>
			<section className="bg-slate-800 bg-home bg-cover bg-center bg-no-repeat h-full w-5/12"></section>
			<section className="bg-slate-800 h-full w-7/12">
				<div className="flex flex-col h-full w-full justify-center relative p-8 text-white">
					<div className="absolute top-5 left-5">
						<Logo />
					</div>

					<div className="font-bold">
						<h1 className="text-7xl leading-snug mb-8">See what's<br />Happening</h1>
						<h2 className="text-3xl mb-8">Join Hackatweet today</h2>

						<Button handleOpenModal={() => toggleOpenModal(0, true)} className="bg-blue-500 hover:opacity-80 mb-4" type="primary">Sign up</Button>
						<Modal className="custom-modal" open={open[0]} onCancel={() => toggleOpenModal(0, false)} footer={null}>
							<Signup />
						</Modal>

						<p className="mb-4">Already have an account</p>
						<Button handleOpenModal={() => toggleOpenModal(1, true)} className="bg-transparent hover:opacity-80 border">Sign in</Button>
						<Modal className="custom-modal" open={open[1]} onCancel={() => toggleOpenModal(1, false)} footer={null}>
							<Signin />
						</Modal>
					</div>
				</div>
			</section >
		</>
	);
}

export default Home;
