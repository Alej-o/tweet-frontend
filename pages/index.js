import VisitorHome from '../components/Visitor/Home';
import ConnectedHome from '../components/Connected/Home';
import Container from '../components/Container';

import { useSelector } from 'react-redux';

function Index() {
	const user = useSelector(state => state.user.value);

	return (
		<Container>
			<VisitorHome />
		</Container>
	);
}

export default Index;
