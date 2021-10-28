import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Entries, Login, Signup, Templates, Analytics, Profile } from './containers'
import { ChakraProvider, Box } from '@chakra-ui/react'

import { Header } from './components/Header'
import { Footer } from './components/Footer'

export default function App() {
	return (
		<ChakraProvider>
			<BrowserRouter>
				<Header />
				<Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '93vh' }}>
					<Box sx={{ flex: '1 1 auto', p: 4 }}>
						<Switch>
							<Route exact path={['/', '/entries']} component={Entries} />
							<Route path="/login" component={Login} />
							<Route path="/signup" component={Signup} />
							<Route path="/templates" component={Templates} />
							<Route path="/analytics" component={Analytics} />
							<Route path="/profile" component={Profile} />
						</Switch>
					</Box>
				</Box>
				<Footer />
			</BrowserRouter>
		</ChakraProvider>
	)
}
