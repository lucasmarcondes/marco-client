import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Entries, Login, Signup, Templates, Analytics, Profile } from './pages'
import { Header } from './components/Header'

export default function App() {
	return (
		<BrowserRouter>
			<Header />
			<Switch>
				<Route exact path={['/', '/entries']} component={Entries} />
				<Route path="/login" component={Login} />
				<Route path="/signup" component={Signup} />
				<Route path="/templates" component={Templates} />
				<Route path="/analytics" component={Analytics} />
				<Route path="/profile" component={Profile} />
			</Switch>
		</BrowserRouter>
	)
}
