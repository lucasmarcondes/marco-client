import { useState, useRef, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { BsList, BsX, BsSunFill, BsMoonFill } from 'react-icons/bs'
import { useLogoutMutation, useGetUserQuery, useUpdateUserMutation } from '../../store/api'
import { useNavigate } from 'react-router-dom'

const links = ['Entries', 'Templates', 'Analytics']

export const Header = () => {
	const { data: user } = useGetUserQuery()
	const [updateUser] = useUpdateUserMutation()

	const darkMode = user ? user.preferences.darkMode : false
	const toggleDarkMode = async () => {
		if (!user) return
		updateUser({ ...user, preferences: { ...user.preferences, darkMode: !darkMode } })
	}

	const [showMobileNav, setShowMobileNav] = useState(false)
	const toggleMobileNav = (): void => {
		setShowMobileNav(!showMobileNav)
	}

	if (['/login', '/register'].includes(useLocation().pathname)) return null

	return (
		<div className='border py-2 px-4 md:px-8 dark:( bg-gray-800 border-0 text-light-300 ) '>
			<div className='flex h-12 relative items-center justify-between'>
				<button onClick={toggleMobileNav} className='rounded-md my-auto p-1 md:hidden dark:(hover:bg-gray-300) hover:bg-gray-200 hover:text-dark-200'>
					{showMobileNav ? <BsX className='h-6 w-6 block' /> : <BsList className='h-6 w-6 block' />}
				</button>
				<div className='flex space-x-4'>
					<span className='flex font-bold flex-shrink-0 text-2xl items-center md:text-xl'>marco</span>
					<nav className='space-x-4 hidden md:flex'>
						{links.map(page => (
							<NavLink
								to={`/${page.toLowerCase()}`}
								key={page}
								className={({ isActive }) =>
									`${isActive ? 'font-bold ' : ''}rounded-md font-large text-sm py-2 px-3 text-gray-900 no-underline dark:(text-light-300)`
								}
							>
								{page}
							</NavLink>
						))}
					</nav>
				</div>
				<span className='flex space-x-4'>
					<button
						onClick={toggleDarkMode}
						className='rounded-md my-auto p-1 p-2 text-light-700 dark:(hover:(bg-gray-500 text-dark-200) ) hover:bg-gray-200 '
					>
						{darkMode ? <BsSunFill className='h-5 w-5 block ' /> : <BsMoonFill className='h-5 text-dark-200 w-5 block' />}
					</button>
					<ProfileButton />
				</span>
			</div>
			{showMobileNav && <MobileMenu toggleNav={toggleMobileNav} />}
		</div>
	)
}

const ProfileButton = () => {
	const { data: user } = useGetUserQuery()
	const [showMenu, setShowMenu] = useState(false)
	const menuRef = useRef<HTMLInputElement>(null)
	const [logout] = useLogoutMutation()
	const navigate = useNavigate()

	const userColor = user?.preferences.accentColor ? user.preferences.accentColor : '#BFDBFF'
	const textColor = user?.preferences.textColor ? user.preferences.textColor : 'black'

	useEffect(() => {
		const isOutsideClick = (e: Event) => {
			showMenu && !menuRef.current?.contains(e.target as HTMLElement) && setShowMenu(false)
		}
		document.addEventListener('mousedown', isOutsideClick)
		return () => {
			document.removeEventListener('mousedown', isOutsideClick)
		}
	}, [showMenu])

	const signout = async () => {
		try {
			const response = await logout()
			if (response) {
				navigate('/login')
			}
		} catch (err) {
			console.error(err)
		}
	}
	return (
		<div ref={menuRef}>
			<button
				onClick={() => setShowMenu(!showMenu)}
				className='rounded-full text-lg p-2 dark:(text-dark-400)'
				style={{ background: userColor, color: textColor }}
			>
				{user && (user.firstName[0] + user.lastName[0]).toUpperCase()}
			</button>
			{showMenu && (
				<menu className='bg-white rounded-md shadow-md mt-2 pl-0 right-0 animate-fadeIn animate-animated w-48 z-50 absolute dark:( bg-gray-800 rounded-md text-light-300 ) '>
					<NavLink
						to='/profile'
						onClick={() => setShowMenu(false)}
						className='text-sm py-3 px-4 text-gray-900 block no-underline dark:( hover:bg-gray-600 bg-gray-800 border-0 text-light-300 ) hover:bg-gray-100 '
					>
						Profile
					</NavLink>
					<button
						onClick={() => signout()}
						className='text-sm text-left w-full py-3 px-4 text-gray-900 block no-underline dark:( hover:bg-gray-600 bg-gray-800 border-0 text-light-300 ) hover:bg-gray-100 '
					>
						Logout
					</button>
				</menu>
			)}
		</div>
	)
}

type MobileMenuProps = {
	toggleNav: () => void
}

const MobileMenu = ({ toggleNav }: MobileMenuProps) => (
	<nav className='space-y-1 pb-3 '>
		{links.map(page => (
			<NavLink
				to={`/${page.toLowerCase()}`}
				onClick={toggleNav}
				key={page}
				className={({ isActive }) =>
					`${isActive ? 'font-bold ' : ''}rounded-md flex m-1 p-1 text-gray-900 self-center no-underline dark:( bg-gray-800 border-0 text-light-300)`
				}
			>
				{page}
			</NavLink>
		))}
	</nav>
)
