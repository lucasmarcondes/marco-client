import { BsGithub } from 'react-icons/bs'
import { useLocation } from 'react-router-dom'
export const Footer = () => {
	let location = useLocation()
	if (location.pathname.includes('/login')) return null

	return (
		<div className='border-t mx-4 p-4 md:mx-4 md:p-8 '>
			<div className='md:flex md:items-center md:justify-between'>
				<div className='flex md:order-2'>
					<a
						href='https://github.com/lucasmarcondes/marco-client'
						className='flex font-semibold space-x-2 text-black items-center hover:text-gray-700'
					>
						<BsGithub size={20} />
						<p>Github React App</p>
					</a>
				</div>
				<p className='mt-4 text-base text-gray-400 md:order-1 md:mt-0'>© 2021 Marcondes, Inc. All rights reserved.</p>
			</div>
		</div>
	)
}
