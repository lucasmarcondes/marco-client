import { BsGithub } from 'react-icons/bs'
export const Footer = () => {
	return (
		<div className='mx-4 p-4 border-t md:mx-4 md:p-8 '>
			<div className='md:flex md:items-center md:justify-between'>
				<div className='flex md:order-2'>
					<a
						href='https://github.com/lucasmarcondes/marco-client'
						className='flex items-center space-x-2 text-black hover:text-gray-700 font-semibold'
					>
						<BsGithub size={20} />
						<p>Github React App</p>
					</a>
				</div>
				<p className='mt-4 text-base text-gray-400 md:mt-0 md:order-1'>© 2021 Marcondes, Inc. All rights reserved.</p>
			</div>
		</div>
	)
}
