import { useState, useRef, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { BsList, BsX, BsSunFill, BsMoonFill } from 'react-icons/bs'

const links = ['Entries', 'Templates', 'Analytics']
const profileLinks = ['Profile', 'Logout']

type headerProps = {
	onToggleDarkMode: () => void
	darkMode: boolean
}

export const Header = ({ onToggleDarkMode, darkMode }: headerProps) => {
	let location = useLocation()
	if (['/login', '/register'].includes(location.pathname)) return null

	const [showMobileNav, setShowMobileNav] = useState(false)
	const toggleMobileNav = (): void => {
		setShowMobileNav(!showMobileNav)
	}

	return (
		<div className='border py-2 px-4 md:px-8'>
			<div className='flex h-12 relative items-center justify-between'>
				<button onClick={toggleMobileNav} className='rounded-md p-1 md:hidden hover:bg-gray-200'>
					{showMobileNav ? <BsX className='h-6 w-6 block' /> : <BsList className='h-6 w-6 block' />}
				</button>
				<div className='flex space-x-4'>
					<span className='flex font-bold flex-shrink-0 text-2xl items-center md:text-xl'>marco</span>
					<nav className='space-x-4 hidden md:flex'>
						{links.map(page => (
							<NavLink
								to={`/${page.toLowerCase()}`}
								key={page}
								activeClassName='font-bold'
								className='rounded-md font-large text-sm py-2 px-3 text-gray-900 no-underline'
							>
								{page}
							</NavLink>
						))}
					</nav>
				</div>
				<span className='flex space-x-4'>
					<button onClick={onToggleDarkMode} className='rounded-md my-auto p-1 p-2 hover:bg-gray-200'>
						{darkMode ? <BsSunFill className='h-5 text-gray-700 w-5 block' /> : <BsMoonFill className='h-5 w-5 block' />}
					</button>
					<ProfileButton />
				</span>
			</div>
			{showMobileNav && <MobileMenu toggleNav={toggleMobileNav} />}
		</div>
	)
}

const ProfileButton = () => {
	const [showMenu, setShowMenu] = useState(false)
	const menuRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		const isOutsideClick = (e: Event) => {
			showMenu && !menuRef.current?.contains(e.target as HTMLElement) && setShowMenu(false)
		}
		document.addEventListener('mousedown', isOutsideClick)
		return () => {
			document.removeEventListener('mousedown', isOutsideClick)
		}
	}, [showMenu])

	return (
		<div ref={menuRef}>
			<button onClick={() => setShowMenu(!showMenu)} className='rounded-full bg-blue-200 text-xl p-2 '>
				LM
			</button>
			{showMenu && (
				<menu className='bg-white rounded-md shadow-lg mt-2 pl-0 right-0 w-48 absolute'>
					{profileLinks.map(page => (
						<NavLink
							to={`/${page.toLowerCase()}`}
							onClick={() => setShowMenu(false)}
							key={page}
							className='text-sm py-3 px-4 text-gray-900 block no-underline hover:bg-gray-100'
						>
							{page}
						</NavLink>
					))}
				</menu>
			)}
		</div>
	)
}

type mobileMenuProps = {
	toggleNav: () => void
}

const MobileMenu = ({ toggleNav }: mobileMenuProps) => (
	<nav className='space-y-1 pb-3'>
		{links.map(page => (
			<NavLink
				to={`/${page.toLowerCase()}`}
				onClick={toggleNav}
				key={page}
				activeClassName='font-bold'
				className='rounded-md flex m-1 p-1 text-gray-900 self-center no-underline '
			>
				{page}
			</NavLink>
		))}
	</nav>
)
