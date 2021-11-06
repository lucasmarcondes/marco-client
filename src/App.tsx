import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Entries, Login, Register, Templates, Analytics, Profile } from './containers'

import { Header } from './components/default'
import { Footer } from './components/default'

import { useState } from 'react'

import { Provider } from 'react-redux'
import { store } from './store/store'

export default function App() {
	const [darkMode, setDarkMode] = useState(false)

	return (
		<Provider store={store}>
			<BrowserRouter>
				<div className={`${darkMode ? 'dark ' : ''}flex flex-col h-screen dark:(bg-gray-700 text-light-300)`}>
					<Header onToggleDarkMode={() => setDarkMode(!darkMode)} darkMode={darkMode} />
					<div className='flex-1'>
						<Switch>
							<Route exact path={['/', '/entries']} component={Entries} />
							<Route path='/login' component={Login} />
							<Route path='/register' component={Register} />
							<Route path='/templates' component={Templates} />
							<Route path='/analytics' component={Analytics} />
							<Route path='/profile' component={Profile} />
						</Switch>
					</div>
					<Footer />
				</div>
			</BrowserRouter>
		</Provider>
	)
}
