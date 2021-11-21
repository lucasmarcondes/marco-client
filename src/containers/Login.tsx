import { useState } from 'react'
import { useLoginMutation } from '../store/api'
import { useNavigate } from 'react-router-dom'
import { pushNotification } from '../store/root'
import { useDispatch } from 'react-redux'

export const Login = () => {
	const [login, { isLoading }] = useLoginMutation()
	const navigate = useNavigate()
	const [email, setEmail] = useState('')
	const [errors, setErrors] = useState('')
	const [password, setPassword] = useState('')
	const dispatch = useDispatch()

	const submit = async () => {
		setErrors('')
		login({ email, password })
			.unwrap()
			.then(payload => {
				navigate('/entries')
				dispatch(
					pushNotification({
						title: 'Success',
						message: payload.message,
						variant: 'success',
						dismissable: true,
					})
				)
			})
			.catch(error => {
				setErrors(error?.data)
			})
	}

	return isLoading ? (
		<div>Loading...</div>
	) : (
		<div className='flex h-screen items-center justify-center'>
			<form onSubmit={submit} method='POST' className='border rounded-md flex flex-col space-y-3 shadow-sm p-8 w-1/4'>
				<div className='font-semibold text-lg'>Login</div>
				<input onChange={e => setEmail(e.target.value)} type='email' placeholder='email' />
				<input onChange={e => setPassword(e.target.value)} type='password' placeholder='password' />
				<button className='primary'>Login</button>
				{errors && <span className='mt-2 text-sm text-red-500'>{errors}</span>}
			</form>
		</div>
	)
}
