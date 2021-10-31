import { useState, useRef, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { BsList, BsX } from 'react-icons/bs'

const links = ['Entries', 'Templates', 'Analytics']
const profileLinks = ['Profile', 'Logout']

export const Header = () => {
	let location = useLocation()
	if (location.pathname.includes('/login')) return null

	const [showMobileNav, setShowMobileNav] = useState(false)
	const toggleMobileNav = (): void => {
		setShowMobileNav(!showMobileNav)
	}

	return (
		<div className='py-2 px-4 md:px-8 border'>
			<div className='relative flex items-center justify-between h-12'>
				<button onClick={toggleMobileNav} className='p-1 rounded-md hover:bg-gray-200 md:hidden'>
					{showMobileNav ? <BsX className='block h-6 w-6' /> : <BsList className='block h-6 w-6' />}
				</button>
				<div className='flex space-x-4'>
					<span className='flex-shrink-0 flex items-center text-2xl md:text-xl font-bold'>marco</span>
					<nav className='space-x-4 hidden md:flex'>
						{links.map((page) => (
							<NavLink
								to={`/${page.toLowerCase()}`}
								key={page}
								activeClassName='font-bold'
								className='text-gray-900 px-3 py-2 rounded-md text-sm font-large no-underline'
							>
								{page}
							</NavLink>
						))}
					</nav>
				</div>
				<ProfileButton />
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
			<button onClick={() => setShowMenu(!showMenu)} className='rounded-full bg-blue-200 text-xl rounded-full p-2'>
				LM
			</button>
			{showMenu && (
				<menu className='pl-0 absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white'>
					{profileLinks.map((page) => (
						<NavLink
							to={`/${page.toLowerCase()}`}
							onClick={() => setShowMenu(false)}
							key={page}
							className='block px-4 py-3 text-sm text-gray-900 hover:bg-gray-100 no-underline'
						>
							{page}
						</NavLink>
					))}
				</menu>
			)}
		</div>
	)
}

type Props = {
	toggleNav: () => void
}

const MobileMenu = ({ toggleNav }: Props) => (
	<nav className='pb-3 space-y-1'>
		{links.map((page) => (
			<NavLink
				to={`/${page.toLowerCase()}`}
				onClick={toggleNav}
				key={page}
				activeClassName='font-bold'
				className='self-center flex p-1 m-1 rounded-md no-underline text-gray-900 '
			>
				{page}
			</NavLink>
		))}
	</nav>
)
