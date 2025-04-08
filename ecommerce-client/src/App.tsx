import { Outlet } from 'react-router';
import './App.css';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Content, GlobalMain } from './components/styled/GlobalMain';

function App() {
	return (
		<GlobalMain>
			<Header />
			<Content>
				<Outlet />
			</Content>
			<Footer />
		</GlobalMain>
	);
}

export default App;
