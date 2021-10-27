import { Link } from 'react-router-dom'

export const Header = () => {
	const isActive: Boolean = false
	return (
		<nav>
			<div className="py-3 px-4 md:px-10">
				<div className="relative flex items-center justify-between h-16">
					{/* Mobile View */}
					<div className="absolute inset-y-0 left-0 flex items-center md:hidden">
						<button type="button" className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700" aria-controls="mobile-menu" aria-expanded="false">
							<span className="sr-only">Open main menu</span>
							{/* <svg v-if="!showMobileMenu" className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
							</svg>
							<svg v-if="showMobileMenu" className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
							</svg> */}
						</button>
					</div>
					<div className="flex-1 flex items-center justify-center md:items-stretch md:justify-start">
						<div className="flex-shrink-0 flex items-center text-2xl md:text-xl font-bold">marco</div>
						<div className="hidden md:block md:ml-6">
							<div className="flex space-x-4">
								<Link to={'/entries'} className={isActive ? 'text-white bg-gray-900' : 'text-gray-600' + 'hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-large font-bold'}>
									Entries
								</Link>
								<Link to={'/templates'} className={isActive ? 'text-white bg-gray-900' : 'text-gray-600' + 'hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-large font-bold'}>
									Templates
								</Link>
								<Link to={'/analytics'} className={isActive ? 'text-white bg-gray-900' : 'text-gray-600' + 'hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-large font-bold'}>
									Analytics
								</Link>
							</div>
						</div>
					</div>
					<div className="absolute inset-y-0 right-0 flex items-center pr-2 md:static md:inset-auto md:ml-6 md:pr-0">
						{/* Profile dropdown */}
						<div>
							<div>
								<button type="button" className="border bg-gray-800 flex text-sm rounded-full" id="user-menu" aria-expanded="false" aria-haspopup="true">
									<span className="sr-only">Open user menu</span>
									<div className="bg-blue-200 text-xl rounded-full p-2">{/* { userInitials } */}</div>
								</button>
							</div>
							<div
								v-if="showProfileDropdown"
								className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white"
								role="menu"
								aria-orientation="vertical"
								aria-labelledby="user-menu"
							>
								<a href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
									Your Profile
								</a>
								<a href="" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
									Sign out
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Mobile menu */}
			<div v-if="showMobileMenu" className="md:hidden px-3" id="mobile-menu">
				<div className="pb-3 space-y-1">
					<a href="/entries" className={isActive ? 'text-white bg-gray-900' : 'text-gray-600' + 'hover:bg-gray-700 hover:text-white px-3 py-2 block rounded-md text-sm font-large font-bold'}>
						Entries
					</a>
					<a href="/editor" className={isActive ? 'text-white bg-gray-900' : 'text-gray-600' + 'hover:bg-gray-700 hover:text-white px-3 py-2 block rounded-md text-sm font-large font-bold'}>
						Editor
					</a>
					<a href="/analytics" className={isActive ? 'text-white bg-gray-900' : 'text-gray-600' + 'hover:bg-gray-700 hover:text-white px-3 py-2 block rounded-md text-sm font-large font-bold'}>
						Analytics
					</a>
				</div>
			</div>
		</nav>
	)
}
