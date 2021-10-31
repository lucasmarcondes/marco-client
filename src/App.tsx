import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Entries, Login, Signup, Templates, Analytics, Profile } from './containers'

import { Header } from './components/default'
import { Footer } from './components/default'

import { useState } from 'react'

export default function App() {
	const [darkMode, setDarkMode] = useState(false)

	return (
		<BrowserRouter>
			<div {...(darkMode && { className: 'dark' })}>
				<Header onToggleDarkMode={() => setDarkMode(!darkMode)} darkMode={darkMode} />
				<div className='flex flex-col min-h-[93vh]'>
					<div className='flex-auto p-4 md: p-8'>
						<Switch>
							<Route exact path={['/', '/entries']} component={Entries} />
							<Route path='/login' component={Login} />
							<Route path='/signup' component={Signup} />
							<Route path='/templates' component={Templates} />
							<Route path='/analytics' component={Analytics} />
							<Route path='/profile' component={Profile} />
						</Switch>
					</div>
				</div>
				<Footer />
			</div>
		</BrowserRouter>
	)
}
