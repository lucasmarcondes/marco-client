import { BsGithub } from 'react-icons/bs'
import { useLocation } from 'react-router-dom'
export const Footer = () => {
	const location = useLocation()
	if (['/login', '/register'].includes(location.pathname)) return null

	return (
		<div className="border-t p-4 dark:bg-gray-800 dark:text-white md:p-8 md:px-4">
			<div className="md:flex md:items-center md:justify-between">
				<div className="flex md:order-2">
					<a
						href="https://github.com/lucasmarcondes/marco-client"
						className="flex items-center space-x-2 font-semibold text-black hover:text-gray-700 dark:bg-gray-800 dark:text-white "
					>
						<BsGithub size={20} />
						<p>Github React App</p>
					</a>
				</div>
				<p className="mt-4 text-base text-gray-400 dark:bg-gray-800 dark:text-white md:order-1 md:mt-0">
					© 2021 Marcondes, Inc. All rights reserved.
				</p>
			</div>
		</div>
	)
}
