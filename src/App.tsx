import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Footer, Header, ToastMessages } from './components/common'
import { Analytics, EmailVerification, Entries, Login, NewPassword, NotFound, PasswordReset, Profile, Register, Templates } from './containers'
import { useGetUserQuery } from './store/api'

export default function App() {
	const { data: user } = useGetUserQuery()
	const darkMode = user?.preferences?.darkMode || false

	return (
		<BrowserRouter>
			<div className={`${darkMode ? 'dark ' : ''}dark:text-light-300 flex h-screen flex-col dark:bg-gray-700`}>
				<Header />
				<div className="flex-1 dark:border-gray-800 dark:bg-gray-800 ">
					<Routes>
						<Route path={'/entries'} element={<Entries />} />
						<Route path={'/'} element={<Entries />} />
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
						<Route path="/password-reset/*" element={<PasswordReset />} />
						<Route path="/new-password/*" element={<NewPassword />} />
						<Route path="/email-verification/*" element={<EmailVerification />} />
						<Route path="/templates" element={<Templates />} />
						<Route path="/analytics" element={<Analytics />} />
						<Route path="/profile" element={<Profile />} />
						<Route path="*" element={<NotFound />} />
					</Routes>
					<ToastMessages />
				</div>
				<Footer />
			</div>
		</BrowserRouter>
	)
}
