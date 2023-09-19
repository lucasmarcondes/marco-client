import { useEffect, useRef, useState } from 'react'
import { BsList, BsMoonFill, BsSunFill, BsX } from 'react-icons/bs'
import { NavLink, useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import { useGetUserQuery, useLogoutMutation, useUpdateUserMutation } from '../../store/api'
import { Notifications } from './Notifications'

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

	if (['/login', '/register'].includes(useLocation().pathname) || !user) return null
	// if (!user) return null

	return (
		<div className="border px-4 py-2 dark:border-0 dark:bg-gray-800 dark:text-gray-300 md:px-8">
			<div className="relative flex h-12 items-center justify-between">
				<button onClick={toggleMobileNav} className="my-auto rounded-md p-1 hover:bg-gray-200 hover:text-black dark:hover:bg-gray-300 md:hidden">
					{showMobileNav ? <BsX className="block h-6 w-6" /> : <BsList className="block h-6 w-6" />}
				</button>
				<div className="flex space-x-4">
					<span className="flex shrink-0 items-center text-2xl font-bold md:text-xl">marco</span>
					<nav className="hidden space-x-4 md:flex">
						{links.map((page) => (
							<NavLink
								to={`/${page.toLowerCase()}`}
								key={page}
								className={({ isActive }) =>
									`${isActive ? 'font-bold ' : ''}rounded-md font-large dark:text-light-300 px-3 py-2 text-sm text-gray-900 no-underline`
								}
							>
								{page}
							</NavLink>
						))}
					</nav>
				</div>
				<span className="flex space-x-4">
					<button onClick={toggleDarkMode} className="my-auto rounded-md p-2 text-gray-700 ">
						{darkMode ? <BsSunFill className="block h-5 w-5 " /> : <BsMoonFill className="block h-5 w-5 text-black" />}
					</button>
					<Notifications />
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

	const userColor = user?.preferences.accentColor
	const [textColor, setTextColor] = useState('text-white')

	useEffect(() => {
		const isOutsideClick = (e: Event) => {
			showMenu && !menuRef.current?.contains(e.target as HTMLElement) && setShowMenu(false)
		}
		document.addEventListener('mousedown', isOutsideClick)
		if (userColor) {
			const variant = userColor.split('-').pop()
			if (variant && parseInt(variant) > 400) {
				setTextColor('text-white')
			} else {
				setTextColor('text-black')
			}
		}
		return () => {
			document.removeEventListener('mousedown', isOutsideClick)
		}
	}, [showMenu, userColor])

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
			<button onClick={() => setShowMenu(!showMenu)} className={'bg- rounded-full p-2 text-lg' + userColor + ' ' + textColor}>
				{user && (user.firstName[0] + user.lastName[0]).toUpperCase()}
			</button>
			{showMenu && (
				<menu className="absolute right-0 z-50 mt-1 w-48 rounded-sm border bg-white pl-0 shadow-md dark:border-gray-900 dark:bg-gray-800 dark:text-gray-300">
					<NavLink
						to="/profile"
						onClick={() => setShowMenu(false)}
						className="block px-4 py-3 text-sm text-gray-900 no-underline hover:bg-gray-100 dark:border-0 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-600 "
					>
						Profile
					</NavLink>
					<button
						onClick={() => signout()}
						className="block w-full px-4 py-3 text-left text-sm text-gray-900 no-underline hover:bg-gray-100 dark:border-0 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-600"
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
	<nav className="space-y-1 pb-3 ">
		{links.map((page) => (
			<NavLink
				to={`/${page.toLowerCase()}`}
				onClick={toggleNav}
				key={page}
				className={({ isActive }) =>
					`${
						isActive ? 'font-bold ' : ''
					}rounded-md dark:text-light-300) m-1 flex self-center p-1 text-gray-900 no-underline dark:border-0 dark:bg-gray-800`
				}
			>
				{page}
			</NavLink>
		))}
	</nav>
)
