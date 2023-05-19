import './App.css'
import { MainRoutes } from './routes/MainRoutes';
import { Template } from './components/MainComponents';
import { Header } from './components/partials/Header';
import { Footer } from './components/partials/Footer';

function App() {
	return (
		<div>
			<Template>
				<Header	/>
					<MainRoutes/>
				<Footer />
			</Template>
		</div>
	)
}

export default App
