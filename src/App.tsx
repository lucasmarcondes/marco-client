import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Entries, Login, Register, Templates, Analytics, Profile } from './containers'

import { Header, Footer } from './components/default'

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
						<Routes>
							<Route path={'/entries'} element={<Entries />} />
							<Route path={'/'} element={<Entries />} />
							<Route path='/login' element={<Login />} />
							<Route path='/register' element={<Register />} />
							<Route path='/templates' element={<Templates />} />
							<Route path='/analytics' element={<Analytics />} />
							<Route path='/profile' element={<Profile />} />
						</Routes>
					</div>
					<Footer />
				</div>
			</BrowserRouter>
		</Provider>
	)
}
