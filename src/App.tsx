import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Entries, Login, Register, Templates, Analytics, Profile } from './containers'

import { Header, Footer, Notifications } from './components/common'

import { useGetUserQuery } from './store/api'

export default function App() {
	const { data: user } = useGetUserQuery()
	const darkMode = user ? user.preferences.darkMode : false

	return (
		<BrowserRouter>
			<div className={`${darkMode ? 'dark ' : ''}flex flex-col h-screen dark:(bg-gray-700 text-light-300)`}>
				<Header />
				<div className='flex-1 dark: (border-gray-800 bg-gray-800) '>
					<Routes>
						<Route path={'/entries'} element={<Entries />} />
						<Route path={'/'} element={<Entries />} />
						<Route path='/login' element={<Login />} />
						<Route path='/register' element={<Register />} />
						<Route path='/templates' element={<Templates />} />
						<Route path='/analytics' element={<Analytics />} />
						<Route path='/profile' element={<Profile />} />
					</Routes>
					<Notifications />
				</div>
				<Footer />
			</div>
		</BrowserRouter>
	)
}
