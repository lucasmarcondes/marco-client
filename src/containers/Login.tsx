import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { useLoginMutation } from '../store/api'
import { pushToastMessage } from '../store/root'

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
			.then((payload) => {
				navigate('/entries')
				dispatch(
					pushToastMessage({
						title: 'Success',
						message: payload.message,
						variant: 'success',
						dismissable: true
					})
				)
			})
			.catch(({ data: error }) => {
				setErrors(error?.message)
			})
	}

	return isLoading ? (
		<div>Loading...</div>
	) : (
		<div className="flex h-screen items-center justify-center">
			<div className="w-full rounded-md border p-8 shadow-sm">
				<form onSubmit={submit} method="POST" className="flex flex-col space-y-3">
					<div className="text-lg font-semibold">Login</div>
					<input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="email" />
					<input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="password" />
					<button className="primary">Login</button>
				</form>
				<div className="my-3 space-y-1 text-sm">
					{errors && <span className="  text-red-500">{errors}</span>}
					<p>
						<span>Reset password? </span>
						<a className="cursor-pointer text-blue-500  hover:underline" onClick={() => navigate('/password-reset')}>
							Click here
						</a>
					</p>
					<p>
						Don&apos;t have an account?{' '}
						<a className="cursor-pointer text-blue-500 hover:underline" onClick={() => navigate('/register')}>
							Register here
						</a>
					</p>
				</div>
			</div>
		</div>
	)
}
