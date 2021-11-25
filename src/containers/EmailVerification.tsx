import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useGetUserQuery, useVerifyEmailMutation } from '../store/api'

export const EmailVerification = () => {
	const navigate = useNavigate()
	const [verifyEmail] = useVerifyEmailMutation()
	const { data: user } = useGetUserQuery()
	const token = useLocation().pathname.split('/').pop()
	useEffect(() => {
		return () => {
			if (token) {
				verifyEmail(token)
					.then(resp => {
						if (user) navigate('/')
						else navigate('/login')
					})
					.catch(({ data: error }) => {
						console.log(error?.message)
					})
			}
		}
	})
	return <></>
}
