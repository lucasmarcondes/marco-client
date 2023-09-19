import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { useGetUserQuery, useVerifyEmailMutation } from '../store/api'

export const EmailVerification = () => {
	const navigate = useNavigate()
	const [verifyEmail] = useVerifyEmailMutation()
	const { data: user } = useGetUserQuery()
	const [content, setContent] = useState(<></>)

	const token = useLocation().pathname.split('/').pop()
	useEffect(() => {
		if (token) {
			verifyEmail(token)
				.unwrap()
				.then(() => {
					if (user) navigate('/')
					else navigate('/login')
				})
				.catch(({ data: error }) => {
					console.log(error?.message)
					setContent(
						<div className="grid h-full w-full justify-items-stretch">
							<div className="my-auto justify-self-center">
								<p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">Error 400</p>
								<h1 className="mb-4 text-left text-2xl font-extrabold leading-tight tracking-tight text-gray-900 md:text-4xl">
									Oops! The link you have must have expired.
								</h1>
								{/* <p className='text-base text-left mb-5 text-gray-800 md:text-xl'>You will need to resend the confirmation email. </p> */}
								<a onClick={() => navigate('/login')} className="mb-2 cursor-pointer text-blue-500 hover:underline sm:mb-0 sm:w-auto">
									Login
								</a>
							</div>
						</div>
					)
				})
		}
	}, [])

	return content
}
