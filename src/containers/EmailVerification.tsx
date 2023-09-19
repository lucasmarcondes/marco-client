import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
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
				.then(resp => {
					if (user) navigate('/')
					else navigate('/login')
				})
				.catch(({ data: error }) => {
					console.log(error?.message)
					setContent(
						<div className='h-full w-full grid justify-items-stretch'>
							<div className='my-auto justify-self-center'>
								<p className='font-semibold text-xs mb-2 tracking-wide text-gray-500 uppercase'>Error 400</p>
								<h1 className='font-extrabold text-left mb-4 leading-tight tracking-tight text-2xl text-gray-900 md:text-4xl'>
									Oops! The link you have must have expired.
								</h1>
								{/* <p className='text-base text-left mb-5 text-gray-800 md:text-xl'>You will need to resend the confirmation email. </p> */}
								<a
									onClick={() => navigate('/login')}
									className='cursor-pointer mb-2  text-blue-500 btn btn-lg btn-light sm:mb-0 sm:w-auto hover:underline'
								>
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
