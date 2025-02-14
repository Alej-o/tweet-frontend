import VisitorHome from '../components/Visitor/Home';
import Container from '../components/Container';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

// Je regarderai ça quand j'aurai les JWT et Refresh et surtout si c'est une bonne pratique..
// ça m'a l'air un peu hard mais en meme temps plus direct que la methode du useEffect
// export async function getServerSideProps(context) {
// 	const { req } = context;
// 	const token = req.cookies.token || null;

// 	if (!token) {
// 		return {
// 			redirect: {
// 				destination: '/',
// 				permanent: false,
// 			},
// 		};
// 	}

// 	return {
// 		props: {},
// 	};
// }

function Index() {
	const router = useRouter();
	const user = useSelector(state => state.user.value);
	const [isHidden, setIsHidden] = useState(true);

	useEffect(() => {
		if (user.token) {
			router.push('/home');
			return;
		}

		setIsHidden(false)
	}, [user.token]);

	return !isHidden ? (
		<Container>
			<VisitorHome />
		</Container>
	) : (<div className="h-dvh w-dvh overflow-hidden bg-slate-500"></div>)
}

export default Index;
